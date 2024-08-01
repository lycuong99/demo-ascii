import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  emailCustomers: defineTable({
    email: v.string(),
  }),
});