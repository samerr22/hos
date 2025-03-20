import express from 'express';
import {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
} from '../controllers/inventry.controller.js';

const router = express.Router();

// Create a new inventory item
router.post('/inventoryc', createInventoryItem);

// Get all inventory items
router.get('/iget', getAllInventoryItems);

// Get inventory item by ID
router.get('/inventory/:id', getInventoryItemById);

// Update inventory item by ID
router.put('/Uinventory/:id', updateInventoryItem);

// Delete inventory item by ID
router.delete('/inventoryd/:id', deleteInventoryItem);

export default router;
