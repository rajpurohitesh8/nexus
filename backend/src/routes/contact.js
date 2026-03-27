import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";

const router = Router();

// Lightweight CSRF guard for JSON API: reject requests that don't send
// Content-Type: application/json (browsers can't send cross-origin JSON
// without a preflight, which CORS already blocks).
router.post("/contact", async (req, res) => {
  const contentType = req.headers["content-type"] ?? "";
  if (!contentType.includes("application/json")) {
    res.status(415).json({ error: "Unsupported Media Type" });
    return;
  }

  const parseResult = SubmitContactBody.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request data" });
    return;
  }

  try {
    await db.insert(contactsTable).values({
      name: parseResult.data.name,
      email: parseResult.data.email,
      company: parseResult.data.company ?? null,
      message: parseResult.data.message,
      budget: parseResult.data.budget ?? null,
    });

    res.json({
      success: true,
      message:
        "Thank you for reaching out. We will contact you within 24 hours.",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

export default router;
