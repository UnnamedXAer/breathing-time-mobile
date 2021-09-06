export function doHardComputations() {
  const now = Date.now();
  let i = 0;
  let w = -1;
  while (i < 5000000) {
    w = Math.sign(Math.sqrt(Math.asinh(i)));
    i++;
  }
  console.log(Date.now() - now);

  return w;
}

const t = (
  fontFamily: string,
  color: string,
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
  fontStyle?: 'normal' | 'italic',
) => (
  <Text
    key={fontFamily + Math.random().toLocaleString() + fontWeight!}
    style={{
      fontSize: Layout.spacing(2),
      marginBottom: Layout.spacing(2),
      fontFamily,
      color,
      fontWeight,
      fontStyle,
    }}>
    {fontFamily} {fontWeight} {fontStyle}: To get started, download the font you want to
    use in your app
  </Text>
);
