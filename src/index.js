"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function default_1(schema) {
    schema.query.paginate = function (req, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var firstPageUrl, lastPageUrl, params, page, perPage, queryString, total, totalPages, pages, data, pager, _sno, i;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        firstPageUrl = null;
                        lastPageUrl = null;
                        params = __assign({}, req.query);
                        page = (0, utils_1.toNumeric)(params === null || params === void 0 ? void 0 : params.page) ? +(params === null || params === void 0 ? void 0 : params.page) : 1;
                        perPage = (0, utils_1.toNumeric)(params === null || params === void 0 ? void 0 : params.perPage) ? +(params === null || params === void 0 ? void 0 : params.perPage) : 15;
                        !(options === null || options === void 0 ? void 0 : options.withQueryString) && (params = { page: page, perPage: perPage });
                        queryString = new URLSearchParams(params);
                        return [4 /*yield*/, this.model.countDocuments(this.getQuery())];
                    case 1:
                        total = _k.sent();
                        totalPages = Math.ceil(total / perPage);
                        pages = Array(totalPages).fill(1).map(function (_, index) {
                            var page = index + 1;
                            var nextPageUrl = null;
                            var prevPageUrl = null;
                            if (page + 1 <= totalPages) {
                                var incPage = (page + 1).toString();
                                queryString.set('page', incPage);
                                nextPageUrl = (0, utils_1.setUrl)(req, queryString, true);
                            }
                            if (index > 0) {
                                var decPage = (page - 1).toString();
                                queryString.set('page', decPage);
                                prevPageUrl = (0, utils_1.setUrl)(req, queryString, true);
                            }
                            return { page: page, nextPageUrl: nextPageUrl, prevPageUrl: prevPageUrl };
                        });
                        if (pages[0]) {
                            queryString.set('page', (_b = (_a = pages[0]) === null || _a === void 0 ? void 0 : _a.page) === null || _b === void 0 ? void 0 : _b.toString());
                            firstPageUrl = (0, utils_1.setUrl)(req, queryString, true);
                        }
                        if (pages === null || pages === void 0 ? void 0 : pages[(pages === null || pages === void 0 ? void 0 : pages.length) - 1]) {
                            queryString.set('page', (_d = (_c = pages[pages.length - 1]) === null || _c === void 0 ? void 0 : _c.page) === null || _d === void 0 ? void 0 : _d.toString());
                            lastPageUrl = (0, utils_1.setUrl)(req, queryString, true);
                        }
                        return [4 /*yield*/, this.model.find(this.getQuery(), (_e = this.projection()) !== null && _e !== void 0 ? _e : { _: 0 })
                                .sort((_g = (_f = this.options) === null || _f === void 0 ? void 0 : _f.sort) !== null && _g !== void 0 ? _g : {})
                                .skip((perPage ? +perPage : 15) * ((page !== null && page !== void 0 ? page : 1) - 1))
                                .limit(perPage ? +perPage : 15)];
                    case 2:
                        data = _k.sent();
                        pager = pages === null || pages === void 0 ? void 0 : pages.find(function (p) { return p.page == page; });
                        if (options === null || options === void 0 ? void 0 : options._sno) {
                            _sno = (data === null || data === void 0 ? void 0 : data.length) ? (page > 1 ? (perPage * (page - 1)) + 1 : 1) : 0;
                            // const to: number = (from - 1) + data?.length
                            for (i = 0; i < data.length; i++) {
                                data[i] = __assign(__assign({}, data[i].toObject()), { _sno: _sno });
                                _sno++;
                            }
                        }
                        return [2 /*return*/, {
                                currentPage: +page,
                                data: data,
                                firstPageUrl: firstPageUrl,
                                lastPageUrl: lastPageUrl,
                                lastPage: totalPages,
                                nextPageUrl: (_h = pager === null || pager === void 0 ? void 0 : pager.nextPageUrl) !== null && _h !== void 0 ? _h : null,
                                prevPageUrl: (_j = pager === null || pager === void 0 ? void 0 : pager.prevPageUrl) !== null && _j !== void 0 ? _j : null,
                                path: (0, utils_1.setUrl)(req, queryString, false),
                                perPage: +perPage,
                                total: total
                            }];
                }
            });
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map