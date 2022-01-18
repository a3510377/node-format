## nodejs package `monkey-format`

### 下載我

```cmd
npm install monkey-format
```

### 使用我

```js
import { formatInit } from "monkey-format";

formatInit();

console.log("{0} {1} {2}".format("a", "b", "c")); // -> "a b c"

console.log(
    "{a} {b} {c}".format({
        a: "0",
        b: "1",
        c: "2"
    })
); // -> "0 1 2"
```
