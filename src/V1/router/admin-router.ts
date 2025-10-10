import { Router, Request, Response, NextFunction } from "express";
import authentication from "../middleware/authentication";

const AdminRouter = Router();

// simple admin guard using role from JWT payload set by authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user as { role?: string };
  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ succes: false, message: "Forbidden: admin only" });
  }
  next();
}

import adminController from "../controller/admin-controller";

AdminRouter.get("/admin/analytics", authentication, requireAdmin, adminController.analytics);
AdminRouter.get("/admin/sales-history", authentication, requireAdmin, adminController.salesHistory);

export default AdminRouter;


