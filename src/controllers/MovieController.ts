import { PrismaClient } from "@prisma/client";
import { json, Request, Response } from "express";

const prisma = new PrismaClient()

class MovieController {

    async create(request: Request, response: Response) {
        try {
            const { title, duration, release_date } = request.body;

            const movieExists = await prisma.movie.findUnique({ where: { title } })

            if (movieExists) {

                return response.status(400).json({
                    error: "ERROR!",
                    message: "Movie already exists!"
                })
            }

            const movie = await prisma.movie.create({
                data:{
                    title,
                    duration,
                    release_date
                }
            })

            return response.json(movie)
        }catch(error){
            return response.status(500).send({
                error: "Registration failed!",
                message: error
            })
            

        }
    }

    async findAllMovies(request: Request, response: Response){
        try{
            const movies = await prisma.movie.findMany({
                orderBy:{
                    release_date:"desc"
                },
                include:{
                    users:{
                        select:{
                            user:true
                        }
                    }
                    
                }
            })
            return response.json(movies)
        }catch (error){
            return response.status(500).send({
                error: "Something was wrong!",
                message: error
            })
        }
    }

    async findOneMovie(request:Request, response: Response){
        try{
            const {id} = request.params
            const movie = await prisma.movie.findUnique({where:{id}})
            return response.json(movie)
        }catch(error){
            return response.send({
                error: "Something was wrong!",
                message: error
            })
        }
    }

    async updateOneMovie(request: Request, response: Response){
        try{
            const {id} = request.params
            const {title, duration, release_date} = request.body
            const movie = await prisma.movie.update({where: {id}, data:{title,duration,release_date}})
            return response.json(movie)
        }catch(error){
            return response.send({
                error: "Something was wrong!",
                message: error
            })
        }
    }

    async deleteOneMovie(request: Request, response: Response){
        try{
            const {id} = request.params
            const movie = await prisma.movie.delete({where:{id}})
            return response.json(movie)
        }catch(error){
            return response.json({
                error: "Something was wrong!",
                message: error
            })
        }
    }

}

export default new MovieController()