import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
export const fontHeading = localFont({
    src: './fonts/Nohemi/Nohemi-VF.ttf',
    variable: '--font-heading',
    display: 'swap',
});

export const fontSans = localFont({
    variable: '--font-sans',
    display: 'swap',
    src: [
        {
            path: './fonts/Area_Normal_Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Area_Normal_Regular_Italic.otf',
            weight: '400',
            style: 'italic',
        },
        {
            path: './fonts/Area_Normal_SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/Area_Normal_SemiBold_Italic.otf',
            weight: '600',
            style: 'italic',
        },
        {
            path: './fonts/Area_Normal_Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/Area_Normal_Bold_Italic.otf',
            weight: '700',
            style: 'italic',
        },
        {
            path: './fonts/Area_Normal_Black.otf',
            weight: '900',
            style: 'normal',
        },
        {
            path: './fonts/Area_Normal_Black_Italic.otf',
            weight: '900',
            style: 'italic',
        },
    ],
});
