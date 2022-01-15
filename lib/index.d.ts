declare type format = (
    this: string,
    ...data: Array<
        | {
              [key: string]: string;
          }
        | string
    >
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
export declare const formatInit: (_data?: config | undefined) => void;
