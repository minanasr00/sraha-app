export const successResponse = async ({
  res,
  statusCode = 200,
  message = undefined,
  data = undefined,
}) => {
  return res.status(statusCode).json({ status: "success", message, data });
};
