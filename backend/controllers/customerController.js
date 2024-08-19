import { Prisma } from "../libs/prismaConnector.js";


export const createCustomer = async (req, res) => {
    try{
        const {PAN,Address,GST,status,Name} = req.body;
        if (PAN.length !=10){
            return res.status(400).send({
                success: false,
                message: "Invalid PAN number"
            });
        }
        console.log(GST)
        if (GST && GST.length!=0 && GST.length !=15){
            return res.status(400).send({
                success: false,
                message: "Invalid GST number"
            });
        }

        const data = await Prisma.custMaster.create(
            {
                data: {
                    PAN,
                    Address,
                    Name,
                    isActive:status,
                    ...(GST!==undefined && {GST})
                }
            }
        )
        res.status(201).send(
            {
                success: true,
                data
            }
        );
    }   
    catch (error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in creating customer",
            error: error.message || "Internal Server Error",
        });
    }

}

export const getCustomers = async (req,res) => {
    try{
        const data = await Prisma.custMaster.findMany();
        res.status(200).send({
            success: true,
            data
        }
    );
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in reading customer data",
            error: error.message || "Internal Server Error",
        });
    }
}


export const getCustomerById = async (req, res) => {
    const { Id } = req.params;
    try {
        const customer = await Prisma.custMaster.findUnique({
            where: {
                Id
            }
        });
        if (!customer) {
            return res.status(404).send({
                success: false,
                message: "Customer not found"
            });
        }
        res.status(200).send({
            success: true,
            data: customer
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching customer",
            error: error.message || "Internal Server Error"
        });
    }
};