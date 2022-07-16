import { Router } from "express";
import MovieController from "./controllers/MovieController";
import RentController from "./controllers/RentController";
import UserController from "./controllers/UserController";

const routes = Router()

routes.post("/user", UserController.create)
routes.get("/users", UserController.findAllUsers)
routes.get("/user/:id", UserController.findOneUser)
routes.delete("/user/:id", UserController.deleteOneUser)
routes.put("/user/:id", UserController.updateOneUser)

routes.post("/movie", MovieController.create)
routes.get("/movies", MovieController.findAllMovies)
routes.get("/movie/:id", MovieController.findOneMovie)
routes.put("/movie/:id", MovieController.updateOneMovie)
routes.delete("/movie/:id", MovieController.deleteOneMovie)

routes.post("/rent", RentController.create)


export default routes