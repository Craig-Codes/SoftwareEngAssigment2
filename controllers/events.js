async function eventsNavigatorController(req, res) {
  return res.render("events", {
    username: req.session.user.username,
    email: req.session.user.email,
  });
}

module.exports = { eventsNavigatorController };
