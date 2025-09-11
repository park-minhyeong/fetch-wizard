import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

export default function Layout({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-between">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🧙‍♂️</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  API Wizard
                </h1>
              </Link>
              {/* <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  홈
                </Link>
                <Link to="/todos" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Todo 목록
                </Link>
                <Link to="/docs" className="text-gray-600 hover:text-blue-600 transition-colors">
                  문서
                </Link>
              </nav> */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="text-center text-gray-500 text-sm">
              <p>© 2025 api-wizard. Made by @park-minhyeong for developers.</p>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  )
}
