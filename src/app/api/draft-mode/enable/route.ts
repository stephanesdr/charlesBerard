import { client } from "@/lib/sanity/client";
import { readToken } from "@/lib/sanity/token";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
