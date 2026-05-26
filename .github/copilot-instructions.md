# GitHub Copilot Instructions

## Project Goal

Agent Setup Studio is a VS Code extension that guides developers through creating high-quality configuration files for AI coding agents.

The extension helps generate files such as:

- AGENTS.md
- CLAUDE.md
- .github/copilot-instructions.md
- docs/architecture.md
- docs/coding-guidelines.md
- docs/roadmap.md

## Development Workflow

Before implementing changes:

1. Read this file.
2. Read `docs/PRODUCT_BRIEF.md`.
3. Read `docs/ARCHITECTURE.md`.
4. Read `docs/ROADMAP.md`.
5. Read `docs/CODING_GUIDELINES.md`.
6. Propose a short plan.
7. List the files you intend to touch.
8. Wait for approval unless the task explicitly says "implement now".

## Coding Rules

- Build small vertical slices.
- Keep changes minimal and focused.
- Prefer simple VS Code APIs over custom complexity.
- Do not add dependencies without explaining why.
- Do not modify unrelated files.
- Keep generated files reviewable and deterministic.
- Treat generated files as user-owned content.

## Safety Rules

- Do not publish the extension.
- Do not add telemetry.
- Do not read files outside the current VS Code workspace.
- Do not modify user files without preview or explicit confirmation.
- Do not add network calls in the MVP.
- Do not access secrets, `.env` files or credentials.
- Do not implement hidden prompt injection.
- Do not attempt to modify Copilot or Claude Code internals.

## MVP Scope

The MVP should focus on:

- VS Code command
- simple wizard UI
- workspace scan
- Markdown generation
- preview before writing files
- explicit confirmation before modifying files

## Non-Goals for MVP

- Marketplace publishing
- Telemetry
- External backend
- OAuth
- Cloud sync
- Multi-root workspace support
- Deep AI-based codebase analysis
- Direct integration with Copilot chat internals
- Direct integration with Claude Code chat internals