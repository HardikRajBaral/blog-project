
import type { Block } from 'payload'


export const TextBlock: Block = {
    slug: 'text',                   // ← unique name
    fields: [
        {
            name: 'heading',
            type: 'text',
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
    ]
}