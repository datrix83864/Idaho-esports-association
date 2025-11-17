export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'tournamentPlatformUrl',
      title: 'Tournament Platform URL',
      type: 'url',
      description: 'Link to your tournament hosting platform',
    },
    {
      name: 'merchStoreUrl',
      title: 'Merch Store URL',
      type: 'url',
      description: 'Link to your merchandise provider',
    },
    {
      name: 'discordInvite',
      title: 'Discord Invite Link',
      type: 'url',
      description: 'Permanent Discord invite link',
    },
    {
      name: 'donationUrl',
      title: 'Donation URL',
      type: 'url',
      description: 'Link to donation platform (PayPal, Stripe, etc.)',
    },
    {
      name: 'mailingListDescription',
      title: 'Mailing List Description',
      type: 'text',
      rows: 3,
      description: 'Description text shown on newsletter signup',
    },
    {
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Banner',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Banner Message',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link (optional)',
          type: 'url',
        },
        {
          name: 'variant',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
};