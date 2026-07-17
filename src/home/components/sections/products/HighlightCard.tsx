import type { CSSProperties, ReactNode } from "react";
import {
  CandyOff,
  Coffee,
  Package,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { HighlightIconId } from "@home/types/productHighlights";

const HIGHLIGHT_ICONS: Record<HighlightIconId, LucideIcon> = {
  "candy-off": CandyOff,
  wheat: Wheat,
  package: Package,
  zap: Zap,
  coffee: Coffee,
};

type HighlightCardShellProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function HighlightCardShell({
  children,
  className,
  style,
}: HighlightCardShellProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

type HighlightIconBadgeProps = {
  iconId: HighlightIconId;
};

export function HighlightIconBadge({ iconId }: HighlightIconBadgeProps) {
  const Icon = HIGHLIGHT_ICONS[iconId];
  return (
    <span className="hl-card-icon">
      <Icon aria-hidden="true" />
    </span>
  );
}
