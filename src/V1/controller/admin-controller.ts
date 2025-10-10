import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import successResponse from "../utils/success-response";
import adminService from "../service/admin-service";

type AnalyticsRange = "daily" | "weekly" | "monthly" | "yearly";
type HistoryRange = "daily" | "weekly" | "monthly";

function normalizeAnalyticsRange(value: string | undefined): AnalyticsRange {
  const v = (value || "daily").toLowerCase();
  if (v === "daily" || v === "weekly" || v === "monthly" || v === "yearly") return v;
  return "daily";
}

function normalizeHistoryRange(value: string | undefined): HistoryRange {
  const v = (value || "daily").toLowerCase();
  if (v === "daily" || v === "weekly" || v === "monthly") return v;
  return "daily";
}

class AdminController {
  async analytics(req: Request, res: Response, next: NextFunction) {
    try {
      const range = normalizeAnalyticsRange(req.query.range as string | undefined);
      const result = await adminService.getAnalytics(range);
      res.json(successResponse("analytics", result));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("sorry server error ", 500));
    }
  }

  async salesHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = "50" } = req.query as Record<string, string>;
      const range = normalizeHistoryRange(req.query.range as string | undefined);
      const result = await adminService.getSalesHistory(range, parseInt(limit));
      res.json(successResponse("sales history", result));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("sorry server error ", 500));
    }
  }
}

export default new AdminController();


