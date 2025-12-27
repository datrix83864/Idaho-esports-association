import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_PROJECT_ID,
  dataset: import.meta.env.VITE_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  perspective: 'published',
});


const builder = createImageUrlBuilder(sanityClient);
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
getRules: async () => {
  return client.fetch(`
    *[_type == "rule"] | order(game->name asc, order asc) {
      _id,
      category,
      content,
      order,
      lastUpdated,
      "gameName": game->name,
      "gameSlug": game->slug.current
    }
  `);
},

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
  getGames: () =>
    sanityClient.fetch(`*[_type == "gameOffering"] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    "logo": logo.asset->url,
    externalLogoUrl,
    "esrb": esrbRating,
    genre,
    description,
    "isTeamBased": gameType.isTeamBased,
    "minPlayersPerTeam": gameType.minPlayers,
    "maxPlayersPerTeam": gameType.maxPlayers,
    "recommendedPlayersPerTeam": gameType.recommendedPlayers,
    "substitutesAllowed": gameType.substitutesAllowed,
    pricing,
    seasonAvailability,
    "matchFormat": {
      "regularSeason": regularSeasonFormat,
      "postSeason": postSeasonFormat
    },
    "typicalMatchLengthMinutes": matchLength,
    platforms,
    equipmentRequirements,
    "supportedBy": supportedBy-> { _id, name, "logo": logo.asset->url, website },
    rulesAnchor,
    _createdAt,
    _updatedAt
  }`),
  getScheduledGames: async () => {
    const query = `*[_type == "gameOffering" && count(schedules[isActive == true]) > 0] | order(name asc) {
      _id,
      name,
      slug,
      logo,
      externalLogoUrl,
      genre,
      esrbRating,
      description,
      schedules[] {
        division,
        isActive,
        timingMode,
        mountainTime,
        pacificTime,
        daysOfWeek,
        notes
      }
    }`;
    
    return await sanityClient.fetch(query);
  },

  /**
   * Get games scheduled for a specific day (across all divisions)
   * @param {string} day - Day of week (lowercase: monday, tuesday, etc.)
   */
  getGamesByDay: async (day) => {
    const query = `*[_type == "gameOffering" && count(schedules[isActive == true && $day in daysOfWeek]) > 0] | order(name asc) {
      _id,
      name,
      slug,
      logo,
      externalLogoUrl,
      genre,
      schedules[isActive == true && $day in daysOfWeek] {
        division,
        isActive,
        timingMode,
        mountainTime,
        pacificTime,
        daysOfWeek,
        notes
      }
    }`;
    
    return await sanityClient.fetch(query, { day });
  },

  /**
   * Get games for a specific division
   * @param {string} division - Division name (e.g., "High School", "Middle School")
   */
  getGamesByDivision: async (division) => {
    const query = `*[_type == "gameOffering" && count(schedules[isActive == true && division == $division]) > 0] | order(name asc) {
      _id,
      name,
      slug,
      logo,
      externalLogoUrl,
      genre,
      schedules[isActive == true && division == $division] {
        division,
        isActive,
        timingMode,
        mountainTime,
        pacificTime,
        daysOfWeek,
        notes
      }
    }`;
    
    return await sanityClient.fetch(query, { division });
  },

  getGameSchedule: async (slug) => {
    const query = `*[_type == "gameOffering" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      logo,
      externalLogoUrl,
      genre,
      description,
      schedules[] {
        division,
        isActive,
        timingMode,
        mountainTime,
        pacificTime,
        daysOfWeek,
        notes
      }
    }`;
    
    return await sanityClient.fetch(query, { slug });
  },

  /**
   * Get all active divisions
   * Returns unique list of division names that have active schedules
   */
  getActiveDivisions: async () => {
    const query = `array::unique(*[_type == "gameOffering"].schedules[isActive == true].division)`;
    return await sanityClient.fetch(query);
  },


};
