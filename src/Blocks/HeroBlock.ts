// src/blocks/HeroBlock.ts
import type { Block } from 'payload'

export const HeroBlock: Block = {
    slug: 'hero',                   // ← unique name, used to identify this block
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',    // ← uses your media collection
            required: true,
        },
    ]
}