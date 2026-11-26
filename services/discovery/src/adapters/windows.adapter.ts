import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface WindowsAdapter {
  name: string;
  description: string;
  status: string;
  speedMbps: number | null;
  interfaceIndex: number;
}

export async function collectWindowsAdapters(): Promise<WindowsAdapter[]> {
  const script = `
            Get-NetAdapter |
            Select-Object Name,
                          InterfaceDescription,
                          Status,
                          LinkSpeed,
                          ifIndex |
            ConvertTo-Json -Compress
        `;

  const { stdout } = await execFileAsync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", script],
    {
      windowsHide: true,
      timeout: 10000,
      maxBuffer: 1024 * 1024,
    },
  );

  const parsed: unknown = JSON.parse(stdout);

  const records = Array.isArray(parsed) ? parsed : [parsed];

  return records.map((item: any) => ({
    name: String(item.Name),
    description: String(item.InterfaceDescription),
    status: String(item.Status),
    speedMbps: parseLinkSpeed(item.LinkSpeed),
    interfaceIndex: Number(item.ifIndex),
  }));
}

function parseLinkSpeed(value: string): number | null {
  const match = /^([\d.]+)\s*(Gbps|Mbps)$/i.exec(value);

  if (!match) return null;

  const speed = Number(match[1]);

  return match[2].toLowerCase() === "gbps" ? speed * 1000 : speed;
}
