import 'server-only';
import Header from './components/Header';
import './globals.css';
import SupabaseProvider from './components/supabase-provider';
import SupabaseListener from './components/supabase-listener';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

export const metadata = {
  title: 'CUtalkies',
  description: 'Message board for CU students',
}

export default async function RootLayout({ children }) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  });

  const { data: session } = await supabase.auth.getSession();
  
  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session.access_token} />

          <div>
            <Header />

            <main className='min-h-screen px-7'>
              {children}
            </main>

          </div>

          <footer className='footer footer-center p-3'>
            <div>
              <p>Made with ❤<br />
                By <a href='https://github.com/Aryan-Atom' className='link'>Aryan</a>, <a href='https://github.com/laughingclouds' className='link'>Hemant</a>, and <a href='https://github.com/vkrant09' className='link'>Vikrant</a></p>
            </div>
          </footer>
        </SupabaseProvider>


      </body>
    </html>
  )
}
