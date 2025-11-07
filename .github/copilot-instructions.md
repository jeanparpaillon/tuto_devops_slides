# GitHub Copilot Instructions for DevOps Training Slides

## Project Overview

This repository contains **DevOps training materials** for Société Générale Algérie, delivered as interactive slide presentations using **Slidev** (a Vue.js-based presentation framework). The training is split into two main tracks:

- **formation-dev**: DevOps for Developers (5-day program)
- **formation-prod**: DevOps for Operators (5-day program)

The slides cover topics including Git, GitHub, CI/CD, containerization, artifact management, Infrastructure as Code (Terraform/Ansible), Kubernetes, and more.

### Architecture
- **Framework**: Slidev (Vue 3 + Markdown)
- **Package Manager**: pnpm 10 (CI/CD uses major version 10 for stability, local dev may use 10.18.3 per `.tool-versions`)
- **Node.js**: 22 (CI/CD uses LTS version 22, local dev may use 24.10.0 per `.tool-versions`)
- **Deployment**: GitHub Pages (automated via GitHub Actions)
- **Multi-Agent System**: This repository uses specialized AI agents for different tasks (see `.github/agents/README.md`)

## How to Build, Test, and Validate

### Prerequisites
- **For local development**: Install versions specified in `.tool-versions` (Node.js 24.10.0, pnpm 10.18.3) or use asdf/mise
- **For CI/CD compatibility**: Node.js 22+ and pnpm 10+ will work (see `.github/workflows/deploy.yml`)
- Run `pnpm install` to install dependencies

### Development Commands
- **Start dev server for developers track**: `pnpm dev:dev` or `make dev-dev`
- **Start dev server for operators track**: `pnpm dev:prod` or `make dev-prod`
- **Build all presentations**: `pnpm build` or `make build`
- **Export to PDF**: `pnpm export:dev` or `pnpm export:prod` or `make pdf` (note: `pnpm export` shows usage)
- **Clean build artifacts**: `make clean`

### Validation
- ALWAYS test slide builds locally before committing changes to ensure no broken references or syntax errors
- Run `make clean && make` to verify full build pipeline works
- Preview slides in development mode to check formatting and diagrams render correctly
- Ensure Mermaid diagrams render properly if modified

## Coding Standards and Best Practices

### Slide Content Guidelines
- Write slides in **Markdown** format with YAML frontmatter
- Use the `the-unnamed` theme for consistency
- Keep slides modular: use `src:` includes to reference external pages from `slides/pages/`
- Follow existing naming conventions: `dev-*.md` for developer track, `prod-*.md` for operator track
- ALWAYS use Mermaid syntax for diagrams (architecture, flow charts, etc.)

### File Organization
- Main slide decks: `slides/formation-dev.md` and `slides/formation-prod.md`
- Individual slide pages: `slides/pages/`
- Shared components: `components/`
- Code examples and snippets: `snippets/`
- Exercises: `exercises/`

### Code and Content Quality
- NEVER commit sensitive information (credentials, internal URLs, personal data)
- Keep code examples simple, clear, and pedagogically sound
- Ensure all external links are accessible and relevant
- Use proper syntax highlighting for code blocks (specify language)
- Keep slides concise and focused on key learning objectives

### Documentation
- Update `README.md` if significant structural changes are made
- Keep `TODO.md` current with pending tasks
- Document new features or major content additions

## Multi-Agent Architecture

This repository uses specialized Copilot agents to handle different types of work:

- **Designer Agent**: For diagrams, visual layouts, and design elements
- **Coder Agent**: For code examples and implementations
- **Trainer Agent**: For slide organization and pedagogical content
- **Project Manager Agent**: For quality assurance and consistency checks
- **Lobby Agent**: For routing tasks to appropriate specialists

When creating issues, consider tagging the appropriate specialized agent. See `.github/agents/README.md` for details on how to work with these agents.

## Sensitive Areas and Cautions

- **DO NOT** modify workflow files (`.github/workflows/`) without testing in a fork first
- **DO NOT** change agent configurations (`.github/agents/`) unless specifically requested
- **BE CAREFUL** when updating dependencies - ensure compatibility with Slidev and Node.js version
- **VERIFY** that any changes to `Makefile` or build scripts work across different platforms
- **PRESERVE** existing slide structure and numbering to avoid breaking external references

## Testing and CI/CD

- **Automated Deployment**: Pushes to the repository trigger a build via `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages
- **Build Process**: Runs `make clean && make` which builds HTML and PDF outputs
- **Deployment Target**: `gh-pages` branch serves the static site
- **Node.js & pnpm versions**: CI/CD uses Node.js 22 and pnpm 10 (see workflow file for exact versions)
- **ALWAYS** ensure builds succeed before merging to main branch

## Additional Resources

- [Slidev Documentation](https://sli.dev/)
- [Agent Architecture Details](.github/agents/README.md)
- [Agent Quick Start](.github/agents/QUICKSTART.md)
- [Main README](../README.md)

## Change Workflow

1. Create focused issues describing the task clearly
2. Let specialized agents handle their domain tasks (design, coding, training content)
3. Preview changes locally using dev server
4. Verify builds complete successfully
5. Check that slides render correctly and diagrams display properly
6. Commit with descriptive messages
7. Pull requests will be automatically built and deployed for review
