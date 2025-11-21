import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/index'
import { lastUpdatedAction } from "./actions/lastUpdated";

export default defineConfig({
  name: 'default',
  title: 'Idaho Esports Association',
  projectId: 'znfi8g21',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // document: {
  //   actions: (prev) => lastUpdatedAction(prev),
  // },
});
