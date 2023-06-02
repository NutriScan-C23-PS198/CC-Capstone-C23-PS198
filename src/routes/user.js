module.exports = function usersRouter(express, verifyToken, usersController) {
  const router = express.Router();

  router.get('/', usersController.getAllUsers);
  router.get('/:id', usersController.getUserById);
  router.post('/register', usersController.createUser);
  router.post('/login', usersController.login);
  router.delete('/:id', usersController.deleteUserById);

  return router;
};
