import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8">
      <ul className="flex justify-center space-x-1">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 py-1 rounded-md text-indigo-600 hover:bg-indigo-50"
            >
              &laquo; Prev
            </button>
          </li>
        )}
        
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        
        {currentPage < pageNumbers.length && (
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-3 py-1 rounded-md text-indigo-600 hover:bg-indigo-50"
            >
              Next &raquo;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;