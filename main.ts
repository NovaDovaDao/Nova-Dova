import { serveSpa } from "https://deno.land/x/serve_spa@v0.3.0/mod.ts";

Deno.serve({}, async (request) => {
  return await serveSpa(request, {
    indexFallback: true,
    fsRoot: "dist",
  });
});
