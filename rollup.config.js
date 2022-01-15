import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import flatDts from "rollup-plugin-flat-dts";
import sourcemaps from "rollup-plugin-sourcemaps";
import ts from "rollup-plugin-typescript2";

export default {
  input: "./src/format.ts",
  plugins: [commonjs(), ts(), nodeResolve(), sourcemaps()],
  output: {
    format: "esm",
    sourcemap: true,
    file: "format/index.js",
    plugins: [
      flatDts({
        compilerOptions: {
          declarationMap: true
        }
      })
    ]
  }
};