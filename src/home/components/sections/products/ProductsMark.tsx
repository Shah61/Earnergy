type ProductsMarkProps = {
  className?: string;
};

export function ProductsMark({ className }: ProductsMarkProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 50 L74 24 L84 34 L58 60 Z" />
      <path d="M50 50 L80 44 L84 58 L50 64 Z" />
      <path d="M50 50 L62 80 L48 84 L42 50 Z" />
      <path d="M50 50 L24 70 L16 58 L44 40 Z" />
      <path d="M50 50 L26 30 L36 18 L56 44 Z" />
    </svg>
  );
}
