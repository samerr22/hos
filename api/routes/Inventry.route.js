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
router.post('/inventory', createInventoryItem);

// Get all inventory items
router.get('/inventory', getAllInventoryItems);

// Get inventory item by ID
router.get('/inventory/:id', getInventoryItemById);

// Update inventory item by ID
router.put('/inventory/:id', updateInventoryItem);

// Delete inventory item by ID
router.delete('/inventory/:id', deleteInventoryItem);

export default router;
