type SocialIconProps = {
  name: string;
};

export function SocialIcon({ name }: SocialIconProps) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 8.5h2.5L16 12h-2v8h-3v-8H9v-3.5h2V7c0-2.2 1.3-3.5 3.4-3.5H16v3h-1.4c-.8 0-1.6.1-1.6 1.5v1.5z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.43a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.7a5.79 5.79 0 0 0-.78-.05A5.79 5.79 0 1 0 15.34 15.4V9.01a7.45 7.45 0 0 0 4.36 1.4V7.21a4.28 4.28 0 0 1-3.1-1.39Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
