  import business_accounts from "../controllers/business_account.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  business_accounts.create);

  // Retrieve all People
  router.get("/",  business_accounts.findAll);

  // Retrieve a single User with id
  router.get("/:id",  business_accounts.findOne);

  // Update a User with id
  router.put("/:id",  business_accounts.update);

  // Delete a User with id
  router.delete("/:id", business_accounts.delete);


  export default router;

