/**
 * SVG Icons for PDF Templates
 * 
 * Inline SVG icons to replace emoji characters for reliable rendering
 * across all environments (local, Docker, cloud functions).
 * 
 * Uses Zenland color scheme:
 * - Primary: #1A82FB (Zenland Blue)
 * - Dark: #1a1a2e
 * - White: #ffffff
 */

// ============================================================================
// ICON GENERATOR HELPERS
// ============================================================================

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<IconSize, number> = {
  sm: 14,
  md: 18,
  lg: 24,
  xl: 28,
};

function getSize(size: IconSize): { width: number; height: number } {
  const s = sizes[size];
  return { width: s, height: s };
}

// ============================================================================
// SECURITY / LOCK ICONS
// ============================================================================

/**
 * Lock icon - for security notices and locked contracts
 * 🔐 replacement
 */
export function lockIcon(size: IconSize = 'md', color: string = 'currentColor'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" stroke="${color}" stroke-width="2" fill="none"/>
    <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="${color}"/>
  </svg>`;
}

/**
 * Shield icon - for agents/protection
 * 🛡️ replacement
 */
export function shieldIcon(size: IconSize = 'md', color: string = '#1A82FB'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.1"/>
    <path d="M9 12L11 14L15 10" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/**
 * Padlock closed icon - for locked contracts (no agent)
 * 🔒 replacement
 */
export function padlockIcon(size: IconSize = 'md', color: string = '#64748b'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="10" width="16" height="12" rx="2" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="2"/>
    <path d="M8 10V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V10" stroke="${color}" stroke-width="2"/>
    <circle cx="12" cy="15" r="1.5" fill="${color}"/>
  </svg>`;
}

// ============================================================================
// USER / PARTY ICONS
// ============================================================================

/**
 * User icon - for buyer/seller parties
 * 👤 replacement
 */
export function userIcon(size: IconSize = 'md', color: string = '#1A82FB'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.1"/>
    <path d="M4 20C4 16.6863 7.13401 14 11 14H13C16.866 14 20 16.6863 20 20V21H4V20Z" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.1"/>
  </svg>`;
}

// ============================================================================
// ACTION ICONS
// ============================================================================

/**
 * Rocket icon - for action/accept buttons
 * 🚀 replacement
 */
export function rocketIcon(size: IconSize = 'xl', color: string = '#ffffff'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 6 8 12C8 14 9 16 9 16H15C15 16 16 14 16 12C16 6 12 2 12 2Z" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.2"/>
    <circle cx="12" cy="10" r="2" fill="${color}"/>
    <path d="M9 16L7 22L12 19L17 22L15 16" stroke="${color}" stroke-width="2" stroke-linejoin="round" fill="${color}" fill-opacity="0.2"/>
    <path d="M5 10C5 10 6 12 8 12" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    <path d="M19 10C19 10 18 12 16 12" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

/**
 * Document-with-check icon - for accept buttons
 * 📄✅ replacement
 */
export function documentCheckIcon(size: IconSize = 'xl', color: string = '#ffffff'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2H14L19 7V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2Z" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.14"/>
    <path d="M14 2V7H19" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 11H16" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 15H12" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    <path d="M10.5 18L12.5 20L16.5 16" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/**
 * Checkmark circle icon - for verification
 * ✅ replacement
 */
export function checkCircleIcon(size: IconSize = 'lg', color: string = '#1A82FB'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.1"/>
    <path d="M8 12L11 15L16 9" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ============================================================================
// TIME / DEADLINE ICONS
// ============================================================================

/**
 * Clock icon - for deadlines
 * ⏰ replacement
 */
export function clockIcon(size: IconSize = 'lg', color: string = '#ffffff'): string {
  const { width, height } = getSize(size);
  return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.1"/>
    <path d="M12 6V12L16 14" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ============================================================================
// EXPORTED ICON FUNCTIONS WITH PRESET STYLES
// ============================================================================

/**
 * Security notice lock icon (amber/warning style)
 */
export const securityLockIcon = (): string => lockIcon('sm', '#d97706');

/**
 * Party icon for buyer/seller
 */
export const partyUserIcon = (): string => userIcon('lg', '#1A82FB');

/**
 * Agent shield icon (has agent)
 */
export const agentShieldIcon = (): string => shieldIcon('lg', '#1A82FB');

/**
 * Locked contract icon (no agent)
 */
export const lockedContractIcon = (): string => padlockIcon('lg', '#64748b');

/**
 * Deadline clock icon
 */
export const deadlineClockIcon = (): string => clockIcon('lg', '#ffffff');

/**
 * Accept action rocket icon
 */
export const acceptRocketIcon = (): string => rocketIcon('xl', '#ffffff');

/**
 * Accept action document-with-check icon
 */
export const acceptDocumentCheckIcon = (): string => documentCheckIcon('xl', '#ffffff');

/**
 * Verify checkmark icon
 */
export const verifyCheckIcon = (): string => checkCircleIcon('lg', '#1A82FB');

/**
 * Small checkmark for inline lists (guarantees, etc.)
 */
export const smallCheckIcon = (): string => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 12L10 17L19 7" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/**
 * Arrow icon for flow diagrams
 */
export const flowArrowIcon = (): string => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
