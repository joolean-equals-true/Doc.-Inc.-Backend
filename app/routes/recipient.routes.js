  import recipients from "../controllers/recipient.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  recipients.create);

  // Retrieve all People
  router.get("/",  recipients.findAll);

  // Retrieve a single User with id
  router.get("/:id",  recipients.findOne);

  // Update a User with id
  router.put("/:id",  recipients.update);

  // Delete a User with id
  router.delete("/:id", recipients.delete);


  export default router;

