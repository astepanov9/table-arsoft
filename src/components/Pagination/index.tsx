import React from 'react';

import { PaginationProps } from './Pagination.types';

const Pagination: React.FC<PaginationProps> = ({
  nextPage,
  prevPage,
  page,
  setPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center space-x-4 mr-4">
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-gray-900">{page}</span> /
        <span className="font-semibold text-gray-900"> {totalPages}</span>
      </p>
      <div>
        <button
          onClick={prevPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 sm:py-1 sm:px-3 transition rounded-l border"
        >
          &larr;
        </button>
        {/* @ts-ignore */}
        {[...Array(totalPages).keys()].map((el) => (
          <button
            onClick={() => setPage(el + 1)}
            key={el}
            className={`page ${
              page === el + 1
                ? 'bg-blue-700 hover:bg-blue-700 text-white font-bold px-3 py-1 sm:py-1 sm:px-4 transition'
                : ''
            } bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 sm:py-1 sm:px-4 transition border`}
          >
            {el + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 sm:py-1 sm:px-3 transition rounded-r border"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
