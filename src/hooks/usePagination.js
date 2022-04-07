import { useState } from 'react';
import endpoints from '@services/api';

export const usePagination = (limit = 5, total = 0, pagesOnEachSide = 3) => {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = limit;
    const onEachSide = pagesOnEachSide;
    const totalItems = total;
    let totalPages = 0;

    let tempTotalPages = totalItems / perPage;
    // If there is a decimal, means that there are more items but less than the limit
    if (Math.round(tempTotalPages) < tempTotalPages) {
        totalPages = Math.round(tempTotalPages) + 1;
    } else {
        totalPages = Math.round(tempTotalPages);
    }

    function canMoveToNext() {
        let canMoveToNextPage = false;
        if (currentPage < totalPages) {
            canMoveToNextPage = true;
        }
        return canMoveToNextPage;
    }

    function canMoveToPrevious() {
        let canMoveToPreviousPage = false;
        if (currentPage > 1) {
            canMoveToPreviousPage = true;
        }
        return canMoveToPreviousPage;
    }

    function prevPage() {
        let page = 1;
        if (currentPage > 1) {
            page = currentPage - 1;
        }
        return page;
    }

    function nextPage() {
        let page = 1;
        if (currentPage < totalPages) {
            page = currentPage + 1;
        }
        return page;
    }

    function getPages() {
        let lstPages = [];
        let showPagesOnLeftSide = true;
        let showPagesOnRightSide = true;
        let showEllipsis = false;

        if (currentPage === 1) {
            showPagesOnLeftSide = false;
        }

        if (currentPage === totalPages) {
            showPagesOnRightSide = false;
        }

        if (totalPages > onEachSide * 2) {
            showEllipsis = true;
        }

        if (showPagesOnLeftSide) {
            lstPages.push(...addPagesToLeftSide(showEllipsis, currentPage, onEachSide));
        }

        let offset = perPage * currentPage;
        lstPages.push({
            page: currentPage,
            current: true,
            url: endpoints.products.paginate(perPage, offset),
        });

        if (showPagesOnRightSide) {
            lstPages.push(...addPagesToRightSide(showEllipsis, currentPage, totalPages, onEachSide));
        }

        return lstPages;
    }

    function addPagesToLeftSide(showEllipsis, currentPage, onEachSide) {
        let leftPages = [];
        if (currentPage - onEachSide > 2 && showEllipsis) {
            leftPages.push({
                page: 1,
                current: false,
                url: endpoints.products.paginate(perPage, 1),
            });
            leftPages.push({
                page: 'left-ellipsis',
                current: false,
                url: null,
            });
        }

        let count = currentPage - onEachSide > 2 ? onEachSide : currentPage - 1; // Total pages to show on left side
        let start = currentPage - count; // Start page to show on left side

        if (showEllipsis === false) {
            count = currentPage - 1;
        }

        let offset = 0;
        while (count > 0) {
            offset = perPage * start;
            leftPages.push({
                page: start,
                current: false,
                url: endpoints.products.paginate(perPage, offset),
            });
            start++;
            count--;
        }

        return leftPages;
    }

    function addPagesToRightSide(showEllipsis, currentPage, totalPages, onEachSide) {
        let rigthPages = [];
        let count = totalPages - (currentPage + onEachSide) >= 0 ? onEachSide : totalPages - currentPage; // Total pages to show on right side
        let start = currentPage + 1; // Start page to show on right side

        if (showEllipsis === false) {
            count = totalPages - currentPage;
        }

        let offset = 0;
        while (count > 0) {
            offset = perPage * start;
            rigthPages.push({
                page: start,
                current: false,
                url: endpoints.products.paginate(perPage, offset),
            });
            start++;
            count--;
        }

        if (totalPages - currentPage > onEachSide + 1 && showEllipsis) {
            rigthPages.push({
                page: 'right-ellipsis',
                current: false,
                url: null,
            });
        }

        const lastPage = rigthPages.find((page) => page.page === totalPages);
        if (!lastPage) {
            offset = perPage * totalPages;
            rigthPages.push({
                page: totalPages,
                current: false,
                url: endpoints.products.paginate(perPage, offset),
            });
        }

        return rigthPages;
    }

    return {
        prevPage,
        nextPage,
        canMoveToPrevious,
        canMoveToNext,
        currentPage,
        setCurrentPage,
        totalPages,
        getPages,
    };
};
