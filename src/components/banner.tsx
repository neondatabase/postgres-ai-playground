import React from 'react';

export const Banner = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6 z-20">
      <div className="pointer-events-auto max-w-lg rounded-md bg-element p-6 shadow-lg ring-1 ring-gray-subtle">
        <p className="text-sm leading-6">
          This playground enables you to connect to a Neon Postgres database
          directly from your browser. You can learn more about{' '}
          <a
            href="https://neon.tech/blog"
            className="text-green-base font-semibold hover:underline"
          >
            how it works
          </a>
          .
          <br />
          <br />
          If you don&apos;t have a Neon database, you can{' '}
          <a href="" className="text-green-base font-semibold hover:underline">
            {' '}
            create one for free
          </a>
          .
        </p>
      </div>
    </div>
  );
};
