import React from 'react';
import ReactPaginate from 'react-paginate';

interface Pagination {
  onChangePage: (number: number) => void;
  pageCount: number;
}

const Pagination: React.FC<Pagination> = ({ onChangePage, pageCount }) => {
  return (
    <ReactPaginate
      className="flex space-x-4"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageCount={pageCount}
      previousLabel="<"
    />
  );
};

export default Pagination;
