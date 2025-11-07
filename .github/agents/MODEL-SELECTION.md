---
# AI Model Configuration Guide

This document provides guidance on selecting AI models for the GitHub Copilot agent architecture.

## Current Configuration

All agents are currently configured with `gpt-4o` as the default model.

## Recommended Model Options

### Commercial Models

#### OpenAI Models
- **gpt-4o** (Current default)
  - Best overall performance
  - Excellent code generation and analysis
  - Strong reasoning capabilities
  - Cost: Moderate to high

- **gpt-4o-mini**
  - Faster and more cost-effective
  - Good for simpler routing and documentation tasks
  - Recommended for: Lobby agent
  - Cost: Lower than gpt-4o

- **o1-preview** / **o1-mini**
  - Advanced reasoning capabilities
  - Better for complex planning and decision-making
  - Recommended for: Project Manager, Trainer
  - Cost: Higher than gpt-4o

- **gpt-4-turbo**
  - Latest GPT-4 variant
  - Good balance of performance and cost
  - Suitable for all agents
  - Cost: Similar to gpt-4o

#### Anthropic Claude Models
- **claude-3-5-sonnet**
  - Excellent at creative tasks and long-form content
  - Strong code generation
  - Recommended for: Designer, Coder, Trainer
  - Cost: Competitive with GPT-4o
  - Access: Requires Anthropic API key

- **claude-3-opus**
  - Most capable Claude model
  - Best for complex reasoning and quality work
  - Recommended for: Project Manager, Trainer
  - Cost: Higher tier
  - Access: Requires Anthropic API key

- **claude-3-haiku**
  - Fast and cost-effective
  - Good for routing and simple tasks
  - Recommended for: Lobby agent
  - Cost: Lower tier
  - Access: Requires Anthropic API key

### Open Source / Free Alternatives

#### Mistral AI Models (via API or self-hosted)
- **mistral-large**
  - Competitive performance with commercial models
  - Good code generation
  - Suitable for: All agents
  - Cost: Free tier available, or self-hosted
  - Access: Mistral API or self-hosted

- **mistral-medium**
  - Good balance of performance and efficiency
  - Suitable for: Most agents
  - Cost: Lower than mistral-large
  - Access: Mistral API

- **mistral-small**
  - Fast and efficient
  - Good for routing and simple tasks
  - Recommended for: Lobby agent
  - Cost: Lowest tier
  - Access: Mistral API

- **codestral**
  - Specialized for code generation
  - Recommended for: Coder agent
  - Cost: Free tier available
  - Access: Mistral API

#### Meta Llama Models (self-hosted)
- **llama-3.1-405b**
  - Largest and most capable
  - Requires significant compute resources
  - Suitable for: All agents (if resources available)
  - Cost: Self-hosting costs only

- **llama-3.1-70b**
  - Good balance of performance and resource requirements
  - Suitable for: Most agents
  - Cost: Self-hosting costs only

- **llama-3.1-8b**
  - Lightweight and fast
  - Good for routing and simple tasks
  - Recommended for: Lobby agent
  - Cost: Self-hosting costs only

#### DeepSeek Models
- **deepseek-coder**
  - Specialized for code generation
  - Strong performance on coding tasks
  - Recommended for: Coder agent
  - Cost: API access or self-hosted

#### Other Options
- **Qwen/Qwen2.5-Coder-32B**
  - Open source code generation model
  - Good alternative to proprietary models
  - Recommended for: Coder agent
  - Cost: Self-hosting only

## Recommended Configuration by Agent

### Option 1: All OpenAI (Optimized for cost)
```yaml
lobby: gpt-4o-mini          # Fast routing
designer: gpt-4o            # Visual design quality
coder: gpt-4o               # Code quality
project-manager: o1-preview # Advanced reasoning
trainer: o1-preview         # Pedagogical planning
```

### Option 2: Mixed (Best performance)
```yaml
lobby: claude-3-haiku       # Fast routing
designer: claude-3-5-sonnet # Creative design
coder: gpt-4o               # Code generation
project-manager: o1-preview # Quality assurance
trainer: claude-3-opus      # Pedagogical excellence
```

### Option 3: Open Source (Free/Self-hosted)
```yaml
lobby: mistral-small        # Fast routing
designer: llama-3.1-70b     # Design tasks
coder: codestral            # Code specialization
project-manager: mistral-large # Quality checks
trainer: llama-3.1-405b     # Planning (if resources allow)
```

### Option 4: Budget-Friendly Mix
```yaml
lobby: mistral-small        # Free tier
designer: gpt-4o-mini       # Cost-effective
coder: codestral            # Free for code
project-manager: gpt-4o     # Quality where it matters
trainer: claude-3-5-sonnet  # Pedagogical creativity
```

## How to Configure

Edit each agent configuration file in `.github/agents/`:

```yaml
name: Agent Name
description: Agent description
model: your-chosen-model  # Change this line
permissions:
  issues: write
  pull_requests: write
  contents: write
```

## Model Selection Criteria

### For Lobby Agent
- **Priority**: Speed and cost
- **Requirements**: Good at text classification and routing
- **Recommended**: gpt-4o-mini, claude-3-haiku, mistral-small

### For Designer Agent
- **Priority**: Creativity and visual understanding
- **Requirements**: Good at diagram generation, layout design
- **Recommended**: claude-3-5-sonnet, gpt-4o, llama-3.1-70b

### For Coder Agent
- **Priority**: Code quality and accuracy
- **Requirements**: Strong code generation and understanding
- **Recommended**: gpt-4o, codestral, deepseek-coder, claude-3-5-sonnet

### For Project Manager Agent
- **Priority**: Reasoning and consistency
- **Requirements**: Good at analysis, validation, planning
- **Recommended**: o1-preview, claude-3-opus, mistral-large

### For Trainer Agent
- **Priority**: Pedagogical understanding and planning
- **Requirements**: Good at content organization, learning design
- **Recommended**: o1-preview, claude-3-opus, claude-3-5-sonnet

## Access Requirements

### OpenAI Models
- Requires: OpenAI API key
- Account: https://platform.openai.com
- Note: User mentioned having GPT-5 access (when available)

### Anthropic Models
- Requires: Anthropic API key
- Account: https://console.anthropic.com

### Mistral Models
- Requires: Mistral API key (free tier available)
- Account: https://console.mistral.ai
- Alternative: Self-hosted deployment

### Open Source Models
- Requires: Self-hosting infrastructure
- Tools: Ollama, vLLM, text-generation-inference
- Note: Requires GPU resources for optimal performance

## Testing Recommendations

1. Start with one agent (e.g., Lobby) and test different models
2. Evaluate based on:
   - Response quality
   - Speed
   - Cost
   - Consistency
3. Gradually roll out to other agents
4. Monitor performance and adjust as needed

## Notes

- Model availability may vary by region and API access
- Performance can vary based on prompt quality and context
- Consider fallback options if primary model is unavailable
- Monitor API costs and usage limits
- Free/open-source options may require technical setup and maintenance
