import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DSLSelector, type DSLType } from "@/components/DSLSelector";
import { CodeEditor, getLanguageFromDSL } from "@/components/CodeEditor";
import { generateCode } from "@/lib/codeGenerator";
import { Code2, Sparkles, Terminal } from "lucide-react";

export default function DSLCodeGen() {
  const [prompt, setPrompt] = useState("");
  const [selectedDSL, setSelectedDSL] = useState<DSLType>('sql');
  const [generatedCode, setGeneratedCode] = useState("");
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API delay for realistic UX
    setTimeout(() => {
      const result = generateCode(prompt, selectedDSL);
      setGeneratedCode(result.code);
      setSecurityWarnings(result.securityWarnings);
      setIsGenerating(false);
    }, 1000);
  };

  const handleReset = () => {
    setPrompt("");
    setGeneratedCode("");
    setSecurityWarnings([]);
  };

  const handleCopy = () => {
    // Toast notification is handled in CodeEditor component
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-primary">
              <Code2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DSL-CodeGen
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform natural language descriptions into production-ready code for SQL, Terraform, and Kubernetes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-glow">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Describe What You Want</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Natural Language Input
                  </label>
                  <Textarea
                    placeholder="e.g., Create a Kubernetes deployment for a Node.js app with 3 replicas..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] bg-input border-border focus:border-primary transition-smooth resize-none"
                  />
                </div>
                
                <DSLSelector 
                  value={selectedDSL} 
                  onValueChange={setSelectedDSL} 
                />
                
                <Button 
                  variant="code" 
                  size="lg" 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Code
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold mb-3 text-foreground">Example Prompts</h3>
              <div className="space-y-3">
                {[
                  { dsl: 'sql', prompt: 'List all users signed up in the last 7 days' },
                  { dsl: 'terraform', prompt: 'Provision an EC2 instance with security groups' },
                  { dsl: 'kubernetes', prompt: 'Create a deployment for a React app with 3 replicas' },
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPrompt(example.prompt);
                      setSelectedDSL(example.dsl as DSLType);
                    }}
                    className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-smooth text-sm"
                  >
                    <span className="text-primary font-mono text-xs uppercase tracking-wide">
                      {example.dsl}
                    </span>
                    <div className="text-foreground mt-1">{example.prompt}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <CodeEditor
                code={generatedCode}
                language={getLanguageFromDSL(selectedDSL)}
                onCodeChange={setGeneratedCode}
                onCopy={handleCopy}
                onReset={handleReset}
                securityWarnings={securityWarnings}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Built for the OpenAI Buildathon • Ready for AI integration • 
            <span className="text-primary ml-1">Modular & Extensible</span>
          </p>
        </div>
      </div>
    </div>
  );
}