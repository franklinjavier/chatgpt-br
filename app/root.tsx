import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import { Header } from './components/header'
import styles from './tailwind.css'

import type { LinksFunction, MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ChatGPT-BR',
  description: 'Um blog brasileiro gerado com perguntas e respostas feitas ao OpenAI Chat',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'icon',
      href: '/logo.png',
      type: 'image/png',
    },
  ]
}

export function headers() {
  return {
    'Cache-Control': `public, max-age=60, stale-while-revalidate=59`,
  }
}

type DocumentProps = {
  children: React.ReactNode
}

const Document = ({ children }: DocumentProps) => {
  return (
    <html lang="pt-br">
      <head>
        <Meta />
        <Links />
      </head>
      <body className=" bg-white px-4 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Header />
      <main className="prose m-auto py-10">
        <Outlet />
      </main>
    </Document>
  )
}
