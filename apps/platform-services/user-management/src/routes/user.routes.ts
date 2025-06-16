import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticate);

// User profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

// Admin routes for user management
router.get('/', authorize(['admin', 'user-manager']), userController.getAllUsers);
router.get('/:id', authorize(['admin', 'user-manager']), userController.getUserById);
router.post('/:id/roles', authorize(['admin']), userController.assignRole);
router.delete('/:id/roles', authorize(['admin']), userController.removeRole);
router.patch('/:id/deactivate', authorize(['admin']), userController.deactivateUser);
router.patch('/:id/activate', authorize(['admin']), userController.activateUser);

export default router;
