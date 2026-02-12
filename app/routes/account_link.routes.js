  import account_links from "../controllers/account_link.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  account_links.create);

  // Retrieve all People
  router.get("/",  account_links.findAll);

  // Retrieve a single User with id
  router.get("/:id",  account_links.findOne);

  // Update a User with id
  router.put("/:id",  account_links.update);

  // Delete a User with id
  router.delete("/:id", account_links.delete);


  export default router;

