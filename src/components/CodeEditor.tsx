import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { DSLType } from "./DSLSelector";

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (value: string) => void;
  onCopy: () => void;
  onReset: () => void;
  securityWarnings?: string[];
}

const getLanguageFromDSL = (dsl: DSLType): string => {
  switch (dsl) {
    case 'sql':
      return 'sql';
    case 'terraform':
      return 'hcl';
    case 'kubernetes':
      return 'yaml';
    default:
      return 'text';
  }
};

export function CodeEditor({ 
  code, 
  language, 
  onCodeChange, 
  onCopy, 
  onReset,
  securityWarnings = []
}: CodeEditorProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      onCopy();
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied successfully",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Generated Code</h3>
        <div className="flex gap-2">
          <Button variant="copy" size="sm" onClick={handleCopy} disabled={!code}>
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="danger" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {securityWarnings.length > 0 && (
        <div className="bg-warning-orange/10 border border-warning-orange/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-warning-orange" />
            <span className="text-sm font-medium text-warning-orange">Security Warnings</span>
          </div>
          <ul className="text-sm text-warning-orange/80 space-y-1">
            {securityWarnings.map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative rounded-lg overflow-hidden shadow-code border border-border">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => onCodeChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, Consolas, Monaco, Courier New, monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
    </div>
  );
}

export { getLanguageFromDSL };