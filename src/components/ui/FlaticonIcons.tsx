import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Curated Coffee Culture Lineal Icon Family
 * Inspired by Flaticon's "Coffee and Cafe" & "Coffee Cups" Lineal Collections by Freepik / Smashicons
 * License: Flaticon Free License with Author Attribution (see ATTRIBUTION.md and footer)
 * Style: Consistent 1.75px stroke, rounded terminals, optical 24x24 viewport
 */

// 1. Ceramic Coffee Cup with Steaming Crema
export const IconCoffeeCup: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M3 8h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <path d="M6 2v2" />
    <path d="M10 1v3" />
    <path d="M14 2v2" />
  </svg>
);

// 2. Specialty Whole Roasted Coffee Beans
export const IconCoffeeBeans: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 21a8 8 0 1 0-8-8c0 4.418 3.582 8 8 8z" />
    <path d="M12 5c0 3.5-3 5.5-3 8s3 4.5 3 8" />
    <path d="M17 3a6 6 0 0 1 4.24 10.24" />
    <path d="M15 15c2-1 4-1 6 0" />
  </svg>
);

// 3. Independent Roastery / Cafe Storefront
export const IconCafeShop: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 9l1.5-5h15L21 9" />
    <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    <path d="M4 12v9h16v-9" />
    <path d="M10 21v-6h4v6" />
  </svg>
);

// 4. Digital Membership Club Card
export const IconMembershipCard: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <line x1="6" y1="15" x2="10" y2="15" />
    <circle cx="17" cy="15" r="1.25" fill="currentColor" />
  </svg>
);

// 5. Member Inclusion / Counter Gift Reward
export const IconGiftPerk: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

// 6. Barista To-Go / Takeaway Cup
export const IconTakeawayCup: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 7l1.5 14h9L18 7" />
    <path d="M5 4h14v3H5z" />
    <line x1="8" y1="2" x2="16" y2="2" />
    <line x1="7" y1="12" x2="17" y2="12" strokeDasharray="1 1" />
  </svg>
);

// 7. Perforated Redemption Voucher / Ticket Stub
export const IconTicketVoucher: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v2a2 2 0 0 0 0 4v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2a2 2 0 0 0 0-4V9z" />
    <line x1="9" y1="6" x2="9" y2="18" strokeDasharray="2 2" />
  </svg>
);

// 8. Roastery Locus / Neighborhood Pin
export const IconLocationPin: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// 9. Verified Cupping & Roaster Proof Mark
export const IconVerifiedProof: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

// 10. Dynamic Rotating Pass QR Token
export const IconQrToken: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="3" height="3" />
    <rect x="18" y="18" width="3" height="3" />
  </svg>
);

// Unified Flaticon-Curated Coffee Symbol Registry
export const Flaticon = {
  CoffeeCup: IconCoffeeCup,
  CoffeeBeans: IconCoffeeBeans,
  CafeShop: IconCafeShop,
  MembershipCard: IconMembershipCard,
  GiftPerk: IconGiftPerk,
  TakeawayCup: IconTakeawayCup,
  TicketVoucher: IconTicketVoucher,
  LocationPin: IconLocationPin,
  VerifiedProof: IconVerifiedProof,
  QrToken: IconQrToken,
};
