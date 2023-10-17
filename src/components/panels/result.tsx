import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui//table';

import { ReaderIcon } from '@radix-ui/react-icons';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useAtom } from 'jotai';
import { Button } from '~/components/ui/button';
import { queryResultAtom } from '~/lib/utils/atoms';

export const Result = () => {
  const [queryResult] = useAtom(queryResultAtom);

  const table = useReactTable({
    // @ts-ignore
    data: queryResult && queryResult.rows,
    // @ts-ignore
    columns:
      queryResult &&
      queryResult.columns.map((key) => {
        return {
          accessorKey: key,
          header: key,
          indexed: true,
        };
      }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {queryResult ? (
        <div className="mx-3 inline-block py-2 align-middle overflow-auto">
          <div className="flex flex-1 flex-col items-center justify-center space-y-3">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length > 0
                  ? table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
          {table.getRowModel().rows?.length > 0 && (
            <nav className="flex items-center justify-between py-3" aria-label="Pagination">
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing{' '}
                  <span className="font-medium">{table.getRowModel().rows[0].index + 1}</span> to{' '}
                  <span className="font-medium">
                    {table.getRowModel().rows[table.getRowModel().rows.length - 1].index + 1}{' '}
                  </span>{' '}
                  out of <span className="font-medium">{queryResult.rowCount}</span> results.
                </p>
              </div>
              <div className="flex flex-1 space-x-2 justify-between sm:justify-end">
                {table.getCanPreviousPage() && (
                  <Button variant="outline" size="sm" onClick={() => table.previousPage()}>
                    Previous
                  </Button>
                )}
                {table.getCanNextPage() && (
                  <Button variant="outline" size="sm" onClick={() => table.nextPage()}>
                    Next
                  </Button>
                )}
              </div>
            </nav>
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center space-y-3">
          <ReaderIcon className="h-8 w-8" />
          <p className="text-center">The results of your query will appear here</p>
        </div>
      )}
    </>
  );
};
