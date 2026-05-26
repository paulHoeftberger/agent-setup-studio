# Architecture

## Overview

Agent Setup Studio is a VS Code extension.

It runs inside the VS Code Extension Host and uses the VS Code API for:

- command registration
- workspace file access
- webview UI
- file generation
- user confirmation dialogs

## Main Components

### Extension Entry Point

File: `src/extension.ts`

Responsibilities:

- activate the extension
- register commands
- connect commands to feature modules

### Wizard UI

Future location: `src/webview/`

Responsibilities:

- show setup steps
- collect user choices
- show previews before writing files

### Workspace Scanner

Future location: `src/scanner/`

Responsibilities:

- inspect the current workspace
- detect known project files
- detect existing AI configuration files
- return structured scan results

### Generators

Future location: `src/generator/`

Responsibilities:

- generate Markdown files
- keep generated content deterministic
- avoid destructive overwrites

### File Writer

Future location: `src/files/`

Responsibilities:

- write files only after preview and confirmation
- create missing folders when needed
- protect existing files from accidental overwrite

## MVP Constraints

- No telemetry
- No backend
- No network calls
- No marketplace publishing
- No hidden prompt injection
- No reading outside the workspace
- No modifying files without confirmation

## Non-Goals

- Direct integration with Copilot chat internals
- Direct integration with Claude Code chat internals
- Automatic publishing
- Cloud sync
- Multi-root workspace support
- Deep AI-based codebase analysis