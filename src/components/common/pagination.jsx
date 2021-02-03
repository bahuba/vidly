import React from "react";
import PropTypes from "prop-types";

// Input:
//  itemCount
//  pageSize
//  currentPage
// Output:
//  onPageChanged( pageNumber )

const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChanged } = props;

  const totalPages = Math.ceil(itemCount / pageSize);

  if (totalPages <= 1) return null;

  const pages = [...Array.from({ length: totalPages }, (_, i) => i + 1)];

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <span onClick={() => onPageChanged(page)} className="page-link">
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
