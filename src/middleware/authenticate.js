const authenticate = (req, _res, next) => {
  req.user = {
    id: "64cb65828c235b9ce19225af",
    name: "oshan",
    email: "oshan@gmail.com",

    role: "user",
    status: "pending",
  };
  next();
};

module.exports = authenticate;
