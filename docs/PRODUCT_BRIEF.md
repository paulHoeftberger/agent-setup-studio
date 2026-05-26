# Product Brief

## Product Name

Agent Setup Studio

## Problem

AI coding agents need project-specific context, permissions, coding guidelines and architecture knowledge to be useful in real software projects.

Developers often maintain scattered files such as:

- AGENTS.md
- CLAUDE.md
- .github/copilot-instructions.md
- docs/architecture.md
- docs/coding-guidelines.md
- docs/roadmap.md
- memory.md

Creating and maintaining these files manually is repetitive, inconsistent and easy to forget.

## Solution

Agent Setup Studio is a VS Code extension that scans the current workspace and guides the developer through a setup wizard.

It generates reviewable Markdown configuration files for AI coding agents.

The extension does not inject prompts into agent chats. Instead, it prepares native context files that tools like GitHub Copilot, Claude Code and similar coding agents can use.

## Target Users

- Developers using GitHub Copilot, Claude Code or similar AI coding agents
- Developers starting a new project
- Developers onboarding AI agents into existing projects
- Teams that want more consistent AI agent behavior
- Developers who want safer defaults for agent permissions and project context

## MVP

The MVP should provide:

- VS Code command: `Agent Setup Studio: Start Setup`
- Simple wizard UI
- Workspace scan
- Detection of existing AI context files
- Generation of `AGENTS.md`
- Generation of `.github/copilot-instructions.md`
- Generation of `docs/coding-guidelines.md`
- Preview before writing files
- Explicit confirmation before modifying files

## Product Principles

- The user stays in control.
- Generated content must be easy to review.
- The extension should be helpful without being magical.
- Existing project files should never be overwritten silently.
- Safety and clarity are more important than automation.