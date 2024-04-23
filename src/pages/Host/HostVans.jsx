import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';

export async function loader() {
  await requireAuth();
  return getHostVans();
}

export default function HostVans() {
  const vans = useLoaderData();

  const hostVanElements = vans.map((van) => (
    <Link
      to={van.id}
      key={van.id}
      aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
      className='host-van-link-wrapper'
    >
      <div className='host-van-single' key={van.id}>
        <img src={van.imageUrl} alt={`Photo of a ${van.name} van`} />
        <div className='host-van-info'>
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <div className='host-vans-list'>
        <section>{hostVanElements}</section>
      </div>
    </section>
  );
}
