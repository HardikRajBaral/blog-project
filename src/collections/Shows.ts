import type{CollectionConfig} from 'payload'
import {HeroBlock} from '@/Blocks/HeroBlock'
import { TextBlock } from '@/Blocks/TextBlock'

export const Shows:CollectionConfig={
    slug:'shows',
    fields:[
        {
            name:'showTitle',
            type:"text",
            required:true,
            
        },
        {
            name:'genre',
            type:'text',
            required:true
        },
        {
            name:'layout',
            type:'blocks',
            blocks:[HeroBlock,TextBlock]
        }

    ]  
}