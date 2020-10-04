/**
 * @param {string} s
 * @return {number}
 */
const maxPower = (s) => {
  let max = 1;
  let sum = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      sum++;
      if (sum > max) {
        max = sum;
      }
    } else {
      sum = 1;
    }
    console.log({ letter: s[i], sum, max });
  }
  return max;
};

console.log(maxPower('aaabbbccceeeeedde'));
