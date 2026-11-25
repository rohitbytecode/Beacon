import mongoose from "mongoose";

export interface DatabaseHealth {
    connected: boolean;
    database: string | null;
    readyState: number;
    latencyMs: number | null;
}

export async function checkDatabaseHealth():
    Promise<DatabaseHealth> {
        const readyState = mongoose.connection.readyState;

        if (readyState !== 1 || !mongoose.connection.db) {
            return {
                connected: false,
                database: mongoose.connection.name || null,
                readyState,
                latencyMs: null
            };
        }

        const startedAt = performance.now();

        await mongoose.connection.db.admin().ping();

        return {
            connected: true,
            database: mongoose.connection.name,
            readyState,
            latencyMs: Math.round(performance.now() - startedAt)
        };
    }