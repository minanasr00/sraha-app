export const errorResponse = ({ error, res }) => {
  return res.status(error.statusCode ?? 500).json({
    status: "error",
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
