import * as vscode from 'vscode';
import { ScanItem, ScanResult } from '../types/workspaceScan';

const ITEMS_TO_SCAN: Array<{ name: string; path: string }> = [
    { name: 'package.json', path: 'package.json' },
    { name: 'tsconfig.json', path: 'tsconfig.json' },
    { name: '.git', path: '.git' },
    { name: '.github/copilot-instructions.md', path: '.github/copilot-instructions.md' },
    { name: 'AGENTS.md', path: 'AGENTS.md' },
    { name: 'CLAUDE.md', path: 'CLAUDE.md' },
    { name: 'docs/architecture.md', path: 'docs/architecture.md' },
    { name: 'docs/coding-guidelines.md', path: 'docs/coding-guidelines.md' },
    { name: 'docs/roadmap.md', path: 'docs/roadmap.md' },
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
                } catch (err) {
                    if (err instanceof vscode.FileSystemError && err.code === 'FileNotFound') {
                        return { ...item, found: false };
                    }
                    throw err;
                }
            })
        );

        return results;
    }
}
