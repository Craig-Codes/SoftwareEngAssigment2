async function dashboardNavigatorController(req, res) {
  return res.render("dashboard", {
    username: req.session.user.username,
    email: req.session.user.email,
  });
}

module.exports = { dashboardNavigatorController };
