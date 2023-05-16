'use client'

/**https://supabase.com/docs/guides/auth/auth-helpers/nextjs-server-components#supabase-provider */

import { createContext, useContext, useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

const Context = createContext(undefined)

export default function SupabaseProvider({ children, session }) {

    const [supabase] = useState(() => createBrowserSupabaseClient())
    return (
        <Context.Provider value={{ supabase, session }}>
            <>{children}</>
        </Context.Provider>
    )
}

export const useSupabase = () => {
    const context = useContext(Context)

    if (context === undefined) {
        throw new Error('useSupabase must be used inside SupabaseProvider')
    }

    return context
}
