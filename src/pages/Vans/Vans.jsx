import React from 'react';
import { Link } from 'react-router-dom';

export default function Vans() {
  const [vans, setVans] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const vanElements = vans.map((van) => (
    <div className='van-tile' key='van.id'>
      <Link
        to={`/vans/${van.id}`}
        aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
      >
        <img src={van.imageUrl} alt={`Image of a ${van.name} van`} />
        <div className='van-info'>
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div>
        <button className='van-button'>Simple</button>
        <button className='van-button'>Luxury</button>
        <button className='van-button'>Rugged</button>
        <button className='clear-filters'>Clear filters</button>
      </div>
      <div className='van-list'>{vanElements}</div>
    </div>
  );
}
