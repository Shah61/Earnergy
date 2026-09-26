import type { MenuPanelKind } from "@home/constants/navigation";
import { ResellerLinkList } from "./ResellerLinkList";
import { ShopProductList } from "./ShopProductList";

type MenuPanelProps = {
  panel: MenuPanelKind;
  /** the reseller code in play; every link that can carry it does */
  uplineCode: string | null;
  onPick?: () => void;
};

/* what unfolds under "Shop" or "Reseller" — shared by the desktop
   dropdowns and the mobile drawer */
export function MenuPanel({ panel, uplineCode, onPick }: MenuPanelProps) {
  return panel === "shop" ? (
    <ShopProductList uplineCode={uplineCode} onPick={onPick} />
  ) : (
    <ResellerLinkList uplineCode={uplineCode} onPick={onPick} />
  );
}
