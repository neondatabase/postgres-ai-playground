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

    startTime = Date.now();

    return {
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
