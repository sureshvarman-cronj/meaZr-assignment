/**
 * An helper object, holds necessary helper function
 * for the entire application
 */

const utils = {
  convertoHHMMSS: function(seconds) {
    let d = Number(seconds);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);
    return ((h < 10) ? "0" + h : h) + ":" + ((m < 10) ? "0" + m : m) + ":" + ((s < 10) ? "0" + s : s);
  }
}

export default utils;
