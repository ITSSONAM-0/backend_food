import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            id: Number,
            name: String,
            price: Number,
            quantity: Number,
            image: String,
            category: String,
        },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Confirmed", "Delivered", "Cancelled"] },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: Date,
    paymentMethod: { type: String, default: "Cash on Delivery" },
    deliveryAddress: String,
    notes: String,
});

export default mongoose.model("Order", orderSchema);
