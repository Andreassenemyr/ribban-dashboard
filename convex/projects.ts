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
        const projects = await ctx.db
            .query('projects')
            .withIndex('by_user', (q) => 
                q
                    .eq('userId', userId)
            )
            .order('desc')
            .collect();
        
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
        if (project.userId !== userId) {
            throw new Error('Unauthorized to access this project.');
        }

        return project;
    }
})

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
        userId,
        color: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1,6),
        tasks: [],
      });
  
      return document;
    }
});