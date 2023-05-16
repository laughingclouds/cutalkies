"use client";

import Link from 'next/link';
import Login from './Login';

export default async function Header() {
    return (
        <header className='flex flex-row'>
            <nav className='navbar bg-base-100'>
                <Link href="/" className='btn btn-ghost normal-case text-2xl'><span className='text-primary'>CU</span>talkies</Link>            </nav>

            <nav className='navbar bg-base-100 justify-end pr-6'>
                <Login />
            </nav>
        </header>
    );
}