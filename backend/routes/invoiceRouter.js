import { createInvoice,getInvoices, getInvoiceById } from "../controllers/invoiceController.js";
import { Router } from "express";
const invoiceRouter  =  Router()

invoiceRouter.get('/invoice',getInvoices);
invoiceRouter.get('/invoice/:id',getInvoiceById);
invoiceRouter.post('/invoice',createInvoice);

export default invoiceRouter;