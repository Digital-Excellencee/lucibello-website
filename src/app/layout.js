import './globals.css'

export const metadata = {
  title: "Lucibello's — Premium Chocolate Confections",
  description:
    "Artisanal chocolates crafted with the finest nuts & seeds. No artificial sweeteners. Gluten free. No preservatives.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
