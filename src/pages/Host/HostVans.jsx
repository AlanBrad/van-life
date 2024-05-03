import React, { Suspense } from 'react';
import { Link, useLoaderData, defer, Await } from 'react-router-dom';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  const dataPromise = useLoaderData();

  function renderHostVanElements(vans) {
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
      <>
        <div className='host-vans-list'>
          <section>{hostVanElements}</section>
        </div>
      </>
    );
  }

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <Suspense fallback={<h2>Loading Host Vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderHostVanElements}</Await>
      </Suspense>
    </section>
  );
}
