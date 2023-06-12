import {
  connectionStringAtom,
  editorSchemaAtom,
  hasConfiguredDatabaseAtom,
} from '@/utils/atoms';
import { connect } from '@/utils/connect';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Object } from './object';

export const Sidebar = () => {
  const [connectionString] = useAtom(connectionStringAtom);
  const [hasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);
  const [editorSchema, setEditorSchema] = useAtom(editorSchemaAtom);

  const { data, isLoading } = useQuery(
    ['schema'],
    async () => {
      if (connectionString) {
        return await connect({
          connectionString: connectionString,
        });
      } else {
        toast.error(`Connection string is required`);
      }
    },
    {
      enabled: hasConfiguredDatabase,
      onSuccess: () => {
        setEditorSchema(data?.editorSchema);
      },
      onError: (error) => {
        toast.error(`Error saving configuration: ${error}`);
      },
    }
  );

  return (
    <div className='flex flex-1 flex-col space-y-2 overflow-y-auto px-3 py-5'>
      {hasConfiguredDatabase && isLoading ? (
        <div className='space-y-5'>
          <div className='w-fill max-w-28 my-1.5 h-4 animate-pulse rounded-md bg-element-active'></div>
          <div className='w-fill max-w-28 my-1.5 h-4 animate-pulse rounded-md bg-element-active'></div>
        </div>
      ) : (
        <>
          {data && (
            <>
              <Object name='Tables' data={data.tables} />
              <Object name='Views' data={data.views} />
            </>
          )}
        </>
      )}
    </div>
  );
};
