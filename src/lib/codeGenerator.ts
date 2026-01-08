import type { DSLType } from "@/components/DSLSelector";

export interface GenerationResult {
  code: string;
  securityWarnings: string[];
}

/**
 * Structured representation of what the user asked for.
 * This plays the role of the "Intent & Constraint Extraction" box.
 */
interface IntentExtractionResult {
  normalizedPrompt: string;
  dsl: DSLType;
  intent: string;
  constraints: {
    replicas?: number;
    runtime?: "nodejs" | "react" | "generic";
    environment?: "dev" | "staging" | "prod";
  };
}

/**
 * Internal representation of the DSL-specific prompt that would be sent
 * to GPT-4 / the code generation engine.
 */
interface DSLStructuredPrompt {
  dsl: DSLType;
  systemPrompt: string;
  userPrompt: string;
  intent: IntentExtractionResult;
}

// Public entry point used by the UI
// ---------------------------------------------------
export function generateCode(prompt: string, dsl: DSLType): GenerationResult {
  // 1) Intent & constraint extraction
  const intent = extractIntentAndConstraints(prompt, dsl);

  // 2) DSL‑specific prompt builder (what we'd send to GPT-4)
  const structuredPrompt = buildDSLSpecificPrompt(intent);

  // 3) Code generation engine (placeholder for OpenAI GPT‑4 API)
  const rawGeneration = runCodeGenerationEngine(structuredPrompt);

  // 4) Post‑processing & validation
  return validateAndPostProcess(rawGeneration, intent);
}

// Stage 1: Intent & constraint extraction
// ---------------------------------------------------
function extractIntentAndConstraints(prompt: string, dsl: DSLType): IntentExtractionResult {
  const normalizedPrompt = prompt.toLowerCase();

  // Very lightweight heuristic extractor; can be replaced with an LLM later.
  let replicas: number | undefined;
  const replicaMatch = normalizedPrompt.match(/(\d+)\s*replica/);
  if (replicaMatch) {
    replicas = Number.parseInt(replicaMatch[1], 10);
  }

  let runtime: IntentExtractionResult["constraints"]["runtime"] = "generic";
  if (normalizedPrompt.includes("react")) {
    runtime = "react";
  } else if (normalizedPrompt.includes("node.js") || normalizedPrompt.includes("nodejs") || normalizedPrompt.includes("node")) {
    runtime = "nodejs";
  }

  let environment: IntentExtractionResult["constraints"]["environment"];
  if (normalizedPrompt.includes("prod") || normalizedPrompt.includes("production")) {
    environment = "prod";
  } else if (normalizedPrompt.includes("staging")) {
    environment = "staging";
  } else if (normalizedPrompt.includes("dev") || normalizedPrompt.includes("development")) {
    environment = "dev";
  }

  // A simple text label for the intent; in a real system this would be richer.
  let intentLabel = "generic";
  if (normalizedPrompt.includes("deployment")) intentLabel = "deployment";
  if (normalizedPrompt.includes("service")) intentLabel = "service";
  if (normalizedPrompt.includes("table") || normalizedPrompt.includes("schema")) intentLabel = "schema";

  return {
    normalizedPrompt,
    dsl,
    intent: intentLabel,
    constraints: {
      replicas,
      runtime,
      environment,
    },
  };
}

// Stage 2: DSL‑specific prompt builder
// ---------------------------------------------------
function buildDSLSpecificPrompt(intent: IntentExtractionResult): DSLStructuredPrompt {
  const baseSystem = "You are an expert assistant that generates production-ready, secure infrastructure and data layer code.";

  let systemPrompt = baseSystem;
  if (intent.dsl === "kubernetes") {
    systemPrompt +=
      " Follow Kubernetes best practices, including resource requests/limits, probes, and avoiding use of the :latest image tag in production.";
  } else if (intent.dsl === "terraform") {
    systemPrompt +=
      " Follow Terraform best practices, including least-privilege security groups and encrypted storage where appropriate.";
  } else if (intent.dsl === "sql") {
    systemPrompt +=
      " Follow SQL best practices, including avoiding SELECT * in production and never storing plaintext passwords.";
  }

  const userPrompt = `User requirement: "${intent.normalizedPrompt}"
DSL: ${intent.dsl}
High-level intent: ${intent.intent}
Constraints: ${JSON.stringify(intent.constraints)}`;

  return {
    dsl: intent.dsl,
    systemPrompt,
    userPrompt,
    intent,
  };
}

// Stage 3: Code generation engine
// For now this is still static logic, but it's isolated so it can be swapped for GPT‑4.
// ---------------------------------------------------
function runCodeGenerationEngine(prompt: DSLStructuredPrompt): GenerationResult {
  switch (prompt.dsl) {
    case "sql":
      return generateSQL(prompt.intent);
    case "terraform":
      return generateTerraform(prompt.intent);
    case "kubernetes":
      return generateKubernetes(prompt.intent);
    default:
      return { code: "// Unsupported DSL", securityWarnings: [] };
  }
}

// Stage 4: Post‑processing & validation
// ---------------------------------------------------
function validateAndPostProcess(result: GenerationResult, intent: IntentExtractionResult): GenerationResult {
  const warnings = [...result.securityWarnings];

  // Generic environment‑aware hints
  if (intent.constraints.environment === "prod") {
    warnings.push("This configuration targets production. Review resource limits, network exposure, and secrets before deploying.");
  }

  return {
    code: result.code,
    securityWarnings: warnings,
  };
}

// DSL‑specific static generators (existing logic, now driven by the intent object)
// ---------------------------------------------------
function generateSQL(intent: IntentExtractionResult): GenerationResult {
  const prompt = intent.normalizedPrompt;
  let code = '';
  const warnings: string[] = [];

  if (prompt.includes('users') && prompt.includes('last 7 days')) {
    code = `-- Get all users signed up in the last 7 days
SELECT 
  user_id,
  username,
  email,
  created_at,
  status
FROM users 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  AND status = 'active'
ORDER BY created_at DESC;`;
  } else if (prompt.includes('create') && prompt.includes('table')) {
    if (prompt.includes('users')) {
      code = `-- Create users table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active'
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);`;
      warnings.push('Store password hashes, never plain text passwords');
    }
  } else if (prompt.includes('join') || prompt.includes('orders')) {
    code = `-- Get user orders with details
SELECT 
  u.username,
  u.email,
  o.order_id,
  o.total_amount,
  o.order_date,
  o.status as order_status
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY o.order_date DESC;`;
  } else {
    code = `-- Generated SQL query based on: "${prompt}"
SELECT 
  column1,
  column2,
  COUNT(*) as total
FROM your_table
WHERE condition = 'value'
GROUP BY column1, column2
ORDER BY total DESC;`;
  }

  if (code.includes('*') && !code.includes('COUNT(*)')) {
    warnings.push('Avoid SELECT * in production queries for performance');
  }

  return { code, securityWarnings: warnings };
}

function generateTerraform(intent: IntentExtractionResult): GenerationResult {
  const prompt = intent.normalizedPrompt;
  let code = '';
  const warnings: string[] = [];

  if (prompt.includes('ec2') || prompt.includes('instance')) {
    code = `# Provision EC2 instance
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1d0"  # Amazon Linux 2
  instance_type = "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  subnet_id              = aws_subnet.public.id
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Hello from Terraform!</h1>" > /var/www/html/index.html
              EOF

  tags = {
    Name        = "WebServer"
    Environment = "development"
  }
}

resource "aws_security_group" "web_sg" {
  name_prefix = "web-sg"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "WebServerSG"
  }
}`;
    warnings.push('Security group allows all traffic from 0.0.0.0/0');
    warnings.push('Consider using specific IP ranges for production');
  } else if (prompt.includes('s3') || prompt.includes('bucket')) {
    code = `# Create S3 bucket
resource "aws_s3_bucket" "app_bucket" {
  bucket = "my-app-bucket-\${random_string.bucket_suffix.result}"
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_s3_bucket_versioning" "app_bucket_versioning" {
  bucket = aws_s3_bucket.app_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "app_bucket_encryption" {
  bucket = aws_s3_bucket.app_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "app_bucket_pab" {
  bucket = aws_s3_bucket.app_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`;
  } else {
    code = `# Terraform configuration based on: "${prompt}"
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

# Add your resources here
resource "aws_instance" "example" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  
  tags = {
    Name = "ExampleInstance"
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}`;
  }

  return { code, securityWarnings: warnings };
}

function generateKubernetes(intent: IntentExtractionResult): GenerationResult {
  const prompt = intent.normalizedPrompt;
  let code = '';
  const warnings: string[] = [];

  if (prompt.includes('deployment') && (prompt.includes('react') || prompt.includes('node') || prompt.includes('app'))) {
    const replicas =
      intent.constraints.replicas != null
        ? String(intent.constraints.replicas)
        : prompt.match(/(\d+)\s*replica/)?.[1] || '3';
    const appType = intent.constraints.runtime === 'react' ? 'react' : 'nodejs';
    
    code = `# Kubernetes deployment for ${appType} app
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appType}-app
  labels:
    app: ${appType}-app
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${appType}-app
  template:
    metadata:
      labels:
        app: ${appType}-app
    spec:
      containers:
      - name: ${appType}-app
        image: ${appType}-app:${intent.constraints.environment === 'prod' ? '1.0.0' : 'latest'}
        ports:
        - containerPort: ${appType === 'react' ? '80' : '3000'}
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: ${appType === 'react' ? '/' : '/health'}
            port: ${appType === 'react' ? '80' : '3000'}
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: ${appType === 'react' ? '/' : '/ready'}
            port: ${appType === 'react' ? '80' : '3000'}
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: ${appType}-app-service
spec:
  selector:
    app: ${appType}-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: ${appType === 'react' ? '80' : '3000'}
  type: LoadBalancer`;
    
    if (code.includes('image: ') && code.includes(':latest')) {
      warnings.push('Avoid using :latest tag in production');
      warnings.push('Use specific version tags for reproducible deployments');
    }
  } else if (prompt.includes('service') || prompt.includes('expose')) {
    code = `# Kubernetes service configuration
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
  labels:
    app: my-app
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 8080
      protocol: TCP
      name: http
  selector:
    app: my-app
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-nodeport
  labels:
    app: my-app
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080
      protocol: TCP
  selector:
    app: my-app`;
  } else {
    code = `# Kubernetes configuration based on: "${prompt}"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-app
  labels:
    app: example-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
    spec:
      containers:
      - name: app
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "256Mi"
            cpu: "200m"
---
apiVersion: v1
kind: Service
metadata:
  name: example-service
spec:
  selector:
    app: example-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP`;
  }

  if (code.includes('type: LoadBalancer')) {
    warnings.push('LoadBalancer exposes service externally');
    warnings.push('Consider using Ingress for better traffic management');
  }

  return { code, securityWarnings: warnings };
}