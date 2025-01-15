import * as React from "react";
export function Pagination({
  threadsPerPage,
  totalThreads,
  currentPageNumber,
  paginate,
}) {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalThreads / threadsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full flex mt-5 cotent-center justify-center ">
      <ul className="flex items-center -space-x-px h-8 text-sm list-none">
        {pageNumbers.map((pageNumber) => (
          <li>
            <button onClick={() => paginate(pageNumber)} key={pageNumber}>
              {pageNumber === currentPageNumber ? (
                <div className="flex items-center justify-center px-3 h-8 leading-tight text-yellow-800 bg-yellow-100 border border-yellow-300 hover:bg-yellow-200">
                  {pageNumber}
                </div>
              ) : (
                <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  {pageNumber}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
