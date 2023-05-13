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

    client.end();

    // get query execution time

    startTime = Date.now();

    return {
      rows,
      rowCount,
      columns: fields.map((field) => field.name),
      startTime,
    };
  } catch (error) {
    console.log('error', error);
    // @ts-ignore
    throw new Error(error);
  }
};
