  import businesses from "../controllers/business.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  businesses.create);

  // Retrieve all People
  router.get("/",  businesses.findAll);

  // Retrieve a single User with id
  router.get("/:id",  businesses.findOne);

  // Update a User with id
  router.put("/:id",  businesses.update);

  // Delete a User with id
  router.delete("/:id", businesses.delete);


  export default router;

