import React from 'react';
import { Icon } from './shared/icon';

export const Results = ({ queryResult }) => {
  return (
    <>
      {queryResult ? (
        <div className="rounded-md bg-app-subtle m-2 overflow-x-auto ">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="flex flex-1 flex-col items-center justify-center space-y-3">
              <table className="min-w-full divide-y divide-gray-subtle">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium"
                    >
                      #
                    </th>
                    {queryResult.rows.length > 0 &&
                      Object.keys(queryResult.rows[0]).map((key) => (
                        <th
                          key={key}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium "
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-subtle">
                  {queryResult.rows.map((row, i) => (
                    <tr key={row.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {i + 1}
                      </td>

                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="px-6 py-4 whitespace-nowrap text-sm "
                        >
                          {value as string}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center space-y-3">
          <Icon name="Inbox" className="h-8 w-8" />
          <p className="text-center">
            The results of your query will appear here.
          </p>
        </div>
      )}
    </>
  );
};
