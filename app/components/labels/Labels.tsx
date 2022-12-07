import { Link } from '@remix-run/react'

import type { Post } from '~/utils/posts.server'

type LabelsProps = {
  labels: Post['labels']
}
export function Labels({ labels }: LabelsProps) {
  return (
    <>
      {!!labels && (
        <div className="flex gap-2">
          {labels.split(',').map((label) => (
            <Link
              className="text-zinc-700 transition-colors hover:opacity-80"
              key={label}
              to={`/categoria/${label}`}
            >
              #{label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
