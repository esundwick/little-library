// Created by Hermes Agent
import {defineField, defineType} from 'sanity'

import {MdBook as icon} from 'react-icons/md'

export default defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release date',
      type: 'datetime',
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'externalId',
      title: 'External ID',
      type: 'number',
    }),
    defineField({
      name: 'popularity',
      title: 'Popularity',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'releaseDate',
      media: 'cover',
    },
    prepare(selection) {
      const year = selection.date && selection.date.split('-')[0]
      return {
        title: `${selection.title} ${year ? `(${year})` : ''}`,
        date: selection.date,
        subtitle: '',
        media: selection.media,
      }
    },
  },
})
