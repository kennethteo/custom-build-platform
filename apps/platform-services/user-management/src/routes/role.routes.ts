import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const roleController = new RoleController();

// All routes require authentication and admin privileges
router.use(authenticate);
router.use(authorize(['admin']));

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.post('/:id/permissions', roleController.addPermission);
router.delete('/:id/permissions/:permissionId', roleController.removePermission);

export default router;
