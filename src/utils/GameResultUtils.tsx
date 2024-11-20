export function isJackpot(result: Array<number>): boolean {
  return result.every(val => val === result[0]);
}

export function isHalfJackpot(result: Array<number>): boolean {
  const map = new Map();
  result.forEach(r => {
    map.set(r, true);
  });
  return result.length === map.size;
}

export function isSmallPrize(result: Array<number>): boolean {
  for (let index = 0; index < result.length; index++) {
    if (result[index] === result[index + 1]) {
      return true;
    }
  }
  return false;
}