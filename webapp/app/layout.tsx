import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GenAIMedTech",
  description: "An app to generate educational content on healthcare topics for healthcare professionals and patients based on scientific articles using LLMs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-navy-900`}>
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl opacity-50 font-bold text-navy-900">🩺  GenAIMedTech</h1>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-white border-t mt-8">
          <div className="max-w-4xl mx-auto p-4 text-center text-navy-700">
            © 2024 GenAIMedTech
          </div>
        </footer>
      </body>
    </html>
  )
} 