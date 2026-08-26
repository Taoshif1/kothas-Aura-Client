// Future Cloudinary uploads belong behind this boundary. Phase 2 stores validated URLs only.
export const parseImageUrls = (value = "") => value.split(/\r?\n|,/).map((url) => url.trim()).filter(Boolean);
