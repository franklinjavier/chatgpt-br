import { Link } from '@remix-run/react'

export function Header() {
  return (
    <header className="m-auto mt-6 max-w-[665px] text-2xl">
      <Link className="flex items-center gap-4 decoration-transparent hover:text-indigo-600" to=".">
        ChatGPT-BR
      </Link>
    </header>
  )
}
