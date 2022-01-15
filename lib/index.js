"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInit = void 0;
const mainRe = /{(?!{)(([$A-Za-z_][$A-Za-z0-9_]?)*|[0-9]*)}(?!})/gm;
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
    String.prototype.format = function (...data) {
        let _data = {}, all = 0;
        data.forEach(_ => {
            if (isDict(_))
                _data = Object.assign(Object.assign({}, _data), _);
            else
                _data[(all++).toString()] = _;
        });
        /* TODO */
        // new RegExp("{(?!{)(([$A-Za-z_][$A-Za-z0-9_]?)*|[0-9]*)}(?!})", "gm");
        return this.toString()
            .replace(mainRe, (_, src) => {
            if (src && src in _data)
                return _data[src];
            return _;
        })
            .replace("{{", "{")
            .replace("}}", "}");
    };
};
//# sourceMappingURL=index.js.map