import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/aarestation-card.ts",
  output: {
    file: "dist/aarestation-card.js",
    format: "es",
    inlineDynamicImports: true,
    sourcemap: dev ? true : false,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json", noEmitOnError: !dev }),
    !dev && terser({ format: { comments: false } }),
  ],
};
