module.exports = app => {
  // Register route
  app.post("/signup", app.controllers.userHandler.save);

  app.route("/users").all(app.controllers.userHandler.getUser);

  app
    .route("/users/:id")
    .get(app.controllers.userHandler.getUser)
    .put(app.controllers.userHandler.updateUser)
    .delete(app.controllers.userHandler.deleteUser);
};
