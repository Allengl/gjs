import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import Provider from '@/components/Provider'
import { cn } from '@/lib/utils'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>

      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
