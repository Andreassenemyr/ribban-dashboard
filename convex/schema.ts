import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    projects: defineTable({
        title: v.string(),
        userId: v.string(),
        color: v.string(),
    })
    .index('by_user', ['userId']),
})