import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function Paginator({ pagination, handleClick }) {
    return (
        <div className="bg-white py-3 flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end md:justify-end">
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {pagination?.canMoveToPrevious() ? (
                            <button
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                onClick={handleClick}
                                aria-label="Previous"
                                data-page={`${pagination.prevPage()}`}
                                type="button"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        ) : (
                            <div className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-500">
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                        )}

                        {pagination.getPages().map((page) => {
                            if (page?.current) {
                                return (
                                    <button
                                        key={`page-${page?.page}`}
                                        aria-current="page"
                                        className="z-10 bg-indigo-50 border-indigo-700 rounded border-2 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        onClick={handleClick}
                                        data-page={`${page?.page}`}
                                        type="button"
                                    >
                                        {page?.page}
                                    </button>
                                );
                            } else {
                                return page?.url != null ? (
                                    <button
                                        key={`page-${page?.page}`}
                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        onClick={handleClick}
                                        data-page={`${page?.page}`}
                                        type="button"
                                    >
                                        {page?.page}
                                    </button>
                                ) : (
                                    <p className="bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium" key={`page-${page?.page}`}>
                                        ...
                                    </p>
                                );
                            }
                        })}

                        {pagination?.canMoveToNext() ? (
                            <button
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                onClick={handleClick}
                                data-page={`${pagination.nextPage()}`}
                                type="button"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        ) : (
                            <div className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-500">
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}
