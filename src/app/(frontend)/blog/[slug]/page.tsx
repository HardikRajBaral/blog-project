// app/(frontend)/blog/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })

  // fetch current post
  const { docs } = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    depth: 1,
  })

  // fetch latest 5 posts for suggestions (exclude current post)
  const { docs: suggestions } = await payload.find({
    collection: 'blogs',
    limit: 5,
    sort: '-createdAt',
    depth: 1,
    where: {
      slug: { not_equals: slug },  // 👈 exclude current post
    },
  })

  const post = docs[0]
  if (!post) return notFound()

  return (
    <main className="max-w-8xl mx-auto px-6 md:px-12 lg:px-16 py-16">

      {/* Back Button */}
      <Link
        href="/blog"
        className="text-sm text-gray-500 hover:text-black mb-6 inline-block"
      >
        ← Back to Blogs
      </Link>

      {/* Layout: content left, suggestions right */}
      <div className="flex gap-12">

        {/* Left — Main Blog Content */}
        <div className="flex-1 min-w-0">

          {/* Thumbnail */}
          {post.thumbnail && typeof post.thumbnail === 'object' && (
            <Image
              src={post.thumbnail.url!}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-xl object-cover w-full mb-8"
            />
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

          {/* Author */}
          {post.author && (
            <h3 className="text-sm text-gray-500 mb-2">{post.author}</h3>
          )}

          {/* Description */}
          {post.description && (
            <p className="text-sm text-gray-500 mb-4">{post.description}</p>
          )}

          {/* Date */}
          <p className="text-sm text-gray-400 mb-8 border-b pb-4">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Body */}
          <article className="prose prose-lg max-w-none">
            <RichText data={post.body} />
          </article>

        </div>

        {/* Right — Suggestions */}
        <div className="w-72 shrink-0">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Latest Posts</h3>

          <div className="flex flex-col gap-4">
            {suggestions.map((suggestion) => (
              <Link
                key={suggestion.id}
                href={`/blog/${suggestion.slug}`}
                className="group flex gap-3 items-center hover:bg-gray-50 rounded-xl p-2 transition"
              >
                {/* Small Thumbnail */}
                {suggestion.thumbnail && typeof suggestion.thumbnail === 'object' ? (
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src={suggestion.thumbnail.url!}
                      alt={suggestion.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg" />
                )}

                {/* Title and Date */}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold group-hover:text-blue-600 transition line-clamp-2">
                    {suggestion.title}
                  </p>
                  {/* Author */}
                  {suggestion.author && (
                    <p className="text-xs text-gray-500">{suggestion.author}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {new Date(suggestion.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}