import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

class RentController{
    async create(request: Request, response: Response){
        const {userId, movieId} = request.body;
        const rent = await prisma.moviesOnUsers.create({
            data:{
                userId,
                movieId
            }
        })
        return response.json(rent)

    }
}

export default new RentController()