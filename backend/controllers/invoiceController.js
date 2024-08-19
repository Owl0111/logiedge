import { Prisma } from "../libs/prismaConnector.js"; 


export const createInvoice = async (req, res) => {
    const { customerId, items, totalCost } = req.body;
  
    try {
  
        const newInvoice = await Prisma.invoice.create({
            data: {
                CustomerID: customerId,
                Cost: totalCost,
                InvoiceItems: {
                    create: items.map(item => ({
                        Quantity: item.quantity,
                        GSTApplied: item.gstApplied,
                        ItemCost: item.cost,
                        ItemName: item.name
                    }))
                }
            },
            include: {
                CustMaster: true, 
                InvoiceItems: true
            }
        });

        res.status(201).json(newInvoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Prisma.invoice.findMany({
            include: {
                CustMaster: true,
                InvoiceItems: true,
            },
        });
        res.status(200).json(invoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await Prisma.invoice.findUnique({
            where: {
                InvoiceID:id
            },
            include:{
                CustMaster:true,
                InvoiceItems:true
            }
        });
        if (!invoice) {
            return res.status(404).send({
                success: false,
                message: "Customer not found"
            });
        }
        res.status(200).send( invoice );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching invoice",
            error: error.message || "Internal Server Error"
        });
    }
};