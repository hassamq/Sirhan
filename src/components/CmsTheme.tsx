type Colors = Partial<{
  navy: string;
  slate: string;
  stone: string;
  sage: string;
  sageDeep: string;
  sageSoft: string;
  ivory: string;
  ivoryDeep: string;
  clay: string;
  claySoft: string;
  cream: string;
  paper: string;
  muted: string;
}>;

type Fonts = Partial<{
  display: string;
  sans: string;
  script: string;
}>;

export function CmsTheme({
  colors,
  fonts,
}: {
  colors?: Colors | null;
  fonts?: Fonts | null;
}) {
  const cssVars = [
    colors?.navy && `--navy: ${colors.navy} !important`,
    colors?.slate && `--slate: ${colors.slate} !important`,
    colors?.stone && `--stone: ${colors.stone} !important`,
    colors?.sage && `--sage: ${colors.sage} !important`,
    colors?.sageDeep && `--sage-deep: ${colors.sageDeep} !important`,
    colors?.sageSoft && `--sage-soft: ${colors.sageSoft} !important`,
    colors?.ivory && `--ivory: ${colors.ivory} !important`,
    colors?.ivoryDeep && `--ivory-deep: ${colors.ivoryDeep} !important`,
    colors?.clay && `--clay: ${colors.clay} !important`,
    colors?.claySoft && `--clay-soft: ${colors.claySoft} !important`,
    colors?.cream && `--cream: ${colors.cream} !important`,
    colors?.paper && `--paper: ${colors.paper} !important`,
    colors?.muted && `--muted: ${colors.muted} !important`,
    fonts?.display && `--font-display: "${fonts.display}", Georgia, serif !important`,
    fonts?.sans && `--font-sans: "${fonts.sans}", system-ui, sans-serif !important`,
    fonts?.script && `--font-script: "${fonts.script}", Georgia, serif !important`,
  ]
    .filter(Boolean)
    .join(";");

  const families = [fonts?.display, fonts?.sans, fonts?.script]
    .filter(Boolean)
    .map((f) => String(f).replace(/\s+/g, "+"))
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .join("&family=");

  return (
    <>
      {families ? (
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${families}&display=swap`}
        />
      ) : null}
      {cssVars ? <style id="cms-theme">{`:root{${cssVars}}`}</style> : null}
    </>
  );
}
