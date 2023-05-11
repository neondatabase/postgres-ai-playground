const plugin = require('tailwindcss/plugin');
const Color = require('color');

function getRgbChannels(color) {
  return Color(color).rgb().array().join(' ');
}

const themes = [
  {
    name: 'light',
    colors: {
      // Core
      'bg-app': '#fbfefc',
      'bg-app-subtle': '#fbfefc',
      'bg-element': '#ffffff',
      'bg-element-hover': '#eceef0',
      'bg-element-active': '#e6e8eb',
      'ring-gray-subtle': '#dfe3e6',
      'ring-gray-primary': '#d7dbdf',
      'ring-gray-hover': '#c1c8cd',
      'bg-solid': '#30A46C',
      'bg-solid-hover': '#299764',
      'text-gray-base': '#687076',
      'text-gray-high-contrast': '#11181c',

      'ring-primary-subtle': '#b4dfc4',
      'ring-primary': '#92ceac',
      'ring-primary-hover': '#5bb98c',
      'text-green-base': '#18794e',
      'text-green-high-contrast': '#153226',

      // Warning
      'ring-warning-subtle': '#ffcca7',
      'ring-warning': '#ffb381',
      'ring-warning-hover': '#fa934e',
      'bg-warning-element': '#fff1e7',
      'bg-warning-element-hover': '#ffe8d7',
      'bg-warning-element-active': '#ffdcc3',
      'text-warning-base': '#bd4b00',
      'text-warning-high-contrast': '#451e11',

      // Danger
      'ring-danger-subtle': '#f9c6c6',
      'ring-danger': '#f3aeaf',
      'ring-danger-hover': '#eb9091',
      'text-danger-base': '#cd2b31',
      'text-danger-high-contrast': '#381316',
      'bg-danger-element': '#ffefef',
      'bg-danger-element-hover': '#ffe5e5',
      'bg-danger-element-active': '#fdd8d8',
      'bg-danger-solid': '#e5484d',
      'bg-danger-solid-hover': '#dc3d43',
    },
  },

  {
    name: 'dark',
    colors: {
      // Core
      'bg-app': '#151718',
      'bg-app-subtle': '#1a1d1e',
      'bg-element': '#202425',
      'bg-element-hover': '#26292b',
      'bg-element-active': '#2b2f31',
      'ring-gray-subtle': '#313538',
      'ring-gray-primary': '#3a3f42',
      'ring-gray-hover': '#4c5155',
      'bg-solid': '#30A46C',
      'bg-solid-hover': '#3CB179',
      'text-gray-base': '#9ba1a6',
      'text-gray-high-contrast': '#ecedee',

      'text-green-base': '#4cc38a',
      'text-green-high-contrast': '#e5fbeb',

      'ring-primary-subtle': '#164430',
      'ring-primary': '#1b543a',
      'ring-primary-hover': '#236e4a',

      // Warning
      'ring-warning-subtle': '#5f2a06',
      'ring-warning': '#763205',
      'ring-warning-hover': '#943e00',
      'bg-warning-element': '#391a03',
      'bg-warning-element-hover': '#441f04',
      'bg-warning-element-active': '#4f2305',
      'text-warning-base': '#ff8b3e',
      'text-warning-high-contrast': '#feeadd',

      // Danger
      'bg-danger-element': '#3c181a',
      'bg-danger-element-hover': '#481a1d',
      'bg-danger-element-active': '#541b1f',
      'bg-danger-solid': '#e5484d',
      'bg-danger-solid-hover': '#f2555a',

      'ring-danger-subtle': '#671e22',
      'ring-danger': '#822025',
      'ring-danger-hover': '#aa2429',
      'text-danger-base': '#ff6369',
      'text-danger-high-contrast': '#feecee',
    },
  },
];

module.exports = plugin(
  function ({ addBase, addVariant }) {
    // Root scope CSS variables
    const defaultColors = themes[0].colors;

    addBase({
      ':root': {
        '--color-text-gray-base': getRgbChannels(
          defaultColors['text-gray-base']
        ),
        '--color-text-green-base': getRgbChannels(
          defaultColors['text-green-base']
        ),
        '--color-bg-app': getRgbChannels(defaultColors['bg-app']),
        '--color-bg-app-subtle': getRgbChannels(defaultColors['bg-app-subtle']),
        '--color-bg-element': getRgbChannels(defaultColors['bg-element']),
        '--color-bg-element-hover': getRgbChannels(
          defaultColors['bg-element-hover']
        ),
        '--color-bg-element-active': getRgbChannels(
          defaultColors['bg-element-active']
        ),
        '--color-ring-primary-subtle': getRgbChannels(
          defaultColors['ring-primary-subtle']
        ),
        '--color-ring-primary': getRgbChannels(defaultColors['ring-primary']),
        '--color-ring-primary-hover': getRgbChannels(
          defaultColors['ring-primary-hover']
        ),
        '--color-bg-solid': getRgbChannels(defaultColors['bg-solid']),
        '--color-bg-solid-hover': getRgbChannels(
          defaultColors['bg-solid-hover']
        ),
        '--color-text-gray-high-contrast': getRgbChannels(
          defaultColors['text-gray-high-contrast']
        ),
        '--color-ring-warning-subtle': getRgbChannels(
          defaultColors['ring-warning-subtle']
        ),
        '--color-ring-warning': getRgbChannels(defaultColors['ring-warning']),
        '--color-bg-warning-element': getRgbChannels(
          defaultColors['bg-warning-element']
        ),
        '--color-bg-warning-element-hover': getRgbChannels(
          defaultColors['bg-warning-element-hover']
        ),
        '--color-bg-warning-element-active': getRgbChannels(
          defaultColors['bg-warning-element-active']
        ),
        '--color-text-warning-base': getRgbChannels(
          defaultColors['text-warning-base']
        ),
        '--color-text-warning-high-contrast': getRgbChannels(
          defaultColors['text-warning-high-contrast']
        ),
        '--color-bg-danger-element': getRgbChannels(
          defaultColors['bg-danger-element']
        ),
        '--color-bg-danger-element-hover': getRgbChannels(
          defaultColors['bg-danger-element-hover']
        ),
        '--color-bg-danger-element-active': getRgbChannels(
          defaultColors['bg-danger-element-active']
        ),
        '--color-ring-danger-subtle': getRgbChannels(
          defaultColors['ring-danger-subtle']
        ),
        '--color-ring-danger': getRgbChannels(defaultColors['ring-danger']),
        '--color-text-danger-base': getRgbChannels(
          defaultColors['text-danger-base']
        ),
        '--color-text-danger-high-contrast': getRgbChannels(
          defaultColors['text-danger-high-contrast']
        ),
        '--color-bg-danger-solid': getRgbChannels(
          defaultColors['bg-danger-solid']
        ),
        '--color-bg-danger-solid-hover': getRgbChannels(
          defaultColors['bg-danger-solid-hover']
        ),
        '--color-ring-gray-primary': getRgbChannels(
          defaultColors['ring-gray-primary']
        ),
        '--color-ring-gray-subtle': getRgbChannels(
          defaultColors['ring-gray-subtle']
        ),
        '--color-ring-gray-hover': getRgbChannels(
          defaultColors['ring-gray-hover']
        ),
      },
    });

    // Redefine CSS variables for each theme
    themes.forEach((theme) => {
      const { colors, name } = theme;
      addBase({
        [`[data-theme=${name}]`]: {
          '--color-text-gray-base': getRgbChannels(colors['text-gray-base']),
          '--color-text-green-base': getRgbChannels(colors['text-green-base']),

          '--color-bg-app': getRgbChannels(colors['bg-app']),
          '--color-bg-app-subtle': getRgbChannels(colors['bg-app-subtle']),
          '--color-bg-element': getRgbChannels(colors['bg-element']),
          '--color-bg-element-hover': getRgbChannels(
            colors['bg-element-hover']
          ),
          '--color-bg-element-active': getRgbChannels(
            colors['bg-element-active']
          ),
          '--color-ring-primary-subtle': getRgbChannels(
            colors['ring-primary-subtle']
          ),
          '--color-ring-primary': getRgbChannels(colors['ring-primary']),
          '--color-ring-primary-hover': getRgbChannels(
            colors['ring-primary-hover']
          ),
          '--color-bg-solid': getRgbChannels(colors['bg-solid']),
          '--color-bg-solid-hover': getRgbChannels(colors['bg-solid-hover']),
          '--color-text-gray-high-contrast': getRgbChannels(
            colors['text-gray-high-contrast']
          ),
          '--color-ring-success-subtle': getRgbChannels(
            colors['ring-success-subtle']
          ),
          '--color-ring-success': getRgbChannels(colors['ring-success']),
          '--color-text-success-base': getRgbChannels(
            colors['text-success-base']
          ),
          '--color-text-success-high-contrast': getRgbChannels(
            colors['text-success-high-contrast']
          ),
          '--color-ring-warning-subtle': getRgbChannels(
            colors['ring-warning-subtle']
          ),
          '--color-ring-warning': getRgbChannels(colors['ring-warning']),
          '--color-bg-warning-element': getRgbChannels(
            colors['bg-warning-element']
          ),
          '--color-bg-warning-element-hover': getRgbChannels(
            colors['bg-warning-element-hover']
          ),
          '--color-bg-warning-element-active': getRgbChannels(
            colors['bg-warning-element-active']
          ),
          '--color-text-warning-base': getRgbChannels(
            colors['text-warning-base']
          ),
          '--color-text-warning-high-contrast': getRgbChannels(
            colors['text-warning-high-contrast']
          ),
          '--color-bg-danger-element': getRgbChannels(
            colors['bg-danger-element']
          ),

          '--color-bg-danger-element-hover': getRgbChannels(
            colors['bg-danger-element-hover']
          ),
          '--color-bg-danger-element-active': getRgbChannels(
            colors['bg-danger-element-active']
          ),
          '--color-ring-danger-subtle': getRgbChannels(
            colors['ring-danger-subtle']
          ),
          '--color-ring-danger': getRgbChannels(colors['ring-danger']),
          '--color-text-danger-base': getRgbChannels(
            colors['text-danger-base']
          ),
          '--color-text-danger-high-contrast': getRgbChannels(
            colors['text-danger-high-contrast']
          ),
          '--color-bg-danger-solid': getRgbChannels(colors['bg-danger-solid']),
          '--color-bg-danger-solid-hover': getRgbChannels(
            colors['bg-danger-solid-hover']
          ),
          '--color-ring-gray-primary': getRgbChannels(
            colors['ring-gray-primary']
          ),
          '--color-ring-gray-subtle': getRgbChannels(
            colors['ring-gray-subtle']
          ),
          '--color-ring-gray-hover': getRgbChannels(colors['ring-gray-hover']),
        },
      });
    });

    // Add theme-specific variant for bespoke theming overrides
    themes.forEach((theme) => {
      addVariant(`theme-${theme.name}`, `[data-theme=${theme.name}] &`);
    });
  },

  // Add semantic color names to Tailwind's color palette
  {
    theme: {
      extend: {
        textColor: {
          // Core
          'gray-base': 'rgb(var(--color-text-gray-base) / <alpha-value>)',
          'gray-high-contrast':
            'rgb(var(--color-text-gray-high-contrast) / <alpha-value>)',
          'green-base': 'rgb(var(--color-text-green-base) / <alpha-value>)',
          'green-high-contrast':
            'rgb(var(--color-text-green-high-contrast) / <alpha-value>)',
          // Warning
          'warning-base': 'rgb(var(--color-text-warning-base) / <alpha-value>)',
          'warning-high-contrast':
            'rgb(var(--color-text-warning-high-contrast) / <alpha-value>)',

          // Danger
          'danger-base': 'rgb(var(--color-text-danger-base) / <alpha-value>)',
          'danger-high-contrast':
            'rgb(var(--color-text-danger-high-contrast) / <alpha-value>)',
        },
        backgroundColor: {
          app: 'rgb(var(--color-bg-app)  / <alpha-value>)',
          'app-subtle': 'rgb(var(--color-bg-app-subtle)  / <alpha-value>)',
          element: 'rgb(var(--color-bg-element)  / <alpha-value>)',
          'element-hover':
            'rgb(var(--color-bg-element-hover)  / <alpha-value>)',
          'element-active':
            'rgb(var(--color-bg-element-active)  / <alpha-value>)',
          solid: 'rgb(var(--color-bg-solid)  / <alpha-value>)',
          'solid-hover': 'rgb(var(--color-bg-solid-hover)  / <alpha-value>)',

          // Warning
          'warning-element':
            'rgb(var(--color-bg-warning-element)  / <alpha-value>)',
          'warning-element-hover':
            'rgb(var(--color-bg-warning-element-hover)  / <alpha-value>)',
          'warning-element-active':
            'rgb(var(--color-bg-warning-element-active)  / <alpha-value>)',

          // Danger
          'danger-element':
            'rgb(var(--color-bg-danger-element)  / <alpha-value>)',
          'danger-element-hover':
            'rgb(var(--color-bg-danger-element-hover)  / <alpha-value>)',
          'danger-element-active':
            'rgb(var(--color-bg-danger-element-active)  / <alpha-value>)',
          'danger-solid': 'rgb(var(--color-bg-danger-solid)  / <alpha-value>)',
          'danger-solid-hover':
            'rgb(var(--color-bg-danger-solid-hover)  / <alpha-value>)',
        },
        ringOffsetColor: {
          app: 'rgb(var(--color-bg-app)  / <alpha-value>)',
        },
        ringColor: {
          primary: 'rgb(var(--color-ring-primary)  / <alpha-value>)',
          'primary-subtle':
            'rgb(var(--color-ring-primary-subtle)  / <alpha-value>)',
          'primary-hover':
            'rgb(var(--color-ring-primary-hover)  / <alpha-value>)',
          warning: 'rgb(var(--color-ring-warning)  / <alpha-value>)',
          'warning-subtle':
            'rgb(var(--color-ring-warning-subtle)  / <alpha-value>)',
          'danger-subtle':
            'rgb(var(--color-ring-danger-subtle)  / <alpha-value>)',
          'warning-hover':
            'rgb(var(--color-ring-warning-hover)  / <alpha-value>)',
          'danger-hover':
            'rgb(var(--color-ring-danger-hover)  / <alpha-value>)',
          'gray-hover': 'rgb(var(--color-ring-gray-hover)  / <alpha-value>)',
          'gray-subtle': 'rgb(var(--color-ring-gray-subtle)  / <alpha-value>)',
          'gray-primary':
            'rgb(var(--color-ring-gray-primary)  / <alpha-value>)',
        },
        borderColor: {
          primary: 'rgb(var(--color-ring-primary)  / <alpha-value>)',
          'primary-subtle':
            'rgb(var(--color-ring-primary-subtle)  / <alpha-value>)',
          'primary-hover':
            'rgb(var(--color-ring-primary-hover)  / <alpha-value>)',
          warning: 'rgb(var(--color-ring-warning)  / <alpha-value>)',
          danger: 'rgb(var(--color-ring-danger)  / <alpha-value>)',
          'warning-subtle':
            'rgb(var(--color-ring-warning-subtle)  / <alpha-value>)',
          'danger-subtle':
            'rgb(var(--color-ring-danger-subtle)  / <alpha-value>)',
          'warning-hover':
            'rgb(var(--color-ring-warning-hover)  / <alpha-value>)',
          'danger-hover':
            'rgb(var(--color-ring-danger-hover)  / <alpha-value>)',
          'gray-hover': 'rgb(var(--color-ring-gray-hover)  / <alpha-value>)',
          'gray-subtle': 'rgb(var(--color-ring-gray-subtle)  / <alpha-value>)',
          'gray-primary':
            'rgb(var(--color-ring-gray-primary)  / <alpha-value>)',
        },
      },
    },
  }
);
