import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { enableDevPlugins } from "./enableDevPlugins.js";
import fs from "fs";
import path from "path";

// Custom plugin to copy and modify index.ts to dist directory
const copyIndexTs = () => {
  return {
    name: "copy-index-ts",
    writeBundle() {
      const source = fs.readFileSync("lib/index.ts", "utf-8");
      // Modify import paths to include ./lib/ prefix
      const modified = source.replace(/from "\.\/([^"]+)"/g, 'from "./lib/$1"');
      fs.writeFileSync("dist/index.ts", modified);
      console.log("Successfully copied and modified index.ts to dist directory");
    }
  };
};

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
      terser(),
      copyIndexTs()
    ]
  }
];
