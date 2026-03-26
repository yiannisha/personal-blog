import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import { isFeedAdminEnabled } from "@/lib/feed-admin-access";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { slugify, writeUploadedFile } = require("../../../lib/feed-admin.js");

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|m4v|ogg)$/i.test(url);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isFeedAdminEnabled()) {
    return res.status(404).json({ error: "Not found" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  try {
    const [fields, files] = await form.parse(req);
    const slugInput = Array.isArray(fields.slug) ? fields.slug[0] : fields.slug;
    const slug = slugify(typeof slugInput === "string" ? slugInput : "feed-media");
    const uploadedFiles = Array.isArray(files.files)
      ? files.files
      : files.files
        ? [files.files]
        : [];

    const mediaUrls = uploadedFiles.map((file) =>
      writeUploadedFile(file.filepath, file.originalFilename || "upload", slug),
    );

    const assets = mediaUrls.map((url) => ({
      url,
      embedCode: isVideoUrl(url)
        ? `<video controls src="${url}"></video>`
        : `![media](${url})`,
    }));

    return res.status(200).json({ assets });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return res.status(400).json({ error: message });
  }
}
