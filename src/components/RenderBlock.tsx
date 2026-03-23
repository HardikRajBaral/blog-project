// src/components/RenderBlock.tsx
import HeroBlock from './Blocks/HeroBlock'
import TextBlock from './Blocks/TextBlock'

type HeroBlockType = {
    blockType: 'hero'
    title: string
    coverImage: any
}

type TextBlockType = {
    blockType: 'text'
    heading?: string
    description: string
}

type Block = HeroBlockType | TextBlockType

export default function RenderBlock({ block }: { block: Block }) {
    switch (block.blockType) {

        case 'hero': {
            const { title, coverImage } = block as HeroBlockType
            return (
                <HeroBlock
                    title={title}
                    coverImage={coverImage}
                />
            )
        }

        case 'text': {
            const { heading, description } = block as TextBlockType
            return (
                <TextBlock
                    heading={heading}
                    description={description}
                />
            )
        }

        default:
            return null
    }
}