import PropTypes from 'prop-types';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import './Pagination.css' 

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  if (totalPages <= 1) {
    return null; 
  }

  return (
    <div className='pagination-section'>
      <button className='pagination-section-button'
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ margin: '0 5px' }}
      >
        <GoChevronLeft  />
      </button>
      {Array(totalPages)
        .fill('')
        .map((_, index) => (
        <button className='pagination-section-button'
          key={index}
          onClick={() => handlePageClick(index + 1)}
          disabled={index + 1 === currentPage} 
          style={{
            fontWeight: index + 1 === currentPage ? 'bold' : 'normal',
            margin: '0 5px',
          }}
        >
          {index + 1}
        </button>
      ))}
      <button className='pagination-section-button'
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ margin: '0 5px' }}
      >
        <GoChevronRight />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
