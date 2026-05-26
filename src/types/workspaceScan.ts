export interface ScanItem {
    name: string;
    path: string;
    found: boolean;
}

export type ScanResult = ScanItem[];
