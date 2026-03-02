import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";

const router = express.Router();

// Save a new order
router.post("/", async (req, res) => {
    try {
        const { userId, items, totalPrice, paymentMethod, deliveryAddress, notes } = req.body;

        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        // Convert userId string to ObjectId if it's a valid MongoDB ID
        let userObjectId;
        try {
            userObjectId = new mongoose.Types.ObjectId(userId);
        } catch (e) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const order = await Order.create({
            userId: userObjectId,
            items,
            totalPrice,
            paymentMethod: paymentMethod || "Cash on Delivery",
            deliveryAddress: deliveryAddress || "Home Delivery",
            notes: notes || "",
        });

        res.status(201).json({ message: "Order placed successfully!", order });
    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get order history for a user
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).sort({ orderDate: -1 });

        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific order by ID
router.get("/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update order status
router.put("/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully!", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an order (cancel)
router.delete("/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order cancelled successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
