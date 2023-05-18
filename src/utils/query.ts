import { Pool } from '@neondatabase/serverless';

type queryOptions = {
  connectionString: string;
  query: string;
};

export const runQuery = async ({ connectionString, query }: queryOptions) => {
  try {
    let startTime = Date.now();

    const client = new Pool({
      connectionString,
    });

    const { rows, rowCount, fields } = await client.query(query);

    const { rows: schemaRows } = await client.query(
      ` SELECT table_name, array_agg(column_name || ' ' || data_type) AS columns_and_types FROM information_schema.columns WHERE table_schema = 'public' GROUP BY table_name ORDER BY table_name;`
    );

    // transform into CSV
    const databaseSchema = schemaRows
      .map((table) => {
        const columns = table.columns_and_types
          // @ts-ignore
          .map((column) => {
            const [name, type] = column.split(' ');
            return `${name} ${type}`;
          })
          .join(', ');

        return `${table.table_name} (${columns});`;
      })
      .join('\n');

    client.end();

    // get query execution time
    startTime = Date.now();

    return {
      databaseSchema,
      rows: rows ?? [],
      rowCount: rowCount ?? 0,
      columns: fields?.map((field) => field.name) ?? [],
      startTime,
    };
  } catch (error) {
    console.log('error', error);
    // @ts-ignore
    throw new Error(error);
  }
};
