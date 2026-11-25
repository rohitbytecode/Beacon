import os from 'node:os';

import type {
    NetworkInterfaceInfo
} from '../types/discovery.types.js';

export function collectInterfaces():
    NetworkInterfaceInfo[] {
        const interfaces = os.networkInterfaces();
        const results: NetworkInterfaceInfo[] = [];

        for (const [name, addresses] of Object.entries(interfaces)) {
            if (!addresses) continue;

            for (const address of addresses) {

                if (address.family !== "IPv4") continue;

                results.push({
                    name,
                    description: name,
                    macAddress: address.mac,
                    ipv4Address: address.address,
                    subnetMask: address.netmask,
                    family: "IPv4",
                    internal: address.internal,
                    operationalStatus: "unknown",
                    speedMbps: null
                });
            }
        }

        return results;
    }