import PropTypes from 'prop-types';
import { useMemo } from 'react';

import './SortControls.css'

const SortControls =  ({ sortBy, sortOrder, onSortChange, onOrderChange }) => {
  const sortOptions = useMemo(() => [
    { value: 'title', label: 'Title' },
    { value: 'eventDate', label: 'Event Date' },
    { value: 'organizer', label: 'Organizer' }
  ], []);
  return (
    <div className="sort-controls" >
      <label className='sort-label' >Sort by:</label>
      <select className='sort-select' onChange={onSortChange} value={sortBy}>
      {sortOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
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
