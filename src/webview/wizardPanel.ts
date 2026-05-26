import * as vscode from 'vscode';
import { ScanResult } from '../types/workspaceScan';

export class WizardPanel {
    private static currentPanel: WizardPanel | undefined;

    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];
    private _scanResult: ScanResult;

    public static createOrShow(scanResult: ScanResult): void {
        if (WizardPanel.currentPanel) {
            WizardPanel.currentPanel._scanResult = scanResult;
            WizardPanel.currentPanel._panel.webview.html =
                WizardPanel.currentPanel._getHtmlContent();
            WizardPanel.currentPanel._panel.reveal();
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'agentSetupStudio.wizard',
            'Agent Setup Studio',
            vscode.ViewColumn.One,
            { enableScripts: false }
        );

        WizardPanel.currentPanel = new WizardPanel(panel, scanResult);
    }

    private constructor(panel: vscode.WebviewPanel, scanResult: ScanResult) {
        this._panel = panel;
        this._scanResult = scanResult;
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
        const nonce = Math.random().toString(36).slice(2);
        const csp = `default-src 'none'; style-src ${this._panel.webview.cspSource} 'nonce-${nonce}' 'unsafe-inline';`;
        const scanRows = this._scanResult
            .map(item => {
                const icon = item.found ? '✓' : '✗';
                const style = item.found
                    ? 'color: var(--vscode-testing-iconPassed)'
                    : 'color: var(--vscode-testing-iconFailed)';
                const name = item.name
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
                return `<li><span style="${style}">${icon}</span> <code>${name}</code></li>`;
            })
            .join('\n        ');
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="${csp}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Setup Studio</title>
    <style nonce="${nonce}">
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
    <h2>Detected Project Context</h2>
    <ul>
        ${scanRows}
    </ul>
    <button disabled>Start Setup</button>
</body>
</html>`;
    }
}
