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
