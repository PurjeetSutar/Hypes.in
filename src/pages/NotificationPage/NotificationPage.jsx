import React from 'react'
import Navbar from '../../components/Navbar';
import NavbarSide from '../../components/NavbarSide'
import ExploreAside from '../../components/ExploreAside';
import FilterAside from '../../components/FilterAside';

const NotificationPage = () => {
  return (
    <>
        <Navbar/>
        <NavbarSide/>
        <aside className="w-1/5 bg-white rounded-lg shadow-md p-4">
        <ExploreAside/>
        <FilterAside/>
        </aside>
        <main className="w-3/5 mx-4">
          {/* Posts feed */}
          <div className="mt-6 space-y-6">
          </div>
          </main>
    </>
  )
}

export default NotificationPage