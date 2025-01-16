import { serveSpa } from "https://deno.land/x/serve_spa/mod.ts";

Deno.serve({ port }, async (request) => {
  return await serveSpa(request, {
    indexFile: "index.html",
    rootDir: "dist",
    serveFromSubDir: false,
    spaPaths: ["/", "/chat", "/dashboard", "/agent-builder", "/coming-soon"],
    quiet: false
  });
});
