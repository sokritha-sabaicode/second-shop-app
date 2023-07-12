import multer from "multer";

const storage = multer.memoryStorage(); // Store the file data in memory. Use multer.diskStorage for saving directly to disk.
const upload = multer({ storage: storage });

export default upload;