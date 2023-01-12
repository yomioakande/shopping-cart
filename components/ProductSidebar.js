import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Rating } from '@mui/material';

const ProductSidebar = ({ filter, brands }) => {
  const [priceRange, setPriceRange] = useState([5, 100]);
  const [minRange, setMinRange] = useState(5);
  const [maxRange, setMaxRange] = useState(100);
  const [rating, setRating] = useState(0);
  const [brand, setBrand] = useState('');
  const [showFilter, setShowFilter] = useState(filter);

  useEffect(() => {
    setShowFilter(filter);
  }, [filter]);

  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const updateRange = (event, newValue) => {
    setMinRange(newValue[0]);
    setMaxRange(newValue[1]);
    setPriceRange(newValue);
  };
  return (
    <aside className={showFilter ? 'show' : ''}>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="filter-icon">
            <FilterAltIcon /> Filters
          </div>
          <div className="close-icon" onClick={toggleShowFilter}>
            <CloseIcon />
            close
          </div>
        </div>
        <div className="card">
          <label htmlFor="amount">
            Price Range ($):{' '}
            <span>
              {minRange} - {maxRange}
            </span>
          </label>
          <Slider
            value={priceRange}
            onChange={updateRange}
            step={5}
            valueLabelDisplay="auto"
            min={5}
            max={100}
          />
        </div>
        <div className="card">
          <label htmlFor="brand">Brands</label>
          <div className="card-body">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={brand}
              onChange={(e, val) => setBrand(val)}
              name="radio-buttons-group"
            >
              {brands.map((brand) => (
                <FormControlLabel
                  value={brand}
                  control={<Radio />}
                  label={brand}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="card rating">
          <label htmlFor="rating">Rating</label>
          <div className="card-body">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={rating}
              onChange={(e, val) => setRating(val)}
              name="radio-buttons-group"
            >
              <div className="rating-group">
                <FormControlLabel
                  value={5}
                  control={<Radio />}
                  label={<Rating defaultValue={5} size="small" readOnly />}
                />
              </div>
              <div className="rating-group">
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label={<Rating defaultValue={4} size="small" readOnly />}
                />
                <span>& above</span>
              </div>
              <div className="rating-group">
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label={<Rating defaultValue={3} size="small" readOnly />}
                />
                <span>& above</span>
              </div>
              <div className="rating-group">
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={<Rating defaultValue={2} size="small" readOnly />}
                />
                <span>& above</span>
              </div>
              <div className="rating-group">
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={<Rating defaultValue={1} size="small" readOnly />}
                />
                <span>& above</span>
              </div>
              <div className="rating-group">
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label={<Rating defaultValue={0} size="small" readOnly />}
                />
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;
