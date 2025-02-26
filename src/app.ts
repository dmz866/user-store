import { envs } from './config/envs';
import { MongoDatabase } from './data/mongo';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

async function main() {
    await MongoDatabase.connect({ url: envs.MONGO_URL, dbName: envs.MONGO_DB_NAME });

    const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
    server.start();
}

/*
(async () => {
    main();
})();
 */

main();
