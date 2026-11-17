// Created by Hermes Agent
import {defineField, defineType} from 'sanity'
import {MdBookmark as icon} from 'react-icons/md'

export default defineType({
  name: 'borrow',
  title: 'Borrow',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Lent to Sarah"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'item',
      title: 'Item',
      type: 'reference',
      to: [{type: 'movie'}, {type: 'book'}, {type: 'game'}],
      description: 'What is being borrowed?',
    }),
    defineField({
      name: 'borrower',
      title: 'Borrower',
      type: 'reference',
      to: [{type: 'person'}],
      description: 'Who is borrowing it?',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Returned', value: 'returned'},
          {title: 'Overdue', value: 'overdue'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'beginAt',
      title: 'Started at',
      type: 'datetime',
      description: 'When was it taken?',
    }),
    defineField({
      name: 'endAt',
      title: 'Expected Return',
      type: 'datetime',
      description: 'When is it expected back?',
    }),
    defineField({
      name: 'infoUrl',
      title: 'More info at',
      type: 'url',
      description: 'Link to any special notes or rules for this loan',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'item.preview.media',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Status: ${selection.status}`,
        media: selection.media,
      }
    },
  },
})
