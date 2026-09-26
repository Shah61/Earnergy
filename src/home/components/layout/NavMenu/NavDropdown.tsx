import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { ChevronDown } from "lucide-react";
import type { MenuPanelKind } from "@home/constants/navigation";
import { MenuPanel } from "./MenuPanel";

type NavDropdownProps = {
  label: string;
  panel: MenuPanelKind;
  uplineCode: string | null;
};

/* desktop "Shop" / "Reseller" entry: opens on hover for a mouse, on
   tap/click/keyboard for everything else */
export function NavDropdown({ label, panel, uplineCode }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  /* a click right after hover-opening shouldn't snap the panel shut */
  const openedByHover = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    openedByHover.current = true;
    setIsOpen(true);
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => {
      openedByHover.current = false;
      setIsOpen(false);
    }, 160);
  };

  /* hover may have opened it a moment ago (and that render may not have
     landed yet), so the first click keeps it open; the next one closes */
  const onToggle = () => {
    const keepOpen = openedByHover.current;
    openedByHover.current = false;
    setIsOpen((open) => (keepOpen ? true : !open));
  };

  return (
    <div
      ref={rootRef}
      className={`nav-drop${isOpen ? " is-open" : ""}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className="nav-drop-btn"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {label}
        <ChevronDown aria-hidden="true" className="nav-drop-chevron" />
      </button>

      <div className="nav-drop-panel" id={panelId}>
        <MenuPanel panel={panel} uplineCode={uplineCode} onPick={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
