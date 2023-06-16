module.exports = function authRouter(express, verifyToken, authController) {
  const router = express.Router();

  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.post('/logout', verifyToken, authController.logout);

  return router;
};
