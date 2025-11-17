export default {
  name: 'sponsor',
  title: 'Sponsors',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Sponsor Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'tier',
      title: 'Sponsorship Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Platinum', value: 'platinum' },
          { title: 'Gold', value: 'gold' },
          { title: 'Silver', value: 'silver' },
          { title: 'Bronze', value: 'bronze' },
          { title: 'Supporter', value: 'supporter' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Display this sponsor on the website',
      initialValue: true,
    },
    {
      name: 'displayOnStream',
      title: 'Display on Stream Overlay',
      type: 'boolean',
      description: 'Include in streaming overlay rotation',
      initialValue: true,
    },
    {
      name: 'streamDuration',
      title: 'Stream Display Duration (seconds)',
      type: 'number',
      description: 'How long to display logo in stream overlay',
      initialValue: 5,
      validation: Rule => Rule.min(2).max(30),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tier',
      media: 'logo',
    },
  },
};