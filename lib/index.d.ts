declare type format = (this: string, ...data: Array<{
    [key: string]: string;
} | string>) => string;
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
export declare const formatInit: (_data?: config | undefined) => void;
