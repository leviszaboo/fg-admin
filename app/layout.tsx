"use client"

import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./utils/AuthContext";

import '@/app/globals.css'

export default function RootLayout({ children }: any) {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body>
            <AuthProvider>
              {children}
            </AuthProvider>
          </body>
        </html>
      </QueryClientProvider>
  )
}
