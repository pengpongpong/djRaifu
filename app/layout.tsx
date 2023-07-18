import { Metadata } from "next"
import './globals.scss'


export const metadata: Metadata = {
  title: 'DJ Raifu webpage',
  description: 'DJ Raifu webpage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
