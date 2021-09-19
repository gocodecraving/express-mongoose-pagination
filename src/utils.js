"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUrl = exports.toNumeric = void 0;
function toNumeric(val) {
    return Boolean(val) && !isNaN(val);
}
exports.toNumeric = toNumeric;
function setUrl(req, queryString, withQueryString) {
    var _a, _b;
    return req.protocol + "://" + (req.get('host') + (((_b = (_a = req === null || req === void 0 ? void 0 : req.originalUrl) === null || _a === void 0 ? void 0 : _a.split('?')) === null || _b === void 0 ? void 0 : _b[0]) || '')) + (withQueryString ? "?" + queryString.toString() : '');
}
exports.setUrl = setUrl;
//# sourceMappingURL=utils.js.map