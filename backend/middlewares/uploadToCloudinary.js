import cloudinary from "cloudinary";
import { config } from "../configs/index.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (req, res, next) => {
  try {
    const uploadedImages = [];

    for (let file of req.files) {
      let imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      let result = await cloudinary.uploader.upload(imageBase64, {
        resource_type: "auto",
      });

      console.log(
        "Upload success for file:",
        file.originalname,
        result.secure_url
      );

      uploadedImages.push(result.secure_url);
    }

    req.body.imageUrls = uploadedImages;
    next();
  } catch (err) {
    res.sendStatus(500);
  }
};

export default uploadToCloudinary;
