import { isAdmin } from '@/Access/isAdmin'
import type { CollectionConfig } from 'payload'
import {
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  OrderedListFeature,
  UnorderedListFeature,
  BlockquoteFeature,
  LinkFeature,
  HorizontalRuleFeature,
  AlignFeature,
  IndentFeature,
  lexicalEditor,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name:'author',
      type:'text',
      required:true      
    },
    {
      name:'description',
      type:'textarea',
      required:true
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features:()=>[
        FixedToolbarFeature(),
        HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
      }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),    
      OrderedListFeature(),       
      UnorderedListFeature(),     
      BlockquoteFeature(),        
      LinkFeature(),              
      HorizontalRuleFeature(),    
      AlignFeature(),             
      IndentFeature(),
        ]
      }),
      required: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'updatedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}
export default Blogs
