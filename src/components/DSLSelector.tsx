import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Cloud, Container, Code2 } from "lucide-react";

export type DSLType = 'sql' | 'terraform' | 'kubernetes';

interface DSLSelectorProps {
  value: DSLType;
  onValueChange: (value: DSLType) => void;
}

const dslOptions = [
  {
    value: 'sql' as const,
    label: 'SQL',
    description: 'Database queries and schema',
    icon: Database,
  },
  {
    value: 'terraform' as const,
    label: 'Terraform',
    description: 'Infrastructure as Code',
    icon: Cloud,
  },
  {
    value: 'kubernetes' as const,
    label: 'Kubernetes',
    description: 'Container orchestration',
    icon: Container,
  },
];

export function DSLSelector({ value, onValueChange }: DSLSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Target DSL</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-card border-border hover:border-primary transition-smooth">
          <SelectValue placeholder="Select a DSL" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {dslOptions.map((option) => {
            const Icon = option.icon;
            return (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="cursor-pointer hover:bg-secondary focus:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}