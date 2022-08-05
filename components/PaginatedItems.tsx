import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { DEFAULT_CURRENT_PAGE, DEFAULT_MAX_PAGE_COUNT } from '../constants/PageConst';
import { CurrentPageContext } from '../context/CurrentPageProvider';

interface Props {
  itemsPerPage: number,
  userCount: number
}

export default function PaginatedItems({ itemsPerPage, userCount }: Props) {
  const router = useRouter()

  const { handleSetCurrentPage } = useContext(CurrentPageContext)
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;
    const maxPageCount = Math.ceil(userCount / itemsPerPage)
    setPageCount(maxPageCount > DEFAULT_MAX_PAGE_COUNT ? DEFAULT_MAX_PAGE_COUNT : maxPageCount);
  }, [router.isReady, itemsPerPage, userCount]);

  const handlePageClick = (event: { selected: number; }) => {
    handleSetCurrentPage?.(event.selected)
  };

  return (
    <ReactPaginate
      breakLabel="..."
      forcePage={router.query.page ? Number(router.query.page) - 1 : DEFAULT_CURRENT_PAGE}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      containerClassName="Pagination"
      activeClassName="Pagination__active"
      pageLinkClassName="Pagination__page-link"
      breakLinkClassName="Pagination__page-link"
      nextLinkClassName="Pagination__page-link next-link"
      previousLinkClassName="Pagination__page-link previous-link"
      pageClassName="Pagination__page-item"
      breakClassName="Pagination__page-item"
      nextClassName="Pagination__page-item"
      previousClassName="Pagination__page-item"
      previousLabel={<ChevronLeftIcon className="h-5 w-5 text-blue-500" />}
      nextLabel={<ChevronRightIcon className="h-5 w-5 text-blue-500" />}
    />
  );
}