"use client";

import Login from './Login';

export default async function Header() {
    return (
        <header className='flex flex-row'>
            <nav className='navbar bg-base-100'>
                <a className='btn btn-ghost normal-case text-2xl'><span className='text-primary'>CU</span>talkies</a>
            </nav>

            <nav className='navbar bg-base-100 justify-end pr-6'>
                <Login />
            </nav>
        </header>
    );
}