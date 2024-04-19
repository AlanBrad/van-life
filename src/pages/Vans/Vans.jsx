import React from 'react';
import { Link, useSearchParams, useLoaderData } from 'react-router-dom';
import { getVans } from '../../api';

export function loader() {
  return getVans();
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [vans, setVans] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const typeFilter = searchParams.get('type');

  const vans = useLoaderData();

  // React.useEffect(() => {
  //   async function loadVans() {
  //     setLoading(true);
  //     try {
  //       const data = await getVans();
  //       setVans(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadVans();
  // }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <div className='van-tile' key='van.id'>
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
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

  // if (loading) {
  //   return <h1 aria-live='polite'>Loading...</h1>;
  // }

  if (error) {
    return <h1 aria-live='assertive'>There was an error: {error.message}</h1>;
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list-filter-buttons'>
        <button
          onClick={() => setSearchParams({ type: 'simple' })}
          className={`van-type simple ${
            typeFilter === 'simple' ? 'selected' : ''
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: 'luxury' })}
          className={`van-type luxury ${
            typeFilter === 'luxury' ? 'selected' : ''
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: 'rugged' })}
          className={`van-type rugged ${
            typeFilter === 'rugged' ? 'selected' : ''
          }`}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => setSearchParams({})}
            className='van-type clear-filters'
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className='van-list'>{vanElements}</div>
    </div>
  );
}
