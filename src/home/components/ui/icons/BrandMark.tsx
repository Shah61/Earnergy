type BrandMarkProps = {
  className?: string;
  useSymbol?: boolean;
};

export function BrandMark({ className, useSymbol = false }: BrandMarkProps) {
  if (useSymbol) {
    return (
      <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#mark" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <g>
        <path d="M50 50 L74 24 L84 34 L58 60 Z" />
        <path d="M50 50 L80 44 L84 58 L50 64 Z" />
        <path d="M50 50 L62 80 L48 84 L42 50 Z" />
        <path d="M50 50 L24 70 L16 58 L44 40 Z" />
        <path d="M50 50 L26 30 L36 18 L56 44 Z" />
      </g>
    </svg>
  );
}

export function BrandMarkSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="mark" viewBox="0 0 100 100">
        <g>
          <path d="M50 50 L74 24 L84 34 L58 60 Z" />
          <path d="M50 50 L80 44 L84 58 L50 64 Z" />
          <path d="M50 50 L62 80 L48 84 L42 50 Z" />
          <path d="M50 50 L24 70 L16 58 L44 40 Z" />
          <path d="M50 50 L26 30 L36 18 L56 44 Z" />
        </g>
      </symbol>
      <symbol id="avatar" viewBox="0 0 64 64">
        <circle cx="32" cy="23" r="12" />
        <path d="M11 60c0-12 9.4-20 21-20s21 8 21 20Z" />
      </symbol>
    </svg>
  );
}
