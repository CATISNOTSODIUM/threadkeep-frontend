import * as React from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import SideBar from '../components/common/side-bar.tsx';

export default function Profile() {
  return (
    <div className="">
      <NavBar />
      <div className="flex flex-row justify-normal min-h-screen items-start my-24">
        <SideBar spanPage={true} />
      </div>
    </div>
  );
}
