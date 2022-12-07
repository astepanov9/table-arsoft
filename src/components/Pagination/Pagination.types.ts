export interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}
