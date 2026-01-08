# DSL-CodeGen - Complete Project Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture & Design](#architecture--design)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [How It Works](#how-it-works)
7. [Code Generation Logic](#code-generation-logic)
8. [Security Features](#security-features)
9. [UI/UX Design System](#uiux-design-system)
10. [Usage Examples](#usage-examples)
11. [Setup & Installation](#setup--installation)
12. [Development Guide](#development-guide)
13. [API Integration Guide](#api-integration-guide)
14. [Future Enhancements](#future-enhancements)
15. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**DSL-CodeGen** is an AI-powered code generation tool designed to transform natural language descriptions into production-ready code for multiple Domain-Specific Languages (DSLs). The project was built for the OpenAI Buildathon and demonstrates a modular architecture ready for seamless AI integration.

### Core Purpose

The application allows developers and DevOps engineers to:
- Describe infrastructure or database requirements in plain English
- Generate production-ready code for SQL, Terraform, and Kubernetes
- Receive security warnings and best practice suggestions
- Copy generated code with a single click
- Work with a beautiful, developer-focused interface

### Key Differentiators

- **Multi-DSL Support**: Generate code for SQL, Terraform, and Kubernetes from a single interface
- **Security-First**: Built-in security scanning and warning system
- **Production-Ready**: Generates code following best practices and industry standards
- **Developer Experience**: Monaco Editor integration with syntax highlighting
- **AI-Ready Architecture**: Designed for easy OpenAI API integration

---

## ✨ Features

### 1. Natural Language Input

Users can describe their requirements in plain English without needing to know the specific syntax of the target DSL. The system intelligently parses the input and generates appropriate code.

**Example Inputs:**
- "List all users signed up in the last 7 days"
- "Provision an EC2 instance with security groups"
- "Create a deployment for a React app with 3 replicas"

### 2. Multi-DSL Code Generation

The application supports three major DSLs:

#### SQL Generation
- **Query Generation**: SELECT, JOIN, WHERE clauses
- **Schema Creation**: CREATE TABLE statements with indexes
- **Best Practices**: Proper indexing, avoiding SELECT *, security considerations
- **Security Warnings**: Password storage, SQL injection prevention

#### Terraform Generation
- **Infrastructure as Code**: EC2 instances, S3 buckets, security groups
- **AWS Resources**: Complete Terraform configurations for AWS services
- **Security Features**: Encryption, versioning, public access blocking
- **Best Practices**: Resource tagging, proper variable usage

#### Kubernetes Generation
- **Deployments**: Complete deployment manifests with replicas
- **Services**: ClusterIP, NodePort, and LoadBalancer configurations
- **Health Checks**: Liveness and readiness probes
- **Resource Management**: CPU and memory limits/requests
- **Security Warnings**: Image tag best practices, service exposure warnings

### 3. Monaco Code Editor

Integrated Monaco Editor (the same engine powering VS Code) provides:
- **Syntax Highlighting**: Language-specific syntax coloring
- **Line Numbers**: Easy code navigation
- **Word Wrap**: Automatic text wrapping for long lines
- **Bracket Pair Colorization**: Visual bracket matching
- **Dark Theme**: Developer-friendly dark theme
- **Font Support**: JetBrains Mono, Fira Code, and other monospace fonts
- **Editable Output**: Users can modify generated code directly

### 4. Security Warning System

The application includes a comprehensive security analysis system that:

- **Detects Security Issues**: Automatically scans generated code for common vulnerabilities
- **Provides Warnings**: Visual alerts for potentially unsafe configurations
- **Best Practice Suggestions**: Contextual recommendations for production use
- **Examples of Warnings**:
  - SQL: "Avoid SELECT * in production queries for performance"
  - Terraform: "Security group allows all traffic from 0.0.0.0/0"
  - Kubernetes: "Avoid using :latest tag in production"

### 5. Code Management Features

- **One-Click Copy**: Copy generated code to clipboard with toast notification
- **Reset Functionality**: Clear all inputs and generated code
- **Real-time Editing**: Modify generated code directly in the editor
- **State Management**: Proper React state management for all interactions

### 6. Example Prompts

Pre-configured example prompts help users understand the system's capabilities:
- Quick-start examples for each DSL type
- One-click prompt insertion
- Automatic DSL selection based on example

### 7. Responsive Design

- **Mobile-Friendly**: Works on all screen sizes
- **Grid Layout**: Two-column layout on desktop, single column on mobile
- **Touch-Optimized**: Buttons and inputs optimized for touch devices

### 8. Developer-Focused UI

- **Dark Theme**: Easy on the eyes for long coding sessions
- **Gradient Effects**: Beautiful visual design with custom gradients
- **Smooth Animations**: Polished user experience with CSS transitions
- **Icon System**: Lucide React icons for visual clarity

---

## 🏗 Architecture & Design

### Architecture Pattern

The application follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         App Component (Root)            │
│  - Routing                              │
│  - Global Providers                     │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌────────▼────────┐
│  DSLCodeGen    │    │   NotFound      │
│  (Main Page)   │    │   (404 Page)    │
└───────┬────────┘    └─────────────────┘
        │
   ┌────┴────────────────────┐
   │                         │
┌──▼──────────┐    ┌─────────▼─────────┐
│ DSLSelector │    │   CodeEditor       │
│ Component   │    │   Component        │
└─────────────┘    └───────────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
            ┌───────▼────┐  ┌─────▼──────┐
            │  Monaco    │  │  Security   │
            │  Editor    │  │  Warnings   │
            └────────────┘  └─────────────┘
```

### Data Flow

1. **User Input** → Textarea component captures natural language prompt
2. **DSL Selection** → User selects target DSL (SQL, Terraform, Kubernetes)
3. **Generation Trigger** → User clicks "Generate Code" button
4. **Code Generation** → `codeGenerator.ts` processes input and generates code
5. **Security Analysis** → Security warnings are extracted
6. **State Update** → Generated code and warnings are stored in React state
7. **UI Rendering** → CodeEditor component displays code with syntax highlighting
8. **User Actions** → Copy, Reset, or Edit functionality

### State Management

The application uses **React Hooks** for state management:

- `useState`: Local component state
- `useToast`: Toast notifications for user feedback
- No global state management library (Redux, Zustand) needed for current scope

### Component Hierarchy

```
App
├── QueryClientProvider (React Query)
├── TooltipProvider
├── Toaster (Toast notifications)
├── BrowserRouter
│   ├── Route "/" → DSLCodeGen
│   │   ├── DSLSelector
│   │   ├── Textarea (Input)
│   │   ├── Button (Generate)
│   │   └── CodeEditor
│   │       ├── Monaco Editor
│   │       ├── Security Warnings
│   │       └── Action Buttons
│   └── Route "*" → NotFound
```

---

## 🛠 Tech Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 7.1.5**: Fast build tool and dev server

### UI Framework & Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: High-quality React component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### Code Editor
- **Monaco Editor**: VS Code's editor engine
- **@monaco-editor/react**: React wrapper for Monaco

### Routing
- **React Router DOM 6.30.1**: Client-side routing

### State Management & Data Fetching
- **TanStack Query 5.83.0**: Server state management (ready for API integration)
- **React Hooks**: Local state management

### Form Handling
- **React Hook Form 7.61.1**: Performant form library
- **Zod 3.25.76**: Schema validation

### Build Tools
- **Vite**: Fast bundler and dev server
- **TypeScript**: Type checking
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Development Tools
- **ESLint 9.32.0**: Code quality
- **TypeScript ESLint**: TypeScript-specific linting rules

---

## 📁 Project Structure

```
DSL-CodeGen-master/
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── ... (40+ UI components)
│   │   ├── DSLSelector.tsx  # DSL selection dropdown
│   │   └── CodeEditor.tsx   # Monaco editor wrapper
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   │
│   ├── lib/                 # Core business logic
│   │   ├── codeGenerator.ts # Code generation engine
│   │   └── utils.ts         # Utility functions
│   │
│   ├── pages/               # Page components
│   │   ├── DSLCodeGen.tsx   # Main application page
│   │   ├── Index.tsx        # Landing page (unused)
│   │   └── NotFound.tsx     # 404 error page
│   │
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles & design system
│   └── vite-env.d.ts        # Vite type definitions
│
├── .gitignore
├── components.json          # shadcn/ui configuration
├── eslint.config.js         # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # App-specific TS config
├── tsconfig.node.json      # Node-specific TS config
├── vite.config.ts          # Vite configuration
└── README.md               # Quick start guide
```

### Key Files Explained

#### `src/lib/codeGenerator.ts`
The core code generation engine. Contains:
- `generateCode()`: Main entry point for code generation
- `generateSQL()`: SQL-specific generation logic
- `generateTerraform()`: Terraform-specific generation logic
- `generateKubernetes()`: Kubernetes-specific generation logic
- Security warning detection logic

#### `src/components/CodeEditor.tsx`
Monaco Editor wrapper component with:
- Language detection from DSL type
- Copy to clipboard functionality
- Security warnings display
- Reset functionality
- Toast notifications

#### `src/components/DSLSelector.tsx`
DSL selection dropdown with:
- Three DSL options (SQL, Terraform, Kubernetes)
- Icon-based visual selection
- Description text for each option

#### `src/pages/DSLCodeGen.tsx`
Main application page containing:
- Input form (textarea + DSL selector)
- Generate button with loading state
- Example prompts section
- Code editor integration
- State management for all interactions

---

## 🔄 How It Works

### Step-by-Step Process

1. **User Input Phase**
   - User types natural language description in textarea
   - User selects target DSL from dropdown
   - User clicks "Generate Code" button

2. **Validation Phase**
   - System checks if prompt is not empty
   - Button is disabled if input is invalid

3. **Generation Phase**
   - Loading state is activated (spinner shown)
   - `generateCode()` function is called with prompt and DSL type
   - Prompt is normalized (lowercased) for pattern matching
   - Appropriate generator function is called based on DSL type

4. **Code Generation Logic**
   - Pattern matching against normalized prompt
   - Template code is selected based on keywords
   - Dynamic values are extracted (e.g., replica count, app type)
   - Code template is populated with extracted values

5. **Security Analysis Phase**
   - Generated code is analyzed for security issues
   - Common patterns are detected (SELECT *, :latest tags, 0.0.0.0/0)
   - Security warnings array is populated

6. **Output Phase**
   - Generated code is displayed in Monaco Editor
   - Security warnings are shown in warning panel
   - Loading state is deactivated
   - User can copy, edit, or reset

### Code Generation Algorithm

The current implementation uses **pattern matching**:

```typescript
1. Normalize input (lowercase)
2. Check for keyword patterns
3. Match against predefined templates
4. Extract dynamic values (regex matching)
5. Populate template with values
6. Analyze for security issues
7. Return code + warnings
```

**Future Enhancement**: Replace with AI-powered generation using OpenAI API.

---

## 💻 Code Generation Logic

### SQL Generation

The SQL generator recognizes patterns for:

#### User Queries
- **Pattern**: "users" + "last 7 days"
- **Output**: SELECT query with date filtering
- **Features**: Proper date arithmetic, status filtering, ordering

#### Table Creation
- **Pattern**: "create" + "table" + "users"
- **Output**: CREATE TABLE with indexes
- **Features**: Primary keys, unique constraints, timestamps, indexes
- **Security**: Password hash storage warning

#### Joins
- **Pattern**: "join" OR "orders"
- **Output**: INNER JOIN query
- **Features**: Proper join syntax, date filtering, ordering

#### Generic Queries
- **Fallback**: Template query with placeholders
- **Structure**: SELECT, FROM, WHERE, GROUP BY, ORDER BY

#### Security Checks
- Detects `SELECT *` (except in COUNT(*))
- Warns about performance implications

### Terraform Generation

The Terraform generator handles:

#### EC2 Instances
- **Pattern**: "ec2" OR "instance"
- **Output**: Complete EC2 configuration
- **Includes**:
  - EC2 instance resource
  - Security group with ingress/egress rules
  - User data script
  - Tags
- **Security Warnings**: 
  - Open security groups (0.0.0.0/0)
  - Production IP range recommendations

#### S3 Buckets
- **Pattern**: "s3" OR "bucket"
- **Output**: Secure S3 bucket configuration
- **Includes**:
  - S3 bucket with random suffix
  - Versioning enabled
  - Server-side encryption (AES256)
  - Public access blocking
- **Security**: All security best practices applied

#### Generic Terraform
- **Fallback**: Base Terraform configuration
- **Includes**: Provider setup, variables, data sources

### Kubernetes Generation

The Kubernetes generator supports:

#### App Deployments
- **Pattern**: "deployment" + ("react" OR "node" OR "app")
- **Output**: Complete deployment + service
- **Features**:
  - Replica count extraction from prompt
  - App type detection (React vs Node.js)
  - Port configuration (80 for React, 3000 for Node.js)
  - Resource limits and requests
  - Liveness and readiness probes
  - Service configuration (LoadBalancer)
- **Security Warnings**:
  - :latest tag usage
  - LoadBalancer exposure

#### Services
- **Pattern**: "service" OR "expose"
- **Output**: ClusterIP and NodePort services
- **Features**: Multiple service types, port mapping

#### Generic Kubernetes
- **Fallback**: Basic deployment + service
- **Includes**: Resource limits, health checks, labels

---

## 🔐 Security Features

### Security Warning System

The application includes a comprehensive security analysis system:

#### SQL Security Checks
1. **SELECT * Detection**
   - Warns: "Avoid SELECT * in production queries for performance"
   - Exception: COUNT(*) is allowed

2. **Password Storage**
   - Warns: "Store password hashes, never plain text passwords"
   - Triggered: When creating user tables

#### Terraform Security Checks
1. **Open Security Groups**
   - Warns: "Security group allows all traffic from 0.0.0.0/0"
   - Warns: "Consider using specific IP ranges for production"
   - Triggered: When CIDR blocks are 0.0.0.0/0

#### Kubernetes Security Checks
1. **Image Tag Warnings**
   - Warns: "Avoid using :latest tag in production"
   - Warns: "Use specific version tags for reproducible deployments"
   - Triggered: When image tags contain :latest

2. **Service Exposure**
   - Warns: "LoadBalancer exposes service externally"
   - Warns: "Consider using Ingress for better traffic management"
   - Triggered: When service type is LoadBalancer

### Security Warning Display

- **Visual Design**: Orange warning panel with icon
- **Location**: Above code editor
- **Format**: Bulleted list of warnings
- **Styling**: Semi-transparent background with border

### Future Security Enhancements

- SQL injection detection
- XSS vulnerability scanning
- Secrets management warnings
- Compliance checking (GDPR, HIPAA)
- Dependency vulnerability scanning

---

## 🎨 UI/UX Design System

### Color Palette

The application uses a **dark developer theme** with HSL color values:

#### Primary Colors
- **Background**: `hsl(220 13% 8%)` - Deep dark blue-gray
- **Foreground**: `hsl(210 40% 98%)` - Near-white text
- **Primary**: `hsl(200 100% 60%)` - Electric blue
- **Accent**: `hsl(142 76% 36%)` - Terminal green

#### Semantic Colors
- **Card**: `hsl(220 13% 10%)` - Slightly lighter than background
- **Border**: `hsl(220 13% 18%)` - Subtle borders
- **Muted**: `hsl(220 13% 14%)` - Secondary backgrounds
- **Destructive**: `hsl(0 84.2% 60.2%)` - Red for errors
- **Warning Orange**: `hsl(38 92% 50%)` - Security warnings

### Typography

- **Font Family**: System fonts with fallbacks
- **Monospace**: JetBrains Mono, Fira Code, Consolas, Monaco
- **Sizes**: Responsive typography scale
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing System

- **Base Unit**: 0.25rem (4px)
- **Scale**: 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32
- **Container Padding**: 2rem (32px)
- **Card Padding**: 1.5rem (24px)

### Border Radius

- **Default**: 0.75rem (12px)
- **Small**: calc(0.75rem - 4px)
- **Medium**: calc(0.75rem - 2px)
- **Large**: 0.75rem

### Shadows

- **Code Shadow**: `0 25px 50px -12px hsl(var(--primary) / 0.25)`
- **Glow Shadow**: `0 0 40px hsl(var(--primary) / 0.15)`

### Gradients

- **Primary Gradient**: `linear-gradient(135deg, primary, accent)`
- **Hero Gradient**: `linear-gradient(135deg, background, card, background)`
- **Code Gradient**: `linear-gradient(180deg, code-editor-bg, background)`

### Animations

- **Smooth Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Bounce Transition**: `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- **Hover Effects**: Scale transforms, color transitions
- **Loading Spinner**: Rotating border animation

### Component Variants

#### Button Variants
- `default`: Primary action button
- `destructive`: Delete/danger actions
- `outline`: Secondary actions
- `secondary`: Tertiary actions
- `ghost`: Minimal styling
- `link`: Text link style
- `code`: Custom gradient for generate button
- `terminal`: Terminal-style button
- `copy`: Copy action button
- `danger`: Reset/danger button

#### Button Sizes
- `sm`: Small (h-9, px-3)
- `default`: Default (h-10, px-4)
- `lg`: Large (h-11, px-8)
- `xl`: Extra large (h-12, px-10)
- `icon`: Square icon button (h-10, w-10)

---

## 📝 Usage Examples

### Example 1: SQL Query Generation

**Input:**
```
DSL: SQL
Prompt: "List all users signed up in the last 7 days"
```

**Output:**
```sql
-- Get all users signed up in the last 7 days
SELECT 
  user_id,
  username,
  email,
  created_at,
  status
FROM users 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  AND status = 'active'
ORDER BY created_at DESC;
```

**Security Warnings:** None

---

### Example 2: Terraform EC2 Instance

**Input:**
```
DSL: Terraform
Prompt: "Provision an EC2 instance with security groups"
```

**Output:**
```hcl
# Provision EC2 instance
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
}
```

**Security Warnings:**
- ⚠️ Security group allows all traffic from 0.0.0.0/0
- ⚠️ Consider using specific IP ranges for production

---

### Example 3: Kubernetes Deployment

**Input:**
```
DSL: Kubernetes
Prompt: "Create a deployment for a React app with 3 replicas"
```

**Output:**
```yaml
# Kubernetes deployment for react app
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-app
  labels:
    app: react-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: react-app
  template:
    metadata:
      labels:
        app: react-app
    spec:
      containers:
      - name: react-app
        image: react-app:latest
        ports:
        - containerPort: 80
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
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: react-app-service
spec:
  selector:
    app: react-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

**Security Warnings:**
- ⚠️ Avoid using :latest tag in production
- ⚠️ Use specific version tags for reproducible deployments
- ⚠️ LoadBalancer exposes service externally
- ⚠️ Consider using Ingress for better traffic management

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js (or use yarn/pnpm)
- **Git**: For cloning the repository

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd DSL-CodeGen-master
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages (469 packages).

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The production build will be in the `dist/` directory.

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run build:dev`: Build in development mode
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint to check code quality

---

## 👨‍💻 Development Guide

### Adding a New DSL

1. **Update DSLType**
   ```typescript
   // src/components/DSLSelector.tsx
   export type DSLType = 'sql' | 'terraform' | 'kubernetes' | 'docker';
   ```

2. **Add DSL Option**
   ```typescript
   // src/components/DSLSelector.tsx
   {
     value: 'docker' as const,
     label: 'Docker',
     description: 'Container configuration',
     icon: Container,
   }
   ```

3. **Add Language Mapping**
   ```typescript
   // src/components/CodeEditor.tsx
   case 'docker':
     return 'dockerfile';
   ```

4. **Add Generator Function**
   ```typescript
   // src/lib/codeGenerator.ts
   case 'docker':
     return generateDocker(normalizedPrompt);
   ```

5. **Implement Generator**
   ```typescript
   function generateDocker(prompt: string): GenerationResult {
     // Implementation
   }
   ```

### Adding New Code Templates

Edit the generator functions in `src/lib/codeGenerator.ts`:

```typescript
function generateSQL(prompt: string): GenerationResult {
  // Add new pattern matching
  if (prompt.includes('your-pattern')) {
    code = `-- Your template code here`;
    // Add security warnings if needed
    warnings.push('Your warning message');
  }
  return { code, securityWarnings: warnings };
}
```

### Customizing the UI

#### Changing Colors
Edit `src/index.css`:
```css
:root {
  --primary: 200 100% 60%; /* Change HSL values */
}
```

#### Adding New Button Variants
Edit `src/components/ui/button.tsx`:
```typescript
variant: {
  // ... existing variants
  custom: "your-custom-classes",
}
```

#### Modifying Layout
Edit `src/pages/DSLCodeGen.tsx` to change the page structure.

### Code Style

- **TypeScript**: Strict typing where possible
- **ESLint**: Follows React and TypeScript best practices
- **Formatting**: Use Prettier (if configured)
- **Naming**: camelCase for variables, PascalCase for components

---

## 🔌 API Integration Guide

### OpenAI API Integration

The project is designed for easy OpenAI API integration. Here's how to add it:

#### Step 1: Install OpenAI SDK

```bash
npm install openai
```

#### Step 2: Create Environment File

Create `.env.local` in the project root:
```
VITE_OPENAI_API_KEY=your_api_key_here
```

#### Step 3: Update Code Generator

Modify `src/lib/codeGenerator.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function generateCode(
  prompt: string, 
  dsl: DSLType
): Promise<GenerationResult> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a code generation expert. Generate ${dsl.toUpperCase()} code based on the user's description. Follow best practices and include security considerations.`
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    const generatedCode = completion.choices[0]?.message?.content || '';
    
    return {
      code: generatedCode,
      securityWarnings: analyzeSecurityWarnings(generatedCode, dsl)
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      code: '// Error generating code. Please try again.',
      securityWarnings: []
    };
  }
}

function analyzeSecurityWarnings(code: string, dsl: DSLType): string[] {
  const warnings: string[] = [];
  
  // Existing security analysis logic
  // Can be enhanced with AI-powered analysis
  
  return warnings;
}
```

#### Step 4: Update Component

Update `src/pages/DSLCodeGen.tsx`:

```typescript
const handleGenerate = async () => {
  if (!prompt.trim()) return;
  
  setIsGenerating(true);
  
  try {
    const result = await generateCode(prompt, selectedDSL);
    setGeneratedCode(result.code);
    setSecurityWarnings(result.securityWarnings);
  } catch (error) {
    // Handle error
    console.error('Generation error:', error);
  } finally {
    setIsGenerating(false);
  }
};
```

### Other AI Providers

You can integrate other AI providers similarly:

- **Anthropic Claude**: Use `@anthropic-ai/sdk`
- **Google Gemini**: Use `@google/generative-ai`
- **Azure OpenAI**: Use `@azure/openai`

### API Rate Limiting

Consider implementing:
- Request throttling
- Error handling
- Retry logic
- Loading states
- Error messages

---

## 🔮 Future Enhancements

### Planned Features

1. **Real AI Integration**
   - [ ] OpenAI API integration
   - [ ] Multiple AI provider support
   - [ ] Model selection
   - [ ] Temperature and parameter controls

2. **Additional DSLs**
   - [ ] Docker Compose
   - [ ] Ansible Playbooks
   - [ ] CloudFormation
   - [ ] Helm Charts
   - [ ] Pulumi

3. **Enhanced Code Generation**
   - [ ] Context-aware generation
   - [ ] Multi-file generation
   - [ ] Code validation
   - [ ] Syntax checking
   - [ ] Formatting options

4. **User Features**
   - [ ] Code history
   - [ ] Save favorites
   - [ ] Export to file
   - [ ] Share generated code
   - [ ] User accounts
   - [ ] Team collaboration

5. **Security Enhancements**
   - [ ] Advanced security scanning
   - [ ] Compliance checking
   - [ ] Dependency scanning
   - [ ] Secrets detection
   - [ ] Vulnerability assessment

6. **Developer Experience**
   - [ ] Code templates
   - [ ] Custom snippets
   - [ ] Keyboard shortcuts
   - [ ] Dark/light theme toggle
   - [ ] Code formatting
   - [ ] Linting integration

7. **Analytics & Insights**
   - [ ] Usage statistics
   - [ ] Popular prompts
   - [ ] Generation success rate
   - [ ] Performance metrics

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: Dependencies Installation Fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Port 8080 Already in Use

**Solution:**
```bash
# Change port in vite.config.ts
export default defineConfig({
  server: {
    port: 3000, // Change to available port
  },
});
```

#### Issue: Build Fails with TypeScript Errors

**Solution:**
```bash
# Check TypeScript configuration
npm run build

# Fix type errors or adjust tsconfig.json strictness
```

#### Issue: Monaco Editor Not Loading

**Solution:**
- Check browser console for errors
- Ensure `@monaco-editor/react` is installed
- Clear browser cache
- Check network tab for failed resource loads

#### Issue: Styles Not Applying

**Solution:**
```bash
# Rebuild Tailwind
npm run build

# Check tailwind.config.ts paths
# Ensure index.css is imported in main.tsx
```

#### Issue: Security Warnings Not Showing

**Solution:**
- Check that warnings array is populated in generator
- Verify CodeEditor component receives warnings prop
- Check browser console for errors

### Performance Issues

#### Slow Build Times
- Use `npm run build:dev` for faster development builds
- Consider using Vite's dependency pre-bundling

#### Large Bundle Size
- Monaco Editor is large (~2MB)
- Consider code splitting
- Use dynamic imports for heavy components

### Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 14+)
- **IE11**: Not supported

---

## 📊 Project Statistics

- **Total Files**: 100+ files
- **Lines of Code**: ~5,000+ lines
- **Components**: 50+ React components
- **Dependencies**: 469 packages
- **Build Size**: ~373 KB (gzipped: ~120 KB)
- **CSS Size**: ~61 KB (gzipped: ~11 KB)

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check existing documentation
- Review code comments

---

## 🎯 Project Goals

This project demonstrates:
- **Modular Architecture**: Easy to extend and maintain
- **AI-Ready Design**: Structured for seamless AI integration
- **Production Quality**: Enterprise-ready code and security practices
- **Developer Experience**: Intuitive interface and powerful features
- **Best Practices**: Modern React patterns and TypeScript usage

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready (with AI integration pending)

