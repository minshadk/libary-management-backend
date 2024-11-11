const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  console.log("Auth middleware is called");
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET);

      // Fetch the user from the decoded token's user ID
      req.user = await User.findById(decoded._id).select("-password");

      // If user not found, return an error
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // If no token is found
    res.status(401).json({ message: "Not authorized, no token" });
    console.log("Not authorized, no token");
  }
};
