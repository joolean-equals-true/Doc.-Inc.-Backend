import { Router } from "express";


import UserRoutes from "./user.routes.js";
import BusinessRoutes from "./business.routes.js";
import BusinessAccountRoutes from "./business_account.routes.js";
import BusinessDivisionRoutes from "./business_division.routes.js";
import LoggingRoutes from "./logging.routes.js";
import EmailRoutes from "./email.routes.js";
import AccountLinkRoutes from "./account_link.routes.js";
import DocumentRoutes from "./document.routes.js";
import ClientMembershipRoutes from "./client_membership.routes.js";
import RecipientRoutes from "./recipient.routes.js";

const router = Router();

router.use("/users", UserRoutes);
router.use("/businesses", BusinessRoutes);
router.use("/business_accounts", BusinessAccountRoutes);
router.use("/business_divisions", BusinessDivisionRoutes);
router.use("/loggings", LoggingRoutes);
router.use("/emails", EmailRoutes);
router.use("/account_links", AccountLinkRoutes);
router.use("/documents", DocumentRoutes);
router.use("/client_memberships", ClientMembershipRoutes);
router.use("/recipients", RecipientRoutes);


export default router;
