import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getSidebar = query({
    args: {

    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if (!identity) {
            throw new Error('Attempted to access without authentication.');
        }

        const userId = identity.subject;
        let projects = await ctx.db
            .query('projects')
            .order('desc')
            .collect();

        projects = projects.filter((project) => project.userId.includes(userId));
        
        return projects;
    }
});

export const getById = query({
    args: { projectId: v.id('projects') },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const project = await ctx.db.get(args.projectId);

        if (!project) {
            throw new Error('Project was not found.');
        }

        if (!identity) {
            throw new Error('Not authenticated.');
        }

        const userId = identity.subject;
        if (!project.userId.includes(userId)) {
            throw new Error('Unauthorized to access this project.');
        }

        return project;
    }
})

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    color: v.optional(v.string()),
    userId: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingProject = await ctx.db.get(args.id);

    if (!existingProject) {
      throw new Error("Not found");
    }

    if (!existingProject.userId.includes(userId)) {
      throw new Error("Unauthorized");
    }

    const project = await ctx.db.patch(args.id, {
      ...rest,
    });

    return project;
  },
});

export const create = mutation({
    args: {
      title: v.string(),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const userId = identity.subject;
  
      const document = await ctx.db.insert("projects", {
        title: args.title,
        userId: [userId],
        color: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1,6),
        tasks: [],
      });
  
      return document;
    }
});