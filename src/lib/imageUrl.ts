import { client } from "@/sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

export function urlFor(source?: SanityImageSource) {
  if (!source) return;

  return builder.image(source);
}
