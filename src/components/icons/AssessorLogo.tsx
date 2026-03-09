import React from 'react';

export const AssessorLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
    >
        <rect width="100" height="100" rx="20" fill="#0A0A0A" />
        <path
            d="M25 75L50 25L75 75M35 55H65"
            stroke="#D4AF37"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="50" cy="50" r="4" fill="#E5E5E5" />
        <rect x="15" y="15" width="70" height="70" rx="12" stroke="#262626" strokeWidth="2" />
    </svg>
);
