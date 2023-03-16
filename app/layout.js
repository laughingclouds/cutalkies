import './globals.css'

export const metadata = {
  title: 'CUtalkies',
  description: 'Homepage Title',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen'>
        <header>
          <nav className='navbar bg-base-100'>
            <a className='btn btn-ghost normal-case text-2xl'><span className='text-primary'>CU</span>talkies</a>
          </nav>
        </header>

        <main className='px-7'>
          {children}
        </main>

        <footer className='footer footer-center fixed bottom-0 p-5'>
          <div>
            <p>Made with ❤<br />
              By <a href='https://github.com/Aryan-Atom' className='link'>Aryan</a>, <a href='https://github.com/laughingclouds' className='link'>Hemant</a>, and <a href='https://github.com/vkrant09' className='link'>Vikrant</a></p>
          </div>
        </footer>
      </body>
    </html>
  )
}
