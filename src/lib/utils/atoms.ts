import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Database
export const connectionStringAtom = atomWithStorage<string | undefined>(
  'connectionString',
  undefined
);

export const hasConfiguredDatabaseAtom = atomWithStorage<boolean>('hasConfiguredDatabase', false);

export const schemaAtom = atomWithStorage<string>('schema', '');

export const queryAtom = atomWithStorage<string>('query', '');

export const queryResultAtom = atom<
  | {
      rows: any[];
      rowCount: number;
      columns: string[];
      startTime: number;
    }
  | undefined
>(undefined);

// AI
export const showChatAtom = atom<boolean>(false);

export const editorSchemaAtom = atom<
  | {
      schema: any;
      tables: {
        label: any;
      }[];
    }
  | undefined
>({
  schema: {},
  tables: [],
});

export const responseAtom = atomWithStorage<string | undefined>('response', undefined);
