export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    error: "Resource not found",
  });
}