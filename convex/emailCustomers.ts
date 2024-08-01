import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("emailCustomers").collect();
  },
});

export const createEmailCustomer = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const foundEmail = await ctx.db
      .query("emailCustomers")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    if (foundEmail.length > 0) {
      return {
        error: true,
        message: "Email already exist!",
      };
    }
    const id = await ctx.db.insert("emailCustomers", { email: args.email });
    return {
      id,
    };
  },
});

export const isExistEmailCustomer = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailCustomers")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return result.length > 0;
  },
});
