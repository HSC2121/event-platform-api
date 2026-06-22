export const errorMiddleware = (error, req, res, next) => {
    console.error(error);
  
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Internal server error"
    });
  };