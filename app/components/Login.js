'use client';

/**https://github.com/supabase/auth-helpers/blob/main/examples/nextjs-server-components/components/login.tsx */

import { useSupabase } from './supabase-provider';
import { useEffect, useState } from 'react';

// Supabase auth needs to be triggered client-side
export default function Login() {
    let { supabase } = useSupabase();
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState();

    useEffect(() => {
        async function fetchData() {
            const { data: session } = await supabase.auth.getSession();
            if (session.session) {
                const { data: username } = await supabase.from('profiles').select('username').eq('id', session.session.user.id);
                setUsername(username[0].username);
            }
        }
        fetchData();
    }, []);

    const handleEmailLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD
        });

        if (error) {
            console.log({ error });
        }

        const { data: session } = await supabase.auth.getSession();
        if (session.session) {
            const { data: username } = await supabase.from('profiles').select('username').eq('id', session.session.user.id);
            setUsername(username[0].username);
        }

        setLoggedIn(true);
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log({ error });
        }

        setLoggedIn(false);
        setUsername('');
    };

    // this `session` is from the root loader - server-side
    // therefore, it can safely be used to conditionally render
    // SSR pages without issues with hydration
    return <>
        <h2 className='font-bold text-secondary'>{username}</h2>
        <div className='ml-7'>
            {!loggedIn ? <button className='btn btn-outline btn-primary' onClick={handleEmailLogin}>Login</button> : <></>}
            {loggedIn ? <button className='btn btn-outline' onClick={handleLogout}>Logout</button> : <></>}
        </div>
    </>
}