export const numberWithDot = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatter = (num) => {
  let result = 0
  const numFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  try {
    result = numFormatter.format(num)
  } catch { }
  return result
}
