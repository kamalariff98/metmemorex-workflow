import * as schema from '@/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from './env';

declare global {
  var postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

let client: ReturnType<typeof postgres> | undefined;

if (process.env.NODE_ENV !== 'production') {
  if (!global.postgresSqlClient) {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    global.postgresSqlClient = postgres(env.POSTGRES_URL, { 
      prepare: false,
      max: 10, // Maximum number of connections
      idle_timeout: 20, // Close connections after 20 seconds of inactivity
      connect_timeout: 10, // Connection timeout
      onnotice: (notice) => console.log('Database notice:', notice),
      onparameter: (param) => console.log('Database parameter:', param),
    });
  }
  client = global.postgresSqlClient;
} else {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  client = postgres(env.POSTGRES_URL, { 
    prepare: false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

export const database = drizzle({ client, schema });
