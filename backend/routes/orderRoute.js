import express from 'express'
import { placeOrder, userOrders, verifyOrder, listOrders, updateStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js'

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder)
orderRoute.post("/verify", verifyOrder)
orderRoute.post("/userorders", authMiddleware, userOrders)
orderRoute.get("/list", listOrders)
orderRoute.post("/status", updateStatus)

export default orderRoute;