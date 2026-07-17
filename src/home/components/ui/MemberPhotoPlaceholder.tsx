import { BrandMark } from "@home/components/ui/icons";

export function MemberPhotoPlaceholder() {
  return (
    <span className="ph">
      <BrandMark className="mk" useSymbol />
      <svg className="av" viewBox="0 0 64 64" aria-hidden="true">
        <use href="#avatar" />
      </svg>
    </span>
  );
}
