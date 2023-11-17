import express from 'express';
import { UserController } from './controller.js';

const app = express();

const userController = new UserController();

app.post("/", (req, res) => userController.create(req, res));
app.get("/", (req, res) => userController.get(req, res));
app.get("/:id", (req, res) => userController.getId(req, res));
app.put("/:id", (req, res) => userController.update(req, res));
app.delete("/:id", (req, res) => userController.remove(req, res));


export const userRoutes = app;