import * as vscode from 'vscode';

export class WizardPanel {
    private static currentPanel: WizardPanel | undefined;

    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(): void {
        if (WizardPanel.currentPanel) {
            WizardPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'agentSetupStudio.wizard',
            'Agent Setup Studio',
            vscode.ViewColumn.One,
            { enableScripts: false }
        );

        WizardPanel.currentPanel = new WizardPanel(panel);
    }

    private constructor(panel: vscode.WebviewPanel) {
        this._panel = panel;
        this._panel.webview.html = this._getHtmlContent();

        this._panel.onDidDispose(
            () => {
                WizardPanel.currentPanel = undefined;
                this._dispose();
            },
            null,
            this._disposables
        );
    }

    private _dispose(): void {
        for (const disposable of this._disposables) {
            disposable.dispose();
        }
        this._disposables = [];
    }

    private _getHtmlContent(): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Setup Studio</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            padding: 24px 32px;
            max-width: 600px;
        }
        h1 {
            font-size: 1.4em;
            margin-bottom: 8px;
        }
        p {
            line-height: 1.6;
            margin-bottom: 16px;
        }
        ul {
            margin: 0 0 24px 0;
            padding-left: 20px;
            line-height: 1.8;
        }
        button {
            padding: 8px 16px;
            font-size: var(--vscode-font-size);
            cursor: not-allowed;
            opacity: 0.5;
        }
    </style>
</head>
<body>
    <h1>Agent Setup Studio</h1>
    <p>
        This tool guides you through creating configuration files for AI coding agents.
        It scans your workspace and generates reviewable Markdown files that tools like
        GitHub Copilot and Claude Code can use.
    </p>
    <p>Files this tool will help you generate:</p>
    <ul>
        <li><code>AGENTS.md</code></li>
        <li><code>.github/copilot-instructions.md</code></li>
        <li><code>docs/coding-guidelines.md</code></li>
        <li><code>docs/architecture.md</code></li>
        <li><code>docs/roadmap.md</code></li>
    </ul>
    <button disabled>Start Setup</button>
</body>
</html>`;
    }
}
