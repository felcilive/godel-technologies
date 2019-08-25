/* eslint-disable no-console */
export default class Utils {
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static mixArray(array) {
    const randomArray = array.slice();
    let j;
    let temp;
    const lengthArray = randomArray.length;
    for (let i = 0; i < lengthArray; i += 1) {
      j = Utils.getRandomInt(0, lengthArray);
      temp = randomArray[j];
      randomArray[j] = randomArray[i];
      randomArray[i] = temp;
    }

    return randomArray;
  }
}
