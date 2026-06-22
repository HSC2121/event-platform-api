export const getSessionsStatus = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Sessions route available",
  });
};
