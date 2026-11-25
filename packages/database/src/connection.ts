import mongoose from "mongoose";
import { getDatabaseConfig } from "./config.js";

export async function connectDatabase(): Promise<void> {
    if (mongoose.connection.readyState === 1) {
        return;
    }    

    const config = getDatabaseConfig();
    const options = {
        serverSelectionTimeoutMS: config.serverSelectionTimeoutMS
    } as Parameters<typeof mongoose.connect>[1];

    await mongoose.connect(config.uri, options);
}

export async function disconnectDatabase(): Promise<void> {
    if (mongoose.connection.readyState === 0) {
        return;
    }

    await mongoose.disconnect();
}