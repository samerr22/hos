import InventoryItem from '../models/inventry.model.js';

// Create new inventory item
export const createInventoryItem = async (req, res, next) => {
  try {
    const { name, description, quantity, price,Expiredate,image } = req.body;
    const newItem = new InventoryItem({ name,Expiredate, description, quantity, price,image });
    await newItem.save();
    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    next(error);
  }
};

// Get all inventory items
export const getAllInventoryItems = async (req, res, next) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// Get single inventory item by id
export const getInventoryItemById = async (req, res, next) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// Update inventory item
export const updateInventoryItem = async (req, res, next) => {
  try {
    const {image,Expiredate, name, description, quantity, price } = req.body;
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { name, description,image,Expiredate, quantity, price },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    next(error);
  }
};

// Delete inventory item
export const deleteInventoryItem = async (req, res, next) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
