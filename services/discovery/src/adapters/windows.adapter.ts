import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export interface WindowsAdapter {
    name: string;
    description: string;
    status: string;
    speedMbps: number | null;
    interfaceIndex: number;
}

export async function collectWindowsAdapters():
    Promise<WindowsAdapter[]> {
        
    }