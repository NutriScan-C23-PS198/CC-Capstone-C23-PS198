module.exports = function usersRouter(express, verifyToken, userController) {
  const router = express.Router();

  router.get('/', userController.getAllUsers);
  router.get('/:id', userController.getUserById);
  // router.post('/register', userController.createUser);
  // router.post('/login', userController.login);
  // router.post('/logout', userController.logout);
  router.delete('/', userController.deleteUserById);

  return router;
};
