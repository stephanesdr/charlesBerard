import { client } from "@/lib/sanity/client";
import { readToken } from "@/lib/sanity/token";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

const draftHandler = readToken
  ? defineEnableDraftMode({
      client: client.withConfig({ token: readToken }),
    })
  : null;

export async function GET(request: Request) {
  if (!draftHandler) {
    return new Response(
      "SANITY_API_READ_TOKEN is not configured on the server.",
      { status: 503 },
    );
  }

  return draftHandler.GET(request);
}
