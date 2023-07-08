module.exports = (req, res, next) => {
  // check if there is a session and a session user
  if (req.session && req.session.user) {
    next();
  } else {
    res.render("../views/login", {
      error: "Log in to authenticate",
    });
  }
};
