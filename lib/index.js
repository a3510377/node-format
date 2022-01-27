"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInit = void 0;
const defaultConfig = { start: { start: "", end: "" }, end: { start: "", end: "" } };
const safetySrc = (src) => src.replace(/[\-\(\)\[\]\.\*\^\\\:\+\{\}\,\$\<\>\"\'\|\?\<\!\=]/gm, src => `\\${src}`);
const isDict = (data) => {
    let string = "";
    try {
        string = JSON.stringify(data);
    }
    catch (_a) {
        return false;
    }
    finally {
        return !!string && string.startsWith("{") && string.endsWith("}");
    }
};
exports.formatInit = (_data) => {
    var _a, _b, _c, _d;
    let startStart = ((_a = _data === null || _data === void 0 ? void 0 : _data.start) === null || _a === void 0 ? void 0 : _a.start) || defaultConfig.start.start, startEnd = ((_b = _data === null || _data === void 0 ? void 0 : _data.start) === null || _b === void 0 ? void 0 : _b.end) || defaultConfig.start.end, endStart = ((_c = _data === null || _data === void 0 ? void 0 : _data.end) === null || _c === void 0 ? void 0 : _c.start) || defaultConfig.end.start, endEnd = ((_d = _data === null || _data === void 0 ? void 0 : _data.end) === null || _d === void 0 ? void 0 : _d.end) || defaultConfig.end.end;
    const useReg = new RegExp(`(?<!${safetySrc(startEnd)})${safetySrc(startStart)}(([$A-Za-z_][$A-Za-z0-9_]?)*|[0-9]*)${safetySrc(endStart)}(?<!${safetySrc(endEnd)})`);
    String.prototype.format = function (...data) {
        let _data = {}, all = 0;
        data.forEach(_ => {
            if (isDict(_))
                _data = Object.assign(Object.assign({}, _data), _);
            else
                _data[(all++).toString()] = _;
        });
        return this.toString()
            .replace(useReg, (_, src) => {
            if (src && src in _data)
                return _data[src];
            return _;
        })
            .replace(startEnd + startStart, startStart)
            .replace(endEnd + endStart, endStart);
    };
};
//# sourceMappingURL=index.js.map