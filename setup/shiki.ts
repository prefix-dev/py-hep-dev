import { defineShikiSetup } from '@slidev/types'

/**
 * High-contrast light syntax theme for live presentations.
 *
 * The default Slidev light theme (vitesse-light) uses low-saturation pastel
 * tokens that wash out on a projector. This theme keeps the Tufte cream page
 * (transparent background) but swaps in dark, saturated tokens so code stays
 * legible from the back of a lecture hall. Tuned for TOML, which is nearly the
 * whole deck.
 *
 * Palette (all dark enough for strong contrast on #fffff8 cream):
 *   near-black  #1a1a17  base text / punctuation / operators
 *   red-brown   #a3341a  TOML keys + table headers (Tufte accent, darkened)
 *   deep green  #1f6b3b  strings
 *   deep purple #6a30b0  numbers / booleans / constants
 *   muted olive #7c7452  comments (dimmer but still readable), italic
 *   deep blue   #14508a  keywords / language constants
 */
const projectorLight = {
  name: 'tufte-projector-light',
  type: 'light',
  colors: {
    'editor.background': '#00000000',
    'editor.foreground': '#1a1a17',
  },
  settings: [
    { settings: { background: '#00000000', foreground: '#0015ff' } },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#7c7452', fontStyle: 'italic' },
    },
    {
      // TOML keys and table headers — the structural anchors, given the accent
      scope: [
        'support.type.property-name.toml',
        'support.type.property-name.table.toml',
        'entity.name.tag',
        'variable.other.key.toml',
        'keyword.key.toml',
      ],
      settings: { foreground: '#ff2f00' },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.quoted.single',
        'string.quoted.double',
        'string.template',
        'meta.string',
      ],
      settings: { foreground: '#00501d' },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language.boolean',
        'constant.language',
        'constant.other',
        'support.constant',
      ],
      settings: { foreground: '#6a30b0' },
    },
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator',
        'storage.type',
        'storage.modifier',
      ],
      settings: { foreground: '#14508a' },
    },
    {
      scope: [
        'punctuation',
        'punctuation.separator',
        'punctuation.definition',
        'meta.brace',
        'meta.tag',
      ],
      settings: { foreground: '#3a3a33' },
    },
    {
      // YAML keys (one slide uses yaml)
      scope: ['entity.name.tag.yaml', 'entity.name.tag.yaml.1.2'],
      settings: { foreground: '#a3341a' },
    },
  ],
}

export default defineShikiSetup(() => {
  return {
    themes: {
      light: projectorLight,
      dark: 'vitesse-dark',
    },
  }
})
