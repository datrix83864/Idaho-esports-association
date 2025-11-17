import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: import.meta.env.VITE_PROJECT_ID,
    dataset: import.meta.env.VITE_DATASET || 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
    perspective: 'published',
});


const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);

// Query functions
export const queries = {
    // Get all active sponsors
    getActiveSponsors: () =>
        sanityClient.fetch(`*[_type == "sponsor" && active == true] | order(tier) {
      _id, name, tier, logo, website, description, displayOnStream, streamDuration
    }`),

    // Get sponsors for stream overlay
    getStreamSponsors: (tier) => {
        const tierFilter = tier ? `&& tier == "${tier}"` : '';
        return sanityClient.fetch(`*[_type == "sponsor" && active == true && displayOnStream == true ${tierFilter}] {
      _id, name, logo, streamDuration
    }`);
    },

    // Get all rules
    getRules: () =>
        sanityClient.fetch(`*[_type == "rule"] | order(order asc) {
      _id, category, content, lastUpdated
    }`),

    // Get Expecting series articles
    getExpectingArticles: () =>
        sanityClient.fetch(`*[_type == "expectingArticle"] | order(order asc) {
      _id, title, slug, category, excerpt, publishedAt
    }`),

    // Get single article by slug
    getExpectingArticle: (slug) =>
        sanityClient.fetch(`*[_type == "expectingArticle" && slug.current == $slug][0] {
      _id, title, category, content, author, publishedAt
    }`, { slug }),

    // Get site settings
    getSiteSettings: () =>
        sanityClient.fetch(`*[_type == "siteSettings"][0] {
      tournamentPlatformUrl, merchStoreUrl, discordInvite, donationUrl, mailingListDescription
    }`),
};
