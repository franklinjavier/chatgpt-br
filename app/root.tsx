import { json } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'

import { Header } from './components/header'
import styles from './tailwind.css'

import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = ({ data }) => {
  const description = data.description
  const title = data.title
  return {
    viewport: 'width=device-width,initial-scale=1',
    robot: 'index, follow',
    'og:description': description,
    'og:title': title,
    'og:site_name': title,
    'og:locale': 'pt_BR',
    'og:url': data.canonical,
    charset: 'utf-8',
    title,
    description,
  }
}

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

export function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  return json({
    canonical: `${url.origin}${url.pathname}`,
    title: 'ChatGPT-BR',
    description: 'Um blog brasileiro gerado com perguntas e respostas feitas ao OpenAI Chat',
  })
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
  const data = useLoaderData<typeof loader>()

  return (
    <html lang="pt-br">
      <head>
        <Meta />
        <Links />
        <link href={data.canonical} rel="canonical" />
      </head>
      <body className=" bg-white px-4 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="https://www.googletagmanager.com/gtag/js?id=G-8KH9L5MZKT" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
          function gtag(){window?.dataLayer?.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8KH9L5MZKT');
          `,
          }}
          id="gtag"
        />
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
