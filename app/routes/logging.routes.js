  import loggings from "../controllers/logging.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  loggings.create);

  // Retrieve all People
  router.get("/",  loggings.findAll);

  // Retrieve a single User with id
  router.get("/:id",  loggings.findOne);

  // Update a User with id
  router.put("/:id",  loggings.update);

  // Delete a User with id
  router.delete("/:id", loggings.delete);


  export default router;

