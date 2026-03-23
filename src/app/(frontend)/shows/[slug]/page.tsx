// src/app/(frontend)/shows/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import RenderBlock from '@/components/RenderBlock'
import type { Show } from '@/payload-types'     // ← import generated type

export default async function ShowPage({ params }: { params: { slug: string } }) {
    const payload = await getPayload({ config })

    const shows = await payload.find({
        collection: 'shows',
        where: {
            slug: { equals: params.slug }
        },
        depth: 1,
    })

    // tell TypeScript this is a Show type
    const show = shows.docs[0] as Show

    if (!show) {
        return <h1>Show not found</h1>
    }

    // tell TypeScript layout is an array
    const layout = show.layout as any[]

    return (
        <main>
            {layout.map((block: any, index: number) => (
                <RenderBlock key={index} block={block} />
            ))}
        </main>
    )
}
