import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    projects: defineTable({
        title: v.string(),
        userId: v.string(),
        color: v.string(),
        tasks: v.array(v.id('tasks'))
    })
    .index('by_user', ['userId']),

    tasks: defineTable({
        title: v.string(),
        projectId: v.id("projects"),
        status: v.string(),
    })
})