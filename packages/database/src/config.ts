import "dotenv/config";

export interface DatabaseConfig {
  uri: string;
  serverSelectionTimeoutMS: number;
}

export function getDatabaseConfig(): DatabaseConfig {
  const uri = process.env.BEACON_MONGODB_URI;

  if (!uri) {
    throw new Error("BEACON_MONGODB_URI environment variable is missing");
  }

  return {
    uri,
    serverSelectionTimeoutMS: 5000,
  };
}
