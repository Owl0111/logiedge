import { getCustomers,createCustomer,getCustomerById } from "../controllers/customerController.js";
import { Router } from "express";
const customerRouter = Router()

customerRouter.get('/customer',getCustomers);
customerRouter.post('/customer',createCustomer);
customerRouter.get('/customer/:Id',getCustomerById);

export default customerRouter;