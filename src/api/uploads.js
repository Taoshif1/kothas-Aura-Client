import apiClient from "./apiClient";

export const uploadProductImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  const { data } = await apiClient.post("/admin/uploads/images", formData, {
    headers: { "Content-Type": undefined },
    timeout: 60000,
  });
  return data.images.map((image) => image.url);
};
