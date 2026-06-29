import { ImageResponse } from "next/og";

export const alt =
  "Insightful Financial Analytics: operational intelligence and financial visibility";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Load Newsreader as a TTF/OTF for the OG wordmark. Satori (next/og) renders only
 * ttf/otf/woff, so we match Google's truetype/opentype src (an old UA makes Google
 * include it) and skip woff2. Times out and falls back to the default font so the
 * build never hangs or fails offline. Token hex values are inlined because Satori
 * runs outside the DOM and cannot read CSS variables (see DECISIONS).
 */
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Newsreader:wght@500",
      {
        headers: {
          "User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
        },
        signal: AbortSignal.timeout(3000),
      },
    ).then((res) => (res.ok ? res.text() : ""));

    const match = css.match(
      /src:\s*url\((https:\/\/[^)]+)\)\s*format\(['"]?(?:truetype|opentype)['"]?\)/,
    );
    if (!match) return null;

    const font = await fetch(match[1], { signal: AbortSignal.timeout(3000) });
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const serif = await loadSerif();

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f7f2e8",
        color: "#1f2522",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 6,
          color: "#676b67",
        }}
      >
        OPERATIONAL INTELLIGENCE
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 96,
            height: 4,
            backgroundColor: "#b87937",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: serif ? "Newsreader" : "serif",
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: -1,
            maxWidth: 900,
          }}
        >
          Insightful Financial Analytics
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#676b67",
            marginTop: 28,
          }}
        >
          Helping businesses see operational and financial risk earlier.
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: serif
        ? [
            {
              name: "Newsreader",
              data: serif,
              style: "normal" as const,
              weight: 500,
            },
          ]
        : undefined,
    },
  );
}
