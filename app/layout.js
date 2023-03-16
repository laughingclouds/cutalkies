import './globals.css'

export const metadata = {
  title: 'CUtalkies',
  description: 'Homepage Title',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
