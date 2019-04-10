"use strict";
exports.__esModule = true;
exports.getCurrentDateString = function () {
    var date = new Date();
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
};
