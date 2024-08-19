import { Prisma } from "../libs/prismaConnector.js";


export const getItems = async (req, res) => {
    try {
      const data = await Prisma.itemMaster.findMany();
      res.status(200).send({success:true,data});
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  };
  
export const createItem = async (req, res) => {
    const { ItemName, Cost, Status } = req.body;
  
    try {
      const data = await Prisma.itemMaster.create({
        data: {
          ItemName,
          Cost,
          isActive:Status,
        },
      });
      res.status(201).json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
         success:false,
         error: 'Something went wrong' });
    }
  };
  