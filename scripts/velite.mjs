import { build } from "velite";

const watch = process.argv.includes("--watch");

await build({
  watch,
  clean: !watch,
});
