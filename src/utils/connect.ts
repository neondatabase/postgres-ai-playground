import { Pool, neonConfig } from '@neondatabase/serverless';

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

    const client = new Pool({ connectionString });

    // neonConfig.wsProxy = 'ws-proxy.onrender.com/v1';
    // neonConfig.pipelineConnect = false;

    // get all tables and columns in the database
    const { rows } = await client.query(
      ` SELECT table_name, array_agg(column_name || ' ' || data_type) AS columns_and_types FROM information_schema.columns WHERE table_schema = 'public' GROUP BY table_name ORDER BY table_name;`
    );

    // transform into CSV
    const databaseSchema = rows
      .map((table) => {
        const columns = table.columns_and_types
          .map((column) => {
            const [name, type] = column.split(' ');
            return `${name} ${type}`;
          })
          .join(', ');

        return `${table.table_name} (${columns});`;
      })
      .join('\n');

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

    const editorSchema = {
      schema: tables.reduce((acc, table) => {
        acc[table.table_name] = table.columns.map(
          // @ts-ignore
          (column) => column.column_name
        );
        return acc;
      }, {}),
      tables: tables.map((table) => ({
        label: table.table_name,
      })),
    };

    return {
      editorSchema,
      databaseSchema,
      tables,
      views,
      databaseName,
      connectionString,
    };
  } catch (error) {
    console.log('error', error);
    // @ts-ignore
    throw new Error(error);
  }
};
