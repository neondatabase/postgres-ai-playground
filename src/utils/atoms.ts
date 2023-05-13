import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

// UI
export const selectedLayoutAtom = atomWithStorage<'horizontal' | 'vertical'>(
  'layout',
  'horizontal'
);

export const showResultPanelAtom = atomWithStorage<boolean>(
  'showResultPanel',
  true
);

// Editor

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

// Database
export const connectionStringAtom = atomWithStorage<string | undefined>(
  'connectionString',
  undefined
);

export const queryAtom = atomWithStorage<string>('query', '');
export const queryResultAtom = atom<
  | {
      rows: any[];
      rowCount: number;
      columns: string[];
      startTime: Date;
    }
  | undefined
>(undefined);

export const hasConfiguredDatabaseAtom = atomWithStorage<boolean>(
  'hasConfiguredDatabase',
  false
);

export const schemaAtom = atom<string[] | undefined>(undefined);

// AI
export const showCommandPaletteAtom = atom<boolean>(false);

export const responseAtom = atomWithStorage<string | undefined>(
  'response',
  undefined
);
