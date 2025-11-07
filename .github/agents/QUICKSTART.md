# Quick Start Guide: GitHub Copilot Agent System

## What is This?

This repository now has an AI-powered agent system that automatically helps manage the development of DevOps training slides. When you create an issue, specialized AI agents will handle it for you!

## How It Works

### 1. Create an Issue
Simply create a GitHub issue describing what you need. For example:
- "Create a Mermaid diagram showing the DevOps infinite loop"
- "Add Node.js containerization code example for Day 2"
- "Review all Day 1 slides for consistency"
- "Reorganize Day 3 to better balance theory and exercises"

### 2. Automatic Assignment
The system automatically:
- Assigns `@copilot` to your issue
- Adds a `copilot-managed` label
- The Lobby Agent analyzes your issue

### 3. Specialized Agent Handling
The Lobby Agent routes your issue to the right specialist:

**🎨 Designer Agent** handles:
- Diagrams (Mermaid, architecture, flows)
- Slide layouts and visual design
- Making concepts visually understandable

**💻 Coder Agent** handles:
- Code examples (Node.js, Terraform, Ansible, K8s)
- Infrastructure as Code
- GitHub Actions workflows
- Docker configurations

**✅ Project Manager Agent** handles:
- Quality reviews
- Consistency checks
- Testing and validation
- Progress tracking

**📚 Trainer Agent** handles:
- Slide organization
- Exercise planning
- Balancing theory and practice (50/50 goal)
- Ensuring content matches trainee level

### 4. Solution Delivery
Agents will:
- Analyze your request
- Develop 3 possible solutions
- If one solution is clearly best (30%+ better), they'll implement it
- Otherwise, they'll present all 3 options for you to choose
- They mention `@jeanparpaillon` only for critical decisions

## Example Issues

### For Designer:
```
Title: Create DevOps infinite loop diagram
Description: We need a Mermaid diagram showing the continuous DevOps cycle
for Day 1 presentation. Should include: Plan → Code → Build → Test → 
Release → Deploy → Operate → Monitor → Plan
```

### For Coder:
```
Title: Add Terraform libvirt example
Description: Create a Terraform configuration for Day 2 operator track that
sets up 1 master and 2 nodes using libvirt provider. Should be well-commented
and include README.
```

### For Trainer:
```
Title: Balance Day 3 presentation and exercises
Description: Day 3 currently has too much presentation time. Need to
reorganize to achieve 50/50 split between theory and hands-on exercises.
```

### For Project Manager:
```
Title: Review consistency across all slides
Description: Check that terminology is consistent, code examples follow
best practices, and both Dev/Ops tracks are aligned where they overlap.
```

## Training Program Structure

The agents know about our 5-day training program:

**DevOps for Developers:**
- Day 1: DevOps basics, git, GitHub
- Day 2: CI/CD, containerization, GitHub Actions
- Day 3: Artifact management, Artifactory
- Day 4: SonarQube, XRAY
- Day 5: Advanced topics, project management

**DevOps for Operators:**
- Day 1: DevOps basics, git, CI/CD, architecture
- Day 2: Terraform
- Day 3: Ansible
- Day 4: Kubernetes
- Day 5: Monitoring/HA/Security (customizable)

All details are in `.github/agents/training-config.yml`

## Tips for Best Results

1. **Be specific**: "Create a diagram for X" is better than "We need diagrams"
2. **Mention context**: Reference which Day and track (Dev/Ops)
3. **State your goal**: What should trainees learn from this?
4. **Use keywords**: The system routes based on words like "diagram", "code", "test", "organize"

## Routing Keywords

The system uses these keywords to route your issue:

- **diagram, layout, design, visual** → Designer Agent
- **code, example, implementation, snippet** → Coder Agent
- **test, quality, consistency, planning** → Project Manager Agent
- **slides, training, organization, exercises, balance** → Trainer Agent

## What Happens Behind the Scenes

1. GitHub Actions workflow triggers on new issue
2. Lobby Agent analyzes issue content and keywords
3. Appropriate specialized agent is assigned
4. Agent develops solutions (usually 3 options)
5. If one is clearly best, it's implemented automatically
6. Otherwise, options are presented to you
7. Implementation happens via Pull Request
8. Project Manager reviews for quality
9. You review and merge the PR

## Need Help?

- Check `.github/agents/README.md` for detailed architecture docs
- Review `.github/agents/training-config.yml` for training structure
- See `.github/agents/MODEL-SELECTION.md` for AI model options and alternatives
- The agents will ask if they need clarification
- You can always add comments to guide the agents

## AI Model Configuration

The agents currently use GPT-4o by default, but you can configure alternative models:
- **Commercial options**: GPT-4o-mini, Claude 3.5 Sonnet, O1-preview
- **Open source options**: Mistral, Llama 3.1, Codestral
- See `MODEL-SELECTION.md` for detailed recommendations and configuration guide

## Context Repositories

Agents are aware of companion repositories for exercises and samples:
- **tuto_devops_prod**: Production-ready examples and advanced exercises
- **tuto_devops_github**: GitHub-specific exercises and workflow examples

## Benefits

✅ **Faster Development**: Agents work 24/7
✅ **Consistent Quality**: Project Manager ensures standards
✅ **Specialized Expertise**: Each agent is optimized for its domain
✅ **Less Manual Work**: Focus on reviewing instead of creating
✅ **Pedagogical Focus**: Trainer ensures effective learning
✅ **Easy to Use**: Just create issues naturally
✅ **Flexible Models**: Choose the AI model that fits your needs and budget

## Advanced: Direct Agent Assignment

If you know which agent you need, mention them in your issue:
- `@designer` for visual work
- `@coder` for code examples
- `@project-manager` for reviews
- `@trainer` for organization

But the Lobby Agent will usually figure it out automatically!

---

**Ready to try it?** Create your first issue and watch the magic happen! 🚀
