async function tasksNavigatorController(req, res) {
  return res.render("tasks", {
    username: req.session.user.username,
    email: req.session.user.email,
  });
}

module.exports = { tasksNavigatorController };
