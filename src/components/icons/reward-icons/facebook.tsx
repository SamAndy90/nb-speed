import React, { useId } from 'react';
const GradientFacebookIcon = ({ className }: { className?: string }) => {
    const id = useId();

    return (
        <svg
            viewBox="0 0 40 39"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M23.15 9.2904V14.5308L29.6308 14.5308L28.6046 21.59H23.15L23.15 37.8541C22.0563 38.0058 20.9375 38.085 19.8017 38.085C18.4907 38.085 17.2033 37.9805 15.9496 37.7783L15.9496 21.59H9.97266L9.97266 14.5308L15.9496 14.5308L15.9496 8.11893C15.9496 4.14098 19.1732 0.914795 23.1516 0.914795V0.918169C23.1634 0.918169 23.1735 0.914795 23.1853 0.914795L29.6324 0.914795V7.01993L25.4198 7.01993C24.1677 7.01993 23.1516 8.03633 23.1516 9.28871L23.15 9.2904Z"
                fill={`url(#${id})`}
            />
            <defs>
                <linearGradient
                    id={id}
                    x1="14.8876"
                    y1="0.914795"
                    x2="41.0293"
                    y2="21.6548"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B9846F" />
                    <stop offset="0.276451" stopColor="#EFD0B6" />
                    <stop offset="1" stopColor="#B08271" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default GradientFacebookIcon;
