import { Pool } from '@neondatabase/serverless';

type ConnectOptions = {
  connectionString: string;
  schema?: string;
};

const getTableColumnsQuery = `
  SELECT
    table_name,
    array_agg(column_name || ' ' || data_type) AS columns_and_types
  FROM
    information_schema.columns
  WHERE
    table_schema = $1
  GROUP BY
    table_name
  ORDER BY
    table_name;
`;

const getViewColumnsQuery = `
  SELECT
    table_name,
    array_agg(column_name || ' ' || data_type) AS columns_and_types
  FROM
    information_schema.columns
  WHERE
    table_schema = $1 AND
    table_name IN (
      SELECT
        table_name
      FROM
        information_schema.views
      WHERE
        table_schema = $1
    )
  GROUP BY
    table_name
  ORDER BY
    table_name;
`;

const getFunctionsQuery = `
  SELECT
    proname,
    prosrc
  FROM
    pg_proc
  WHERE
    pronamespace = (
      SELECT
        oid
      FROM
        pg_namespace
      WHERE
        nspname = $1
    );
`;

const getTriggersQuery = `
  SELECT
    tgname,
    tgtype,
    tgrelid,
    proname,
    prosrc
  FROM
    pg_trigger
    JOIN pg_proc ON pg_trigger.tgfoid = pg_proc.oid
  WHERE
    pg_trigger.tgconstraint = 0 AND
    pg_trigger.tgrelid IN (
      SELECT
        oid
      FROM
        pg_class
      WHERE
        relkind = 'r' AND
        relnamespace = (
          SELECT
            oid
          FROM
            pg_namespace
          WHERE
            nspname = $1
        )
    );
`;

const getIndexesQuery = `
  SELECT
    string_agg(indexname, ',') AS indexes,
    tablename
  FROM
    pg_indexes
  WHERE
    schemaname = $1
  GROUP BY
    tablename;
`;

const mapTable = (table: any, indexes: any[], triggers: any[]) => {
  return {
    table_name: table.table_name,
    columns: table.columns_and_types.map((column: string) => {
      const [name, type] = column.split(' ');
      return { column_name: name, data_type: type };
    }),
    indexes: indexes
      .filter((index) => index.tablename === table.table_name)
      .map((index) => index.indexes),
    triggers: triggers
      .filter((trigger) => trigger.tgrelid === table.table_name)
      .map((trigger) => ({
        trigger_name: trigger.tgname,
        trigger_type: trigger.tgtype,
        function_name: trigger.proname,
      })),
  };
};

const mapView = (view: any, indexes: any[], triggers: any[]) => {
  return {
    table_name: view.table_name,
    columns: view.columns_and_types.map((column: string) => {
      const [name, type] = column.split(' ');
      return { column_name: name, data_type: type };
    }),
    indexes: indexes
      .filter((index) => index.tablename === view.table_name)
      .map((index) => index.indexes),
    triggers: triggers
      .filter((trigger) => trigger.tgrelid === view.table_name)
      .map((trigger) => ({
        trigger_name: trigger.tgname,
        trigger_type: trigger.tgtype,
        function_name: trigger.proname,
      })),
  };
};

const mapFunction = (func: any) => {
  return {
    function_name: func.proname,
  };
};

const generateDatabaseSchema = (tables: any[], views: any[], functions: any[]) => {
  let databaseSchema = `Table Name, Column, Data Type, Indexes, Triggers \n`;

  tables.forEach((table) => {
    // @ts-ignore
    table.columns.forEach((column) => {
      databaseSchema += `${table.table_name}, ${column.column_name}, ${
        column.data_type
      }, ${table.indexes.join(';')}, ${table.triggers
        .map(
          // @ts-ignore
          (trigger) =>
            `${trigger.trigger_name} (${trigger.trigger_type}) - ${trigger.function_name}`
        )
        .join(';')}\n`;
    });
  });

  views.forEach((view) => {
    // @ts-ignore
    view.columns.forEach((column) => {
      databaseSchema += `${view.table_name}, ${column.column_name}, ${
        column.data_type
      }, ${view.indexes.join(';')}, ${view.triggers
        .map(
          // @ts-ignore

          (trigger) =>
            `${trigger.trigger_name} (${trigger.trigger_type}) - ${trigger.function_name}`
        )
        .join(';')}\n`;
    });
  });

  functions.forEach((func) => {
    databaseSchema += `, ${func.function_name}, , , \n`;
  });

  return databaseSchema;
};

export const connect = async ({ connectionString, schema = 'public' }: ConnectOptions) => {
  try {
    const pool = new Pool({
      connectionString,
    });

    const [tablesResult, viewsResult, functionsResult, triggersResult, indexesResult] =
      await Promise.all([
        pool.query(getTableColumnsQuery, [schema]),
        pool.query(getViewColumnsQuery, [schema]),
        pool.query(getFunctionsQuery, [schema]),
        pool.query(getTriggersQuery, [schema]),
        pool.query(getIndexesQuery, [schema]),
      ]);

    const tables = tablesResult.rows.map((table) =>
      mapTable(table, indexesResult.rows, triggersResult.rows)
    );

    const views = viewsResult.rows.map((view) =>
      mapView(view, indexesResult.rows, triggersResult.rows)
    );

    const functions = functionsResult.rows.map(mapFunction);

    const databaseSchema = generateDatabaseSchema(tables, views, functions);

    const editorSchema = {
      schema: tables.reduce((acc, table) => {
        // @ts-ignore
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
      tables,
      views,
      functions,
      connectionString,
      databaseSchema,
      editorSchema,
    };
  } catch (error) {
    console.log('error', error);
    // @ts-ignore
    throw new Error(error);
  }
};
