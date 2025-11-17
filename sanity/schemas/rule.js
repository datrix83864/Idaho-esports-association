export default {
  name: 'rule',
  title: 'Rules',
  type: 'document',
  fields: [
    {
      name: 'game',
      title: 'Game',
      type: 'string',
      description: 'Which game these rules apply to (leave empty for general rules)',
      options: {
        list: [
          { title: 'League of Legends', value: 'League of Legends' },
          { title: 'Valorant', value: 'Valorant' },
          { title: 'Rocket League', value: 'Rocket League' },
          { title: 'Overwatch 2', value: 'Overwatch 2' },
          { title: 'Super Smash Bros. Ultimate', value: 'Super Smash Bros. Ultimate' },
          { title: 'Mario Kart 8', value: 'Mario Kart 8' },
          { title: 'Splatoon 3', value: 'Splatoon 3' },
          { title: 'Fortnite', value: 'Fortnite' },
          { title: 'Minecraft', value: 'Minecraft' },
          { title: 'Call of Duty', value: 'Call of Duty' },
          { title: 'Counter-Strike 2', value: 'Counter-Strike 2' },
          { title: 'Apex Legends', value: 'Apex Legends' },
        ],
      },
    },
    {
      name: 'category',
      title: 'Rule Category',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., General Rules, Match Procedures, Technical Requirements',
    },
    {
      name: 'content',
      title: 'Rule Content (Markdown)',
      type: 'text',
      rows: 20,
      validation: Rule => Rule.required(),
      description: 'Write rules in Markdown format',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which rules appear within the game (lower numbers first)',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: 'Game, Order',
      name: 'gameOrder',
      by: [
        { field: 'game', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'category',
      subtitle: 'game',
      date: 'lastUpdated',
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle || 'General'} - Updated: ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
};