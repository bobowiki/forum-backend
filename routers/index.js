function router(app) {
  const login = require("./login")
  const register = require("./register")
  app.use(login)
  app.use(register)
}

module.exports = router
