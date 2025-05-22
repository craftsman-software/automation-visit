import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '来客管理システム',
  description: '社内来客の受付・管理システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-900">来客管理システム</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <footer className="bg-white shadow-sm mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                © 2025 来客管理システム All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
