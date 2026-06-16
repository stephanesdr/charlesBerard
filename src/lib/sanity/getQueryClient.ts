import { draftMode } from "next/headers";
import { client } from "./client";
import { readToken } from "./token";

export async function getQueryClient() {
  const isDraft = (await draftMode()).isEnabled;

  if (isDraft && readToken) {
    return client.withConfig({
      token: readToken,
      perspective: "previewDrafts",
      useCdn: false,
      stega: {
        enabled: true,
        studioUrl: "/studio",
      },
    });
  }

  return client;
}
