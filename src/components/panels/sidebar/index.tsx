import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useToast } from '~/components/ui/toast/use-toast';
import {
  connectionStringAtom,
  editorSchemaAtom,
  hasConfiguredDatabaseAtom,
} from '~/lib/utils/atoms';
import { connect } from '~/lib/utils/connect';
import { Functions } from './functions';
import { Tables } from './tables';

export const Sidebar = () => {
  const [connectionString] = useAtom(connectionStringAtom);

  const [editorSchema, setEditorSchema] = useAtom(editorSchemaAtom);
  const [hasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);

  const { toast } = useToast();
  const { data, isLoading } = useQuery(
    ['schema'],
    async () => {
      if (connectionString) {
        return await connect({
          connectionString: connectionString,
        });
      }
      toast({
        title: 'Connection string is required',
      });
    },
    {
      enabled: hasConfiguredDatabase,
      onSuccess: () => {
        setEditorSchema(data?.editorSchema);
      },
      onError: (error) => {
        toast({
          title: `Error saving configuration: ${error}`,
        });
      },
    }
  );

  return (
    <div className="flex flex-1 flex-col space-y-2 overflow-y-auto px-3 py-5">
      {hasConfiguredDatabase && isLoading ? (
        <div className="space-y-5">
          <div className="bg-element-active animate-pulse w-fill max-w-28 h-4 my-1.5 rounded-md"></div>
          <div className="bg-element-active animate-pulse w-fill max-w-28 h-4 my-1.5 rounded-md"></div>
        </div>
      ) : (
        <>
          {data && (
            <>
              <Tables name="tables" tables={data.tables} />
              <Tables name="views" tables={data.views} />
              <Functions data={data.functions} />
            </>
          )}
        </>
      )}
    </div>
  );
};
