  import business_divisions from "../controllers/business_division.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  business_divisions.create);

  // Retrieve all People
  router.get("/",  business_divisions.findAll);

  // Retrieve a single User with id
  router.get("/:id",  business_divisions.findOne);

  // Update a User with id
  router.put("/:id",  business_divisions.update);

  // Delete a User with id
  router.delete("/:id", business_divisions.delete);


  export default router;

