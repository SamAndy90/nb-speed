import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import { filter } from 'framer-motion/client';
/**
 * Generates a range of colours based on a prefix, from 50 to 900
 * Can probably be replaced with semantic tokens in the future
 * (e.g. a toast component might have bg-success-900 text-success-50)
 * -> bg-success text-success-foreground
 */
function colourRange(prefix: string) {
    return {
        '50': `hsl(var(--${prefix}-50))`,
        ...Object.fromEntries(
            [...new Array(9)].map((_, i) => [
                100 * (i + 1),
                `hsl(var(--${prefix}-${100 * (i + 1)}))`,
            ])
        ),
    };
}

const gridTemplateColumnsPlugin = plugin(
    function ({ addUtilities, matchUtilities, theme }) {
        addUtilities({
            '.grid-auto-fill': {
                'grid-template-columns':
                    'repeat(auto-fill, minmax(var(--grid-min), var(--grid-max)))',
            },
            '.grid-auto-fit': {
                'grid-template-columns':
                    'repeat(auto-fit, minmax(var(--grid-min), var(--grid-max)))',
            },
        });
        matchUtilities(
            {
                'grid-min': (value) => ({ '--grid-min': value }),
                'grid-max': (value) => ({ '--grid-max': value }),
            },
            { values: theme('gridCellWidth') }
        );
    },
    { theme: { gridCellWidth: { ...defaultTheme.spacing, fr: '1fr' } } }
);

const obliquePlugin = plugin(
    function ({ addUtilities, matchUtilities, theme }) {
        addUtilities({
            '.oblique': {
                'font-style': 'oblique 12deg',
            },
        });
    },
    { theme: { gridCellWidth: { ...defaultTheme.spacing, fr: '1fr' } } }
);
/*
    Heading values are defined as TailwindCSS classes
    Spacing is identical values to TailwindCSS
    Colours are either TailwindCSS classes, or custom HSL values which are accesible through tailwind classes
    This may need to be adapted as they are actually used

*/
const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                heading: ['var(--font-heading)', ...fontFamily.sans],
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
            fontSize: {
                lg: [
                    '1.125rem',
                    {
                        lineHeight: '1.625rem',
                    },
                ],
                base: [
                    '1rem',
                    {
                        lineHeight: '1.5rem',
                    },
                ],
                sm: [
                    '0.875rem',
                    {
                        lineHeight: '1.25rem',
                    },
                ],
                xs: [
                    '0.75rem',
                    {
                        lineHeight: '1rem',
                    },
                ],
                'mobile-h1': [
                    '2.25rem',
                    {
                        lineHeight: '2.75rem',
                        fontWeight: '300',
                    },
                ],
                'mobile-h2': [
                    '2rem',
                    {
                        lineHeight: '2.5rem',
                        fontWeight: '300',
                    },
                ],
                'mobile-h3': [
                    '1.75rem',
                    {
                        lineHeight: '2.25rem',
                        fontWeight: '300',
                    },
                ],
                'mobile-h4': [
                    '1.5rem',
                    {
                        lineHeight: '2rem',
                        fontWeight: '300',
                    },
                ],
                'mobile-h5': [
                    '1.25rem',
                    {
                        lineHeight: '1.75rem',
                        fontWeight: '300',
                    },
                ],
                'mobile-h6': [
                    '1.125rem',
                    {
                        lineHeight: '1.75rem',
                        fontWeight: '300',
                    },
                ],
                'desktop-h1': [
                    '3.563rem',
                    {
                        lineHeight: '4.313rem',
                        fontWeight: '300',
                    },
                ],
                'desktop-h2': [
                    '3.125rem',
                    {
                        lineHeight: '3.875rem',
                        fontWeight: '300',
                    },
                ],
                'desktop-h3': [
                    '2.5rem',
                    {
                        lineHeight: '3.25rem',
                        fontWeight: '300',
                    },
                ],
                'desktop-h4': [
                    '2rem',
                    {
                        lineHeight: '2.5rem',
                        fontWeight: '300',
                    },
                ],
                'desktop-h5': [
                    '1.75rem',
                    {
                        lineHeight: '2.25rem',
                        fontWeight: '300',
                    },
                ],
                'desktop-h6': [
                    '1.5rem',
                    {
                        lineHeight: '2rem',
                        fontWeight: '300',
                    },
                ],
                'desktop-h7': [
                    '1.25rem',
                    {
                        lineHeight: '1.4',
                        fontWeight: '300',
                    },
                ],

                // by Artur
                'paragraph-0': [
                    // Paragraph/Paragraph 00 in Figma
                    '1.5rem',
                    {
                        lineHeight: '1.33',
                        fontWeight: 'inherit',
                    },
                ],
                'paragraph-1': [
                    // Paragraph/Paragraph 01 in Figma
                    '1.25rem',
                    {
                        lineHeight: '1.4',
                        fontWeight: '700',
                    },
                ],
                'paragraph-2': [
                    // Paragraph/Paragraph 02 in Figma
                    '1.125rem',
                    {
                        lineHeight: '1.4',
                        fontWeight: '400',
                    },
                ],
                'paragraph-3': [
                    // Paragraph/Paragraph 03 in Figma
                    '1rem',
                    {
                        lineHeight: '1.5',
                        fontWeight: '400',
                    },
                ],
                'paragraph-4': [
                    // Paragraph/Paragraph 04 in Figma
                    '0.875rem',
                    {
                        lineHeight: '1.25rem',
                        fontWeight: '400',
                    },
                ],
                'paragraph-5': [
                    // Paragraph/Paragraph 05 in Figma
                    '0.75rem',
                    {
                        lineHeight: '1.25rem',
                        fontWeight: '400',
                    },
                ],
            },
            backgroundImage: {
                'gradient-1':
                    'linear-gradient(90deg, hsl(var(--gradient-1-from)) 0%, hsl(var(--gradient-1-to)) 100%)',
                'gradient-2':
                    'linear-gradient(165.22deg, hsl(var(--gradient-2-from)) -0.05%, hsl(var(--gradient-2-via)) 29.36%, hsl(var(--gradient-2-to)) 89.56%)',
                'gradient-3':
                    'linear-gradient(146.31deg, hsl(var(--gradient-3-from)) 10%, hsl(var(--gradient-3-to)) 33.96%, hsl(var(--gradient-3-via)) 96.67%)',
                'gradient-4':
                    'linear-gradient(180deg, rgba(255, 255, 255, 0) 16.55%, rgba(43, 84, 69, 0.67) 72.95%, rgba(26, 61, 49, 0.75) 100%);',
                'gradient-5':
                    'linear-gradient(204.72deg, rgba(15, 15, 17, 0.171) 15.76%, rgba(15, 15, 17, 0.57) 65.13%)',
                'gradient-6':
                    'linear-gradient(180deg, #FEFEFC 26.66%, rgba(254, 254, 252, 0.72765) 47.25%, rgba(254, 254, 252, 0) 65.09%)',
                'gradient-7':
                    'linear-gradient(180deg, rgba(254, 254, 252, 0.2) 6.37%, rgba(217, 239, 229, 0.2) 33.29%, rgba(64, 175, 134, 0.2) 97.5%)',
                'gradient-8':
                    'linear-gradient(180deg, rgba(254, 254, 252, 0.5) 0%, rgba(244, 232, 206, 0.5) 100%)',
                'gradient-9':
                    'linear-gradient(80.72deg, rgba(249, 247, 243, 0.8) 24.51%, rgba(254, 254, 252, 0) 59.84%)',
                'gradient-10':
                    'linear-gradient(90.79deg, rgba(255, 255, 255, 0) 37.11%, rgba(255, 255, 255, 0.548832) 50.09%, rgba(255, 255, 255, 0.8) 73.17%)',
                'gradient-11':
                    'linear-gradient(180.11deg, rgba(99, 99, 99, 0) 20.03%, #121111 99.91%)',
                'gradient-12':
                    'linear-gradient(180deg, #FFFFFF 0%, #F4DDDB 100%)', //used in benefits page
                'gradient-13':
                    'linear-gradient(180deg, #F5DEDC 0%, #FEFEFC 100%);', //used in benefits page
                'gradient-14':
                    'linear-gradient(180deg, #F9F7F3 0%, #F4DDDB 100%);', //used in goodbye pills
                'gradient-15':
                    'linear-gradient(180deg, #FFFFFF 0%, #F8F1E6 100%);', //used in home page the nutriburst difference
                'gradient-sustainability-hero':
                    'linear-gradient(180deg, #FEFEFC 26.66%, rgba(254, 254, 252, 0.72765) 47.25%, rgba(254, 254, 252, 0) 65.09%);', //used in goodbye pills
                'gradient-gum-rectangle':
                    'radial-gradient(107.74% 73.49% at -2.13% 59.24%, #F4DDDB 0%, rgba(243, 210, 231, 0) 100%)', //used in goodbye pills
                'gradient-silver':
                    'linear-gradient(146.31deg, #C0CEDB 10%, #F4FFFF 33.96%, #9BA1A7 96.67%)',
                'gradient-bronze':
                    'linear-gradient(146.31deg, #C6937F 10%, #FFE5CF 33.96%, #B08271 96.67%)',
                'gradient-section':
                    'linear-gradient(180deg, #FFFFFF 0%, #F8F6F2 100%)',
                'gradient-section-2':
                    'linear-gradient(180deg, #FEFEFC 57.04%, #F8F0E5 136.94%)',
                'gradient-section-3':
                    'linear-gradient(180deg, #FFFFFF 0%, #F8F0E5 100%)',
                'gradient-section-4':
                    'linear-gradient(180deg, #FFFFFF 0%, #F8F2E7 100%)',
                'nude-tone':
                    'linear-gradient(146.31deg, #B9846F 10%, #EFD0B6 33.96%, #B08271 96.67%)',
                'your-body':
                    'linear-gradient(90.11deg, rgba(255, 255, 255, 0) 30.82%, rgba(254, 254, 252, 0.69) 73.91%)',
                'cooper-gradient':
                    'linear-gradient(170deg, #C99A84 0%, #EDCDB3 40%, #BE9381 100%)',
                'cooper-text-gradient':
                    'linear-gradient(101deg, #B9846F 0%, #D4B091 28%, #B08271 100%)',
            },
            backdropBlur: {
                custom: '8px',
            },
            minHeight: {
                'landing-screen': 'calc(100vh - 80px)',
                'landing-screen-sm': 'calc(100vh - 58px)',
            },
            height: {
                'landing-screen': 'calc(100vh - 80px)',
                'landing-screen-sm': 'calc(100vh - 58px)',
            },
            colors: {
                base: {
                    '50': 'hsl(var(--base-50))',
                    '100': 'hsl(var(--base-100))',
                },
                neutral: { ...colors.zinc },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    white: 'hsl(var(--primary-white))',
                    black: 'hsl(var(--primary-black))',
                },
                theme: {
                    DEFAULT: 'hsl(var(--theme))',
                    foreground: 'hsl(var(--theme-foreground))',
                    50: 'hsl(var(--theme-50))',
                    200: 'hsl(var(--theme-200))',
                    400: 'hsl(var(--theme-400))',
                    800: 'hsl(var(--theme-800))',
                    v2: 'hsl(var(--theme-v2))',
                },
                success: {
                    ...colourRange('green'), //These are full colour ranges for now, but I assume could be replaced by semantic tokens in the future
                },
                warning: {
                    ...colourRange('amber'),
                },
                error: {
                    ...colourRange('red'),
                },
                beige: {
                    DEFAULT: 'hsl(var(--beige))',
                    light: 'hsl(var(--beige-light))',
                    new: '#D0C4BB',
                },
                'gradient-1': {
                    from: 'hsl(var(--gradient-1-from))',
                    to: 'hsl(var(--gradient-1-to))',
                },
                'gradient-2': {
                    from: 'hsl(var(--gradient-2-from))',
                    via: 'hsl(var(--gradient-2-via))',
                    to: 'hsl(var(--gradient-2-to))',
                },
                'gradient-3': {
                    from: 'hsl(var(--gradient-3-from))',
                    via: 'hsl(var(--gradient-3-via))',
                    to: 'hsl(var(--gradient-3-to))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--base-50))',
                foreground: 'hsl(var(--base-100))',

                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                    pink: 'hsl(var(--accent-pink))',
                    'ocean-blue': 'hsl(var(--accent-ocean-blue))',
                    'tech-blue': 'hsl(var(--accent-tech-blue))',
                    orange: 'hsl(var(--accent-orange))',
                    green: 'hsl(var(--accent-green))',
                    beige: 'hsl(var(--accent-beige))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                'ocean-blue': {
                    300: '#B7CBD1',
                    400: '#59ADC4',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xs: 'calc(var(--radius) - 8px)',
                xxs: 'calc(var(--radius) - 12px)',
            },
            animation: {
                'accordion-down': 'accordion-down 0.5s ease-out',
                'accordion-up': 'accordion-up 0.5s ease-out',
                glow: 'glow 1.5s infinite',
                scroll: 'scroll 10s linear infinite',
                'marquee-down': 'marquee-down 10s linear infinite',
                'marquee-up': 'marquee-up 10s linear infinite',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                glow: {
                    '0%': {
                        transform: 'scale(.93,.5)',
                        opacity: '.3',
                    },
                    '70%': {
                        opacity: '.3',
                    },
                    to: {
                        transform: 'scale(1)',
                        opacity: '0',
                    },
                },
                scroll: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-up': {
                    '0%': {
                        transform: 'translateY(0)',
                    },
                    '100%': {
                        transform: 'translateY(-25%)',
                    },
                },
                'marquee-down': {
                    '0%': {
                        transform: 'translateY(-25%)',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                    },
                },
            },
            listStyleImage: {
                check: `url("/list-icons/check.svg")`,
                'check-gradient': `url("/list-icons/check-gradient.svg")`,
                'check-green': `url("/list-icons/check-green.svg")`,
                'cross-red': `url("/list-icons/cross-red.svg")`,
            },
            spacing: {
                'page-desktop': defaultTheme.spacing['36'],
                'page-mobile': defaultTheme.spacing['5'],
                '30': '7.5rem',
                '35': '8.75rem',
                '25': '6.25rem',
                '12.5': '3.125rem',
            },
            dropShadow: {
                card: '0px 4px 24px rgba(171, 167, 157, 0.25)',
                'hero-badge': '0px 4px 20.9px 0px rgba(139, 139, 139, 0.25)',
            },
            boxShadow: {
                'hero-badge': '0px 4px 20.9px 0px rgba(139, 139, 139, 0.25)',
                soft: '0px 4px 24px 0px rgba(171, 167, 157, 0.25)', // #ABA79D40 converted to rgba
                'soft-1': '0px 4px 24px 0px rgb(115 113 108 / 25%)', // #73716C 25% converted to rgba
                card: '0px 4px 24px rgba(171, 167, 157, 0.25)',
                'reward-card':
                    '0px 2.33px 13.99px 0px rgba(171, 167, 157, 0.25)',
                'rewards-page-card':
                    '0px 4.14px 24.82px 0px rgba(171, 167, 157, 0.25)',
                'warning-inset': '0px 6px 0px 0px rgba(255, 182, 10, 1) inset',
                'error-inset': '0px 6px 0px 0px rgba(220, 38, 38, 1) inset',
            },
        },
    },
    plugins: [animate, typography, gridTemplateColumnsPlugin, obliquePlugin],
} satisfies Config;

export default config;

/*
    Figma - Tailwind
    text-xs -> text-xs
    text-sm -> text-sm
    text-m -> text-base
    text-l -> text-lg line-height 1.625rem
    Mobile
    H6: text-xl -> text-lg
    H5: text-xl -> text-xl
    H4: text-2xl -> text-2xl
    H3: text-3xl -> 1.75rem 2.25rem
    H2: text-5xl -> 2rem 2.5rem
    H1: text-5xl -> text-4xl
    Desktop
    H6: text-xl -> text-xl
    H5: text-2xl -> text-2xl
    H4: text-3xl -> 1.75rem 2.25rem
    H3: text-4xl -> 2rem 2.5rem
    H2: text-5xl -> 2.5rem 3.25rem
    H1: text-6xl -> 3.125rem 3.875rem

*/
