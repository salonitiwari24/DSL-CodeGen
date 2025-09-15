# DSL-CodeGen 🧩

**AI-Powered Code Generation for Developers**

Transform natural language descriptions into production-ready code for SQL, Terraform, and Kubernetes YAML. Built for the OpenAI Buildathon with a modular architecture ready for AI integration.

![DSL-CodeGen Preview](https://via.placeholder.com/800x400/1a1a1a/00d4ff?text=DSL-CodeGen+Interface)

## ✨ Features

- **Natural Language Input**: Describe what you want in plain English
- **Multi-DSL Support**: Generate SQL, Terraform HCL, and Kubernetes YAML
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Security Warnings**: Built-in security checker for generated code
- **Copy & Reset**: Easy code management with one-click actions
- **Responsive Design**: Beautiful dark theme optimized for developers
- **Modular Architecture**: Ready for OpenAI API integration

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Code Editor**: Monaco Editor (VS Code engine)
- **Icons**: Lucide React
- **State Management**: React hooks
- **Build Tool**: Vite with hot reload

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd dsl-codegen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 🧠 Example Usage

### SQL Generation
**Input**: "List all users signed up in the last 7 days"
**Output**: Optimized SQL query with proper indexing and security warnings

### Terraform Generation  
**Input**: "Provision an EC2 instance with security groups"
**Output**: Complete Terraform configuration with security best practices

### Kubernetes Generation
**Input**: "Create a deployment for a React app with 3 replicas"
**Output**: Production-ready Kubernetes manifests with health checks

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── DSLSelector.tsx  # DSL selection dropdown
│   └── CodeEditor.tsx   # Monaco editor wrapper
├── lib/
│   ├── codeGenerator.ts # Static code generation logic
│   └── utils.ts        # Utility functions
├── pages/
│   └── DSLCodeGen.tsx  # Main application page
├── hooks/              # Custom React hooks
└── index.css          # Design system & themes
```

## 🔌 Adding OpenAI API Integration

The codebase is designed for easy AI integration. To add OpenAI API:

1. **Install OpenAI SDK**
   ```bash
   npm install openai
   ```

2. **Update code generation logic** in `src/lib/codeGenerator.ts`:
   ```typescript
   import OpenAI from 'openai';
   
   const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY,
   });
   
   export async function generateCode(prompt: string, dsl: DSLType): Promise<GenerationResult> {
     const completion = await openai.chat.completions.create({
       model: "gpt-4",
       messages: [
         {
           role: "system",
           content: `You are a code generation expert. Generate ${dsl.toUpperCase()} code based on the user's description.`
         },
         {
           role: "user", 
           content: prompt
         }
       ],
     });
     
     return {
       code: completion.choices[0]?.message?.content || '',
       securityWarnings: analyzeSecurityWarnings(completion.choices[0]?.message?.content || '')
     };
   }
   ```

3. **Add environment variables** (create `.env.local`):
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## 🔐 Security Features

- **Automated Security Scanning**: Detects common security issues
- **Warning System**: Visual alerts for potentially unsafe configurations
- **Best Practice Suggestions**: Contextual security recommendations
- **Input Validation**: Sanitizes user inputs before processing

## 🎨 Design System

The app uses a comprehensive design system with:
- **Dark Developer Theme**: Easy on the eyes for long coding sessions
- **Semantic Color Tokens**: Consistent theming throughout the app
- **Custom Gradients**: Beautiful visual effects using CSS custom properties
- **Responsive Layout**: Works perfectly on all screen sizes
- **Smooth Animations**: Polished user experience with CSS transitions

## 📱 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 🧪 Testing & Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📈 Future Enhancements

- [ ] **OpenAI API Integration**: Real AI-powered code generation
- [ ] **Additional DSLs**: Docker, Ansible, CloudFormation support  
- [ ] **Code Validation**: Real-time syntax checking
- [ ] **Export Options**: Save generated code as files
- [ ] **History Feature**: Track and manage previous generations
- [ ] **Team Collaboration**: Share and collaborate on generated code
- [ ] **Custom Templates**: User-defined code templates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Built for OpenAI Buildathon

This project demonstrates:
- **Modular Architecture**: Easy to extend and maintain
- **AI-Ready Design**: Structured for seamless AI integration  
- **Production Quality**: Enterprise-ready code and security practices
- **Developer Experience**: Intuitive interface and powerful features

---

**Ready to transform your natural language into code?** 🚀

Start the development server and begin generating production-ready DSL code instantly!