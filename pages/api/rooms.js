import prisma from "../../lib/prisma"

export default async function handler(req, res) {

    if (req.method === "POST") {
        const { name, type, capacity } = req.body;
    
        if (!name || !type || !capacity) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        try {
          const room = await prisma.room.create({
            data: { name, type, capacity },
          });
    
          res.status(201).json({ success: true, data: room });
        } catch (error) {
          console.error("Error creating room:", error);
          res.status(500).json({ error: "Error creating room" });
        }
      }
      else if(req.method === "GET") {

        const page = parseInt(req.query.page) || 1;
        const limit = 10; // number of rooms to fetch per page
        const skip = (page - 1) * limit;
  
    try {
      const totalRooms = await prisma.room.count();
      const rooms = await prisma.room.findMany({
        skip,
        take: limit,
      });
  
      res.status(200).json({
        rooms,
        totalPages: Math.ceil(totalRooms / limit),
      });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
    }
    
  }