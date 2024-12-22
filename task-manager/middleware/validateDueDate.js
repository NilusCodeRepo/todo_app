const validateDueDate = (req, res, next) => {
    const { dueDate } = req.body;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of the day
    const parsedDueDate = new Date(dueDate);
  
    if (parsedDueDate < today) {
      return res.status(400).json({ message: "Due date cannot be in the past or before today." });
    }
  
    next(); // Proceed to the next middleware or route handler
  };
  
  module.exports = validateDueDate;
