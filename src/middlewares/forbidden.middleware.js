export const forbiddenMiddleware = (req, res) => {
  res.status(401).json({
    error: "Authentication required",
  });
};
