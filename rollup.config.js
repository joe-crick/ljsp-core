import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { enableDevPlugins } from "./enableDevPlugins.js";

export default [
  {
    input: "lib/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: false
      },
      { file: "dist/lib.cjs.js", format: "cjs" }
    ],
    plugins: [
      ...enableDevPlugins(),
      nodeResolve({
        preferBuiltins: true
      }),
      typescript(),
      babel({
        babelHelpers: "bundled",
        plugins: ["@babel/plugin-syntax-dynamic-import"],
        exclude: ["node_modules/**", "lib", "bin"]
      }),
      commonjs(),
      terser()
    ]
  }
];
