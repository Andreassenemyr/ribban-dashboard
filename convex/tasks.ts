import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
      title: v.string(),
      projectId: v.id('projects'),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const taskId = await ctx.db.insert("tasks", { title: args.title, projectId: args.projectId, status: 'Todo' });
      const document = await ctx.db.patch(args.projectId, {
        tasks: [taskId]
      });
  
      return document;
    }
});

export const getByStatus = query({
    args: { 
        status: v.string(),
        projectId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Not authenticated.');
        }

        const tasks = await ctx.db.query('tasks')
            .filter((q) => q.eq(q.field('status'), args.status))
            .filter((q) => q.eq(q.field('projectId'), args.projectId))
            .collect();

        return tasks;
    }
})

export const setStatus = mutation({
    args: { 
        taskId: v.id('tasks'), 
        status: v.string() 
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Not authenticated.');
        }

        const tasks = await ctx.db.patch(args.taskId, {
            status: args.status
        });
            
        return tasks;
    }
})


export const getById = query({
    args: { taskId: v.id('tasks') },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const task = await ctx.db.get(args.taskId);

        if (!task) {
            throw new Error('Task was not found.');
        }

        if (!identity) {
            throw new Error('Not authenticated.');
        }

        return task;
    }
})
