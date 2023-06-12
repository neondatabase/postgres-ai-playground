import React from 'react';

export const Banner = () => {
  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-0 z-20 px-6 pb-6'>
      <div className='pointer-events-auto max-w-lg rounded-md bg-element p-6 shadow-lg ring-1 ring-gray-subtle'>
        <p className='text-sm leading-6'>
          This playground enables you to connect to a Neon Postgres database
          directly from your browser. You can learn more about{' '}
          <a
            href='https://neon.tech/blog/postgres-ai-playground'
            className='font-semibold text-green-base hover:underline'
          >
            how it works
          </a>
          .
          <br />
          <br />
          If you don&apos;t have a Neon database, you can{' '}
          <a
            href='https://console.neon.tech?utm_source=playground&utm_medium=banner'
            className='font-semibold text-green-base hover:underline'
          >
            {' '}
            create one for free
          </a>
          . Once you have a database, click connect in top right and enter the
          connection details.
        </p>
      </div>
    </div>
  );
};
