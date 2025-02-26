import mongoose from 'mongoose';

interface Options {
    url: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect({ url, dbName }: Options) {
        try {
            await mongoose.connect(url, { dbName });

            return true;
        }
        catch (error) {
            throw error;
        }
    }
}