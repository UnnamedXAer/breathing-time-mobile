function doHardComputations() {
  const now = Date.now();
  let i = 0;
  while (i < 5000000) {
    const w = Math.sign(Math.sqrt(Math.asinh(i)));
    i++;
  }
  console.log(Date.now() - now);
}
