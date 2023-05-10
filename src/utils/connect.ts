import { Pool } from '@neondatabase/serverless';

type ConnectOptions = {
  connectionString: string;
  schema?: string;
};

export const connect = async ({
  connectionString,
  schema = 'public',
}: ConnectOptions) => {
  try {
    const databaseName = connectionString.split('/')[3];

    const client = new Pool({
      connectionString,
    });

    //////// Tables
    const { rows: tables } = await client.query(
      `SELECT * FROM information_schema.tables WHERE table_schema = '${schema}' AND table_type = 'BASE TABLE'`
    );

    // show columns for each table
    for (const table of tables) {
      const { rows: columns } = await client.query(
        `SELECT * FROM information_schema.columns WHERE table_schema = '${schema}' AND table_name = '${table.table_name}'`
      );

      table.columns = columns;
    }

    // show indexes for each table
    for (const table of tables) {
      const { rows: indexes } = await client.query(
        `SELECT * FROM pg_indexes WHERE tablename = '${table.table_name}'`
      );

      table.indexes = indexes;
    }

    //////// Views
    const { rows: views } = await client.query(
      `SELECT * FROM information_schema.views WHERE table_schema = '${schema}'`
    );

    // show columns for each view
    for (const view of views) {
      const { rows: columns } = await client.query(
        `SELECT * FROM information_schema.columns WHERE table_schema = '${schema}' AND table_name = '${view.table_name}'`
      );

      view.columns = columns;
    }

    // get all indexes for views
    for (const view of views) {
      const { rows: indexes } = await client.query(
        `SELECT * FROM pg_indexes WHERE tablename = '${view.table_name}'`
      );

      view.indexes = indexes;
    }

    client.end();

    return {
      tables,
      views,
      databaseName,
      connectionString,
    };
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};
