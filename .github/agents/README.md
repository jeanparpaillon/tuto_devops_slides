# GitHub Copilot Agent Architecture

This project uses a multi-agent architecture powered by GitHub Copilot to manage the development of DevOps training slides.

## Agent Structure

### Lobby Agent
**Role**: Issue routing and coordination  
**Model**: GPT-4o  
**Trigger**: Automatically assigned to all new issues

The lobby agent analyzes incoming issues and routes them to the appropriate specialized agent based on the task requirements.

### Specialized Agents

#### Designer Agent
**Expertise**: Diagrams, slide layouts, visual design  
**Model**: GPT-4o  
**Use cases**:
- Creating Mermaid diagrams (DevOps loops, CI/CD flows, architectures)
- Designing slide layouts
- Visual consistency across presentations
- Making complex concepts visually understandable

#### Coder Agent
**Expertise**: Code examples and implementations  
**Model**: GPT-4o  
**Use cases**:
- Node.js application examples
- Infrastructure as Code (Terraform, Ansible, Kubernetes)
- GitHub Actions workflows
- Docker/container configurations
- Example applications for training exercises

#### Project Manager Agent
**Expertise**: Quality assurance, consistency, testing  
**Model**: GPT-4o  
**Use cases**:
- Reviewing code examples for correctness
- Ensuring style and terminology consistency
- Planning and tracking user stories
- Running tests and validation
- Coordinating between agents

#### Trainer Agent
**Expertise**: Pedagogical organization, content balance  
**Model**: GPT-4o  
**Use cases**:
- Organizing slide content logically
- Ensuring alignment with training program
- Balancing presentation and exercises (50/50)
- Adapting content to trainee level
- Managing time allocation for topics

## Workflow

1. **Issue Creation**: When a new issue is created, the GitHub Actions workflow automatically assigns it to Copilot
2. **Routing**: The lobby agent analyzes the issue and routes it to the appropriate specialized agent(s)
3. **Solution Development**: Agents develop solutions following the 3-option approach:
   - Generate 3 potential solutions
   - If option 1 is 30%+ better than option 2, select it automatically
   - Otherwise, present all 3 options to @jeanparpaillon for decision
4. **Implementation**: Agents create PRs with their implementations
5. **Review**: Project manager agent reviews for quality and consistency
6. **Merge**: Approved changes are merged

## Agent Permissions

All agents have the following permissions:
- **issues**: write (create, update, comment on issues)
- **pull_requests**: write (create and manage PRs)
- **contents**: write (make changes to repository files)

## Decision Escalation

Agents mention @jeanparpaillon only for:
- Critical architectural decisions
- Significant scope changes
- Conflicts that cannot be resolved automatically
- When multiple solutions are equally viable (no clear 30% advantage)

For routine decisions, agents coordinate among themselves via the lobby agent.

## Training Program Context

The agents reference a centralized training configuration file (`training-config.yml`) that defines:
- **5-day curriculum** for both Developer and Operator tracks
- **Technical stack** and tools used in training
- **Session structure** and timing recommendations
- **Half-day balance** goals (50% presentation / 50% exercises)

Key training tracks:
- **DevOps for Developers**: Focus on git, GitHub, CI/CD, containerization, quality tools
- **DevOps for Operators**: Focus on infrastructure (Terraform, Ansible, Kubernetes)

**Note**: The authoritative source for all training content is the main `README.md` file in the repository root.

### Related Repositories for Exercises and Samples

Agents should be aware of and reference these companion repositories:

- **tuto_devops_prod**: Contains production-ready examples and advanced exercises
- **tuto_devops_github**: Contains GitHub-specific exercises and workflow examples

These repositories provide practical, hands-on materials that complement the slide content.

This centralized configuration ensures consistency across all agents and makes curriculum updates easy.

## Usage

### Creating Issues
Simply create an issue with a descriptive title and description. The workflow will automatically:
1. Assign the issue to Copilot
2. Add the `copilot-managed` label
3. Trigger the lobby agent to analyze and route it

### Routing Keywords
The lobby agent uses these keywords to route issues:
- **Designer**: diagram, layout, design, visual, theme, appearance
- **Coder**: code, example, implementation, snippet, application
- **Project Manager**: test, quality, consistency, planning, review
- **Trainer**: slides, training, organization, exercises, balance, pedagogy

### Example Issues
- "Create a Mermaid diagram for the DevOps infinite loop" → Designer
- "Add Node.js containerization example for Day 2" → Coder
- "Review consistency across all Day 1 slides" → Project Manager
- "Reorganize Day 3 to balance presentation and exercises" → Trainer

## Configuration Files

Agent configurations are stored in `.github/agents/`:
- `lobby.yml` - Main routing agent
- `designer.yml` - Visual design specialist
- `coder.yml` - Code examples specialist
- `project-manager.yml` - Quality and consistency manager
- `trainer.yml` - Pedagogical organization specialist
- `training-config.yml` - Centralized training curriculum and configuration

Workflow configuration: `.github/workflows/assign-copilot.yml`

## Benefits

1. **Specialized Expertise**: Each agent is optimized for its domain
2. **Efficient Routing**: Issues automatically go to the right expert
3. **Quality Assurance**: Project manager ensures consistency
4. **Pedagogical Focus**: Trainer ensures effective learning outcomes
5. **Reduced Overhead**: Only critical decisions require human intervention
6. **Clear Accountability**: Each task has a designated responsible agent
7. **Centralized Configuration**: Single source of truth for training curriculum
