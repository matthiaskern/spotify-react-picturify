"use strict";

// didn't write any of these myself
export function getData(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState>3 && xhr.status==200) {
      callback(xhr.responseText);
    }
  };
  xhr.send();
  return xhr;
}

export function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array){
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

// https://software.intel.com/en-us/html5/hub/blogs/exploring-color-matching-in-javascript
// Convert RGB to XYZ
function rgbToXyz(r, g, b) {
    var _r = (r / 255);
    var _g = (g / 255);
    var _b = (b / 255);

    if (_r > 0.04045) {
        _r = Math.pow(((_r + 0.055) / 1.055), 2.4);
    }
    else {
        _r = _r / 12.92;
    }

    if (_g > 0.04045) {
        _g = Math.pow(((_g + 0.055) / 1.055), 2.4);
    }
    else {
        _g = _g / 12.92;
    }

    if (_b > 0.04045) {
        _b = Math.pow(((_b + 0.055) / 1.055), 2.4);
    }
    else {
        _b = _b / 12.92;
    }

    _r = _r * 100;
    _g = _g * 100;
    _b = _b * 100;

    var X = _r * 0.4124 + _g * 0.3576 + _b * 0.1805;
    var Y = _r * 0.2126 + _g * 0.7152 + _b * 0.0722;
    var Z = _r * 0.0193 + _g * 0.1192 + _b * 0.9505;

    return [X, Y, Z];
}

// Convert XYZ to LAB
function xyzToLab(x, y, z) {
    var ref_X =  95.047;
    var ref_Y = 100.000;
    var ref_Z = 108.883;

    var _X = x / ref_X;
    var _Y = y / ref_Y;
    var _Z = z / ref_Z;

    if (_X > 0.008856) {
         _X = Math.pow(_X, (1/3));
    }
    else {
        _X = (7.787 * _X) + (16 / 116);
    }

    if (_Y > 0.008856) {
        _Y = Math.pow(_Y, (1/3));
    }
    else {
      _Y = (7.787 * _Y) + (16 / 116);
    }

    if (_Z > 0.008856) {
        _Z = Math.pow(_Z, (1/3));
    }
    else {
        _Z = (7.787 * _Z) + (16 / 116);
    }

    var CIE_L = (116 * _Y) - 16;
    var CIE_a = 500 * (_X - _Y);
    var CIE_b = 200 * (_Y - _Z);

    return [CIE_L, CIE_a, CIE_b];
}

// Finally, use cie1994 to get delta-e using LAB
function cie1994(x, y, isTextiles) {
    var x = {l: x[0], a: x[1], b: x[2]};
    var y = {l: y[0], a: y[1], b: y[2]};
    var k2;
    var k1;
    var kl;
    var kh = 1;
    var kc = 1;
    if (isTextiles) {
        k2 = 0.014;
        k1 = 0.048;
        kl = 2;
    }
    else {
        k2 = 0.015;
        k1 = 0.045;
        kl = 1;
    }

    var c1 = Math.sqrt(x.a * x.a + x.b * x.b);
    var c2 = Math.sqrt(y.a * y.a + y.b * y.b);

    var sh = 1 + k2 * c1;
    var sc = 1 + k1 * c1;
    var sl = 1;

    var da = x.a - y.a;
    var db = x.b - y.b;
    var dc = c1 - c2;

    var dl = x.l - y.l;
    var dh = Math.sqrt(da * da + db * db - dc * dc);

    return Math.sqrt(Math.pow((dl/(kl * sl)),2) + Math.pow((dc/(kc * sc)),2) + Math.pow((dh/(kh * sh)),2));
}

export function getClosestColor(vibrantColor, array){
  const vibrantXyz = rgbToXyz(vibrantColor[0], vibrantColor[1], vibrantColor[2]);
  const vibrantLab = xyzToLab(vibrantXyz[0], vibrantXyz[1], vibrantXyz[2]);

  const closest = array.reduce( (prev, curr) => {
    const prevXyz = rgbToXyz(prev.color[0], prev.color[1], prev.color[2]);
    const prevLab = xyzToLab(prevXyz[0], prevXyz[1], prevXyz[2]);
    const currXyz = rgbToXyz(curr.color[0], curr.color[1], curr.color[2]);
    const currLab = xyzToLab(currXyz[0], currXyz[1], currXyz[2]);

    const prevDiff = cie1994(prevLab, vibrantLab, false);
    const currDiff = cie1994(currLab, vibrantLab, false);

    return (currDiff > prevDiff) ? curr : prev;
  });

  return closest;
}
