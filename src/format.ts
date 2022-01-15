type format = (
  this: string,
  ...data: Array<{ [key: string]: string } | string>
) => string;
export interface config {
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

const mainRe = /{(?!{)(([$A-Za-z_][$A-Za-z0-9_]?)*|[0-9]*)}(?!})/gm;
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
export const formatInit = (data?: config) => {
  String.prototype.format = function (...data) {
    let _data: { [key: string]: any } = {},
      all = 0;

    data.forEach((_) => {
      if (isDict(_)) _data = { ..._data, ...(_ as Object) };
      else _data[(all++).toString()] = _ as string;
    });
    /* TODO */
    // new RegExp("{(?!{)(([$A-Za-z_][$A-Za-z0-9_]?)*|[0-9]*)}(?!})", "gm");
    return this.toString()
      .replace(mainRe, (_, src) => {
        if (src && src in _data) return _data[src];
        return _;
      })
      .replace("{{", "{")
      .replace("}}", "}");
  };
};
