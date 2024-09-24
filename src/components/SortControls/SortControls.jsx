import PropTypes from 'prop-types';
import './SortControls.css'

const SortControls = ({ sortBy, sortOrder, onSortChange, onOrderChange }) => {
  return (
    <div className="sort-controls" >
      <label className='sort-label' >Sort by:</label>
      <select className='sort-select' onChange={onSortChange} value={sortBy}>
        <option value="title">Title</option>
        <option value="eventDate">Event Date</option>
        <option value="organizer">Organizer</option>
      </select>
      <select className='sort-select' onChange={onOrderChange} value={sortOrder}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

SortControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default SortControls;
