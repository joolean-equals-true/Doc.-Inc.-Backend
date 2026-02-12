  import documents from "../controllers/document.controller.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/",  documents.create);

  // Retrieve all People
  router.get("/",  documents.findAll);

  // Retrieve a single User with id
  router.get("/:id",  documents.findOne);

  // Update a User with id
  router.put("/:id",  documents.update);

  // Delete a User with id
  router.delete("/:id", documents.delete);


  export default router;

