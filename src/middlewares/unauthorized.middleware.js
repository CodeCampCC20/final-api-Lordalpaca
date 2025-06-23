export const unauthorizedMiddleware = (req, res) => {
  res.status(403).json({
    error: "You don't have permission to perform this action",
  });
};
