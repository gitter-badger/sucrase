#!/usr/bin/env node
import * as fs from "fs";

import * as sucrase from "../src/index";

function main(): void {
  console.log(
    "Profiling Sucrase on about 1 million LOC. Make sure you have Chrome DevTools for Node open.",
  );
  const code = fs.readFileSync("./benchmark/sample/sample.tsx").toString();
  // tslint:disable-next-line no-any
  (console as any).profile("Sucrase");
  for (let i = 0; i < 1000; i++) {
    sucrase.transform(code, {
      transforms: ["jsx", "imports", "typescript"],
    });
  }
  // tslint:disable-next-line no-any
  (console as any).profileEnd("Sucrase");
}

if (require.main === module) {
  main();
}
