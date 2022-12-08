import { Link } from '@remix-run/react'

export function Header() {
  return (
    <header className="m-auto mt-6 max-w-[665px] text-2xl">
      <Link
        className="flex items-center gap-4 decoration-transparent transition-all hover:text-indigo-600 hover:before:absolute hover:before:-ml-8 hover:before:text-red-500 hover:before:content-['💿']"
        to="."
      >
        ChatGPT-BR
      </Link>
    </header>
  )
}
