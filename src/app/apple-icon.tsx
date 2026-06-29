import { ImageResponse } from "next/og";
import { MARK_PATH, MARK_VIEWBOX } from "@/components/brand/logo-art";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — the real ribbon mark on the bone field, with safe-area
 * padding for iOS corner masking. Built from the shared mark geometry
 * (logo-art.ts) so it tracks the logo. Charcoal is inlined because Satori runs
 * outside the DOM and cannot read CSS variables (same scoped exception as the
 * OG image — see DECISIONS).
 */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f2e8",
      }}
    >
      <svg
        width="124"
        height="124"
        viewBox={MARK_VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#231f20" d={MARK_PATH} />
      </svg>
    </div>,
    { ...size },
  );
}
