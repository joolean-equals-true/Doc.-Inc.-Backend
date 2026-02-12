  import emails from "../controllers/email.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  emails.create);

  // Retrieve all People
  router.get("/",  emails.findAll);

  // Retrieve a single User with id
  router.get("/:id",  emails.findOne);

  // Update a User with id
  router.put("/:id",  emails.update);

  // Delete a User with id
  router.delete("/:id", emails.delete);


  export default router;

