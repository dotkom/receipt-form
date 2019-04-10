"use strict";
exports.__esModule = true;
exports.positionText = function (x, y) { return ({
    x: x,
    y: y,
    size: 14,
    font: 'TimesRoman',
    colorRgb: [0, 0, 0]
}); };
var MAX_CHAR_LENGTH = 65;
/**
 * Converts a single line string to array of strings of maxCharLength
 */
exports.createMultiLine = function (str) {
    var multiLine = [str];
    while (multiLine[multiLine.length - 1].length > MAX_CHAR_LENGTH) {
        var lastString = multiLine[multiLine.length - 1];
        var endOfLastWord = lastString.slice(0, MAX_CHAR_LENGTH).lastIndexOf(' ');
        multiLine[multiLine.length - 1] = lastString.slice(0, endOfLastWord);
        multiLine.push(lastString.slice(endOfLastWord + 1));
    }
    return multiLine;
};
