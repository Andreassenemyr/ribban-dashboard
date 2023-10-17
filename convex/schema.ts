import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    projects: defineTable({
        title: v.string(),
        userId: v.array(v.string()),
        color: v.string(),
        tasks: v.array(v.id('tasks'))
    })
    .index('by_user', ['userId']),

    tasks: defineTable({
        title: v.string(),
        projectId: v.id("projects"),
        status: v.string(),
        assignedTo: v.array(v.string()),
        tags: v.array(v.string()),
        deadline: v.optional(v.number()),
    }),

    users: defineTable({
        name: v.string(),
        userId: v.string(),
        tokenIdentifier: v.string(),
    })
    .index('by_token', ['tokenIdentifier'])
})