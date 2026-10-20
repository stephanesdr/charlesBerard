import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const homeIntroMedia = defineType({
  name: "homeIntroMedia",
  title: "Intro media",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "kind",
      title: "Media type",
      type: "string",
      initialValue: "image",
      options: {
        layout: "radio",
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.kind === "video",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      hidden: ({ parent }) => parent?.kind !== "video",
    }),
    defineField({
      name: "poster",
      title: "Video poster",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.kind !== "video",
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describe the image or video when it carries information. Leave empty only for decorative media.",
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") return true;
      const hasVideo =
        value.video &&
        typeof value.video === "object" &&
        "asset" in value.video;
      const hasImage =
        value.image &&
        typeof value.image === "object" &&
        "asset" in value.image;

      if (value.kind === "video" && !hasVideo) {
        return "Select a video file.";
      }
      if (value.kind !== "video" && !hasImage) {
        return "Select an image.";
      }
      return true;
    }),
  preview: {
    select: {
      kind: "kind",
      image: "image",
      poster: "poster",
    },
    prepare({ kind, image, poster }) {
      return {
        title: kind === "video" ? "Intro video" : "Intro image",
        media: kind === "video" ? poster : image,
      };
    },
  },
});
