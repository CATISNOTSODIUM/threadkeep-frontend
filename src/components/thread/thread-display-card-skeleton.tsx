import * as React from 'react';
import NavBar from '../common/nav-bar.tsx';

export default function ThreadDisplayCardSkeleton() {
    return (
        <div>
            <NavBar/>
            <div className='flex flex-row min-h-screen  mx-12 lg:mx-12 my-24 gap-10'>
                Loading ...
            </div>
            <hr className='my-3'/>
        </div>
    )
}