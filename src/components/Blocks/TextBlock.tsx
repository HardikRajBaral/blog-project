// src/components/blocks/TextBlock.tsx

type TextBlockProps = {
    heading?: string        // ← add ? to make it optional
    description: string
}
export default function TextBlock({ heading, description }:TextBlockProps) {
    return (
        <section>
            {heading && <h2>{heading}</h2>}
            <p>{description}</p>
        </section>
    )
}