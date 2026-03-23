// src/components/blocks/HeroBlock.tsx
type HeroBlockProps = {
    title: string
    coverImage: any
}

export default function HeroBlock({ title, coverImage }: HeroBlockProps) {
    return (
        <section>
            <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${coverImage?.url}`}
                alt={coverImage?.alt ?? 'cover'}
            />
            <h1>{title}</h1>
        </section>
    )
}