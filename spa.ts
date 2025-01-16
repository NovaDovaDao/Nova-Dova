import { serveSpa } from "https://deno.land/x/serve_spa/mod.ts";

Deno.serve({ port }, async (request) => {
  return await serveSpa(request, {
    indexFallback: true,
  });
});
