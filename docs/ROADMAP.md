# Roadmap

## Milestone 1: Extension Shell

Goal: Create the smallest working VS Code extension flow.

- Register command: `agentSetupStudio.start`
- Add command palette title: `Agent Setup Studio: Start Setup`
- Show a simple information message
- Verify the extension runs in the Extension Development Host

## Milestone 2: Simple Wizard

Goal: Replace the information message with a minimal guided UI.

- Open a VS Code webview panel
- Show the product name
- Show a short explanation
- Add a first fake step: "Project Type"
- No file writing yet

## Milestone 3: Workspace Scan

Goal: Detect useful project context.

- Detect `package.json`
- Detect `tsconfig.json`
- Detect `.git`
- Detect `.github/copilot-instructions.md`
- Detect `AGENTS.md`
- Detect `CLAUDE.md`
- Display scan results in the wizard

## Milestone 4: Generate AGENTS.md

Goal: Generate the first reviewable agent configuration file.

- Ask basic setup questions
- Generate Markdown preview
- Ask for explicit confirmation
- Write `AGENTS.md`

## Milestone 5: Generate Copilot Instructions

Goal: Generate GitHub Copilot repository instructions.

- Generate `.github/copilot-instructions.md`
- Warn if file already exists
- Preview before overwrite
- Require explicit confirmation

## Milestone 6: Coding Guidelines Draft

Goal: Generate a first coding guidelines file.

- Detect project language/framework
- Suggest basic coding rules
- Ask user to confirm or adjust
- Write `docs/coding-guidelines.md`

## Milestone 7: Architecture Draft

Goal: Generate a reviewable architecture draft.

- Analyze project structure
- Detect stack and folders
- Ask user for project purpose and boundaries
- Write `docs/architecture.md`