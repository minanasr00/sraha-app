export const wrongRouteResponse = (res) => {
  return res.status(404).json({ status: "error", message: "wrong route" });
};
