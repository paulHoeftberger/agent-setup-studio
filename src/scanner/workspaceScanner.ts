import * as vscode from 'vscode';
import { ScanItem, ScanResult } from '../types/workspaceScan';

const ITEMS_TO_SCAN: Array<{ name: string; path: string }> = [
    { name: 'package.json', path: 'package.json' },
    { name: 'tsconfig.json', path: 'tsconfig.json' },
    { name: '.git', path: '.git' },
    { name: '.github/copilot-instructions.md', path: '.github/copilot-instructions.md' },
    { name: 'AGENTS.md', path: 'AGENTS.md' },
    { name: 'CLAUDE.md', path: 'CLAUDE.md' },
    { name: 'docs/ARCHITECTURE.md', path: 'docs/ARCHITECTURE.md' },
    { name: 'docs/CODING_GUIDELINES.md', path: 'docs/CODING_GUIDELINES.md' },
    { name: 'docs/ROADMAP.md', path: 'docs/ROADMAP.md' },
];

export class WorkspaceScanner {
    public static async scan(): Promise<ScanResult> {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
            return ITEMS_TO_SCAN.map(item => ({ ...item, found: false }));
        }

        const root = folders[0].uri;

        const results: ScanResult = await Promise.all(
            ITEMS_TO_SCAN.map(async (item): Promise<ScanItem> => {
                try {
                    await vscode.workspace.fs.stat(vscode.Uri.joinPath(root, item.path));
                    return { ...item, found: true };
                } catch {
                    return { ...item, found: false };
                }
            })
        );

        return results;
    }
}
