export interface NetworkInterfaceInfo {
  name: string;
  description: string;
  macAddress: string;
  ipv4Address: string;
  subnetMask: string;
  family: "IPv4";
  internal: boolean;
  operationalStatus: string;
  speedMbps: number | null;
}

export interface GatewayInfo {
  interfaceName: string;
  address: string;
}

export interface NeighborInfo {
  address: string;
  macAddress: string;
  interfaceIndex: number;
  state: string;
}

export interface DiscoveryReport {
  hostname: string;
  platform: string;
  timestamp: string;

  interfaces: NetworkInterfaceInfo[];
  gateways: GatewayInfo[];
  neighbors: NeighborInfo[];
}
