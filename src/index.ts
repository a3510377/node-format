type format = (this: string, ...data: Array<{ [key: string]: string } | string>) => string;

interface start_endConfig {
    /**設定開始
     * @type {{?string}}
     */
    start?: string;
    /**設定結尾
     * @type {{?string}}
     */
    end?: string;
}

export interface config {
    /**設定格式化開始
     * @type {?start_endConfig}
     */
    start?: start_endConfig;
    /**設定格式化結尾
     * @type {?start_endConfig}
     */
    end?: start_endConfig;
    [option: string]: unknown;
}

declare global {
    interface String {
        /**格式化器
        @example
        ```js
        "{awa}{0}".format({
            awa: "Hi"
        }, "b")  // Hi
        "{0}".format("Hi")  // Hib
        ```
        */
        format: format;
    }
}

export {};

const defaultConfig = { start: { start: "", end: "" }, end: { start: "", end: "" } };

const safetySrc = (src: string) =>
    src.replace(/[\-\(\)\[\]\.\*\^\\\:\+\{\}\,\$\<\>\"\'\|\?\<\!\=]/gm, src => `\\${src}`);

const isDict = (data: Object | string): boolean => {
    let string = "";
    try {
        string = JSON.stringify(data);
    } catch {
        return false;
    } finally {
        return !!string && string.startsWith("{") && string.endsWith("}");
    }
};
export const formatInit = (_data?: config) => {
    let startStart = _data?.start?.start || defaultConfig.start.start,
        startEnd = _data?.start?.end || defaultConfig.start.end,
        endStart = _data?.end?.start || defaultConfig.end.start,
        endEnd = _data?.end?.end || defaultConfig.end.end;

    const useReg = new RegExp(
        `(?<!${safetySrc(startEnd)})${safetySrc(startStart)}(([$A-Za-z_][$A-Za-z0-9_]?)*|[0-9]*)${safetySrc(
            endStart
        )}(?<!${safetySrc(endEnd)})`
    );
    String.prototype.format = function(...data) {
        let _data: { [key: string]: any } = {},
            all = 0;

        data.forEach(_ => {
            if (isDict(_)) _data = { ..._data, ...(_ as Object) };
            else _data[(all++).toString()] = _ as string;
        });

        return this.toString()
            .replace(useReg, (_, src) => {
                if (src && src in _data) return _data[src];
                return _;
            })
            .replace(startEnd + startStart, startStart)
            .replace(endEnd + endStart, endStart);
    };
};
