import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "gameOffering",
  title: "Game Offering",
  type: "document",
  fields: [
    // --- Required basic fields ---
    defineField({
      name: "name",
      title: "Game Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Game Logo",
      type: "image",
      options: { hotspot: true },
    }),

    // External Logo URL
    defineField({
      name: "externalLogoUrl",
      title: "External Logo URL",
      type: "url",
      description: "Used only if no Sanity image is uploaded",
    }),

    // ESRB Rating
    defineField({
      name: "esrbRating",
      title: "ESRB Rating",
      type: "string",
      options: { list: ["E", "E10+", "T", "M"], layout: "dropdown" },
    }),

    // Short Description
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
    }),

    // --- Season Availability ---
    defineField({
      name: "seasonAvailability",
      title: "Season Availability",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Fall", value: "fall" },
          { title: "Spring", value: "spring" },
          { title: "Summer", value: "summer" },
          { title: "Year Round", value: "yearRound" },
        ],
      },
    }),

    // --- Platforms ---
    defineField({
      name: "platforms",
      title: "Platforms",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: ["PC", "Xbox", "PlayStation", "Nintendo Switch", "Mobile", "Cross-Play"],
      },
    }),

    // --- Sponsored / Supported By ---
    defineField({
      name: "supportedBy",
      title: "Supported / Sponsored By",
      type: "reference",
      to: [{ type: "sponsor" }],
    }),

    // --- Genre ---
    defineField({
      name: "genre",
      title: "Game Genre",
      type: "string",
      options: {
        list: ["Sports", "Action", "Shooter", "Battle Royale", "Fighting", "MOBA", "Strategy", "Racing", "Simulation"],
      },
    }),

    // --- Match Formats ---
    defineField({
      name: "regularSeasonFormat",
      title: "Regular Season Match Format",
      type: "string",
      options: { list: ["Bo1", "Bo3", "Bo5", "Time-Based", "Points-Based"] },
    }),
    defineField({
      name: "postSeasonFormat",
      title: "Post-Season Match Format",
      type: "string",
      options: { list: ["Bo1", "Bo3", "Bo5", "Time-Based", "Points-Based"] },
    }),

    // --- Match Length ---
    defineField({
      name: "matchLength",
      title: "Typical Match Length (minutes)",
      type: "number",
      description: "Average duration per match in minutes",
    }),

    // --- Game Type ---
    defineField({
      name: "gameType",
      title: "Game Type",
      type: "object",
      fields: [
        defineField({ name: "isTeamBased", title: "Team Based?", type: "boolean" }),
        defineField({ name: "minPlayers", title: "Minimum Players", type: "number" }),
        defineField({ name: "maxPlayers", title: "Maximum Players", type: "number" }),
        defineField({ name: "recommendedPlayers", title: "Recommended Players", type: "number" }),
        defineField({ name: "substitutesAllowed", title: "Substitutes Allowed?", type: "boolean" }),
      ],
    }),

    // --- Pricing ---
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "object",
      fields: [
        defineField({ name: "costPerTeam", title: "Cost Per Team (USD)", type: "number" }),
        defineField({ name: "costPerIndividual", title: "Cost Per Individual (USD)", type: "number" }),
        defineField({ name: "notes", title: "Pricing Notes", type: "text" }),
      ],
    }),

    // --- Equipment Requirements ---
    defineField({
      name: "equipmentRequirements",
      title: "Equipment Requirements",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
