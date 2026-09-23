/* the reseller code in play, shown beside the logo on every page — same
   role as the "Referral Code" pill on the products page */
export function ResellerCodeBadge({ code }: { code: string }) {
  return (
    <span className="refcode" title={`Referral code: ${code}`}>
      <span className="refcode-dot" aria-hidden="true" />
      <span className="refcode-label">
        <span className="refcode-label-extra">Referral </span>Code:
      </span>
      <b className="refcode-value">{code}</b>
    </span>
  );
}
