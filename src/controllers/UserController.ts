import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    try {
      const userExists = await prisma.user.findUnique({ where: { email } });

      if (userExists) {
        return response.status(400).json({
          error: "Deu erro!",
          message: "User Already Exists!",
        });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      return response.json(user);
    } catch (error) {
      return response.status(500).send({
        error: "Registration Failed",
        message: error,
      });
    }
  }

  async findAllUsers(request: Request, response: Response) {
    try {
      const users = await prisma.user.findMany();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({
        error: "Something wrong happened, try again!",
        message: error,
      });
    }
  }

  async findOneUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({ where: { id } });
      return response.json(user);
    } catch (error) {
      return response.json({ error });
    }
  }

  async updateOneUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, email } = request.body;
      const user = await prisma.user.update({
        where: { id },
        data: { name, email },
      });
      return response.json(user);
    } catch (error) {
      return response.json({ error });
    }
  }

  async deleteOneUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.delete({ where: { id } });
      return response.json(user);
    } catch (error) {
      return response.json({ error });
    }
  }
}

export default new UserController();
