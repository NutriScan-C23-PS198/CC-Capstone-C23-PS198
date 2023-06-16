module.exports = function usersRouter(express, verifyToken, verifyAccess, userController) {
  const router = express.Router();

  router.get('/', verifyToken, verifyAccess, userController.getAllUsers);
  router.get('/:id', verifyToken, verifyAccess, userController.getUserById);
  // router.post('/register', userController.createUser);
  // router.post('/login', userController.login);
  // router.post('/logout', userController.logout);
  router.delete('/', verifyToken, verifyAccess, userController.deleteUserById);

  return router;
};
