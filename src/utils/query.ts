import { Pool } from '@neondatabase/serverless';

type queryOptions = {
  connectionString: string;
  query: string;
};

export const runQuery = async ({ connectionString, query }: queryOptions) => {
  try {
    const client = new Pool({
      connectionString,
    });

    const { rows, rowCount, fields } = await client.query(query);

    client.end();

    return { rows, rowCount, columns: fields.map((field) => field.name) };
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};
