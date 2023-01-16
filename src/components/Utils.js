export const numberWithDot = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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



export function truncate(str, num) {
 if (str.length > num) {
   return str.slice(0, num) + "..."
 } else {
   return str
 }
}


export function isTruncated(str, num) {
 return str.length > num ? true : false
}

export function translateBg(status) {
  let newBg = "";
  switch (status) {
    case "draft":
      newBg = "#CCD1D9";
      break;
    case "paid":
      newBg = "rgb(195, 230, 179)";
      break;
    case "send":
      newBg = "#FFEEB9";
      break;
    case "partial":
      newBg = "#FFEEB9";
      break;
    case "overdue":
      newBg = "#FEC6CF";
      break;

    default:
      newBg = "";
      break;
  }

  return newBg;
}

export function getTotalGlobal(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return `${numberWithDot(sum)}`
}