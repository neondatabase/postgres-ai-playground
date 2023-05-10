import { connectionStringAtom, hasConfiguredDatabaseAtom } from '@/utils/atoms';
import { connect } from '@/utils/connect';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Object } from './object';

export const Sidebar = () => {
  const [connectionString] = useAtom(connectionStringAtom);
  const [hasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);

  const { data, isLoading, error } = useQuery(
    ['data'],
    async () => {
      const res = await connect({
        connectionString: connectionString,
      });

      return res;
    },
    {
      enabled: hasConfiguredDatabase,
      onError: (error) => {
        toast.error(`Error saving configuration: ${error}`);
      },
    }
  );

  console.log(data);
  return (
    <div className="flex flex-1 flex-col space-y-2 overflow-y-auto px-3 py-5">
      {data && (
        <>
          <Object name="Tables" data={data.tables} />
          <Object name="Views" data={data.views} />
        </>
      )}
    </div>
  );
};
