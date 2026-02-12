  import client_memberships from "../controllers/client_membership.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  client_memberships.create);

  // Retrieve all People
  router.get("/",  client_memberships.findAll);

  // Retrieve a single User with id
  router.get("/:id",  client_memberships.findOne);

  // Update a User with id
  router.put("/:id",  client_memberships.update);

  // Delete a User with id
  router.delete("/:id", client_memberships.delete);


  export default router;

