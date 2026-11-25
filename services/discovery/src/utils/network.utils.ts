export function isValidIPv4(ip: string): boolean {
    const parts = ip.split(".");

    if (parts.length !== 4) return false;

    return parts.every(part => {
        if (!/^\d{1,3}$/.test(part)) return false;

        const value = Number(part);

        return value >= 0 && value <= 255;
    });
}

export function isValidMacAddress(mac: string): boolean {
    return /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i.test(mac);
}

export function normalizeMacAddress(mac: string): string {
    return mac.replace(/[:-]/g, "").toUpperCase();
}