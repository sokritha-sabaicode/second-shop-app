const parseRequestBody = (fieldsToParse) => (req, res, next) => {
  try {
    fieldsToParse.forEach((field) => {
      if (req.body[field] && typeof req.body[field] === "string") {
        req.body[field] = JSON.parse(req.body[field]);
      }
    });
  } catch (error) {
    console.error("Failed to parse field:", error);
    return res.status(400).json({ error: "Invalid field format" });
  }

  next();
};

export default parseRequestBody;
