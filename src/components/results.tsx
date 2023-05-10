import React from 'react';
import { Icon } from './shared/icon';

export const Results = ({ queryResult }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-3">
      <Icon name="Inbox" className="h-8 w-8" />
      <p className="text-center">The results of your query will appear here.</p>
    </div>
  );
};
