import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
      title: v.string(),
      projectId: v.id('projects'),
      deadline: v.number()
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const taskId = await ctx.db.insert("tasks", { title: args.title, projectId: args.projectId, status: 'Todo', assignedTo: [identity.subject], tags: [], deadline: args.deadline });
      const prevTasks = await ctx.db.get(args.projectId);
      const document = await ctx.db.patch(args.projectId, {
        tasks: [...(prevTasks?.tasks || []), taskId]
      });
  
      return document;
    }
});

export const getByProject = query({
    args: { 
        projectId: v.string(),
        userId: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if (!identity) {
            throw new Error('Not authenticated.');
        }

        let tasks = await ctx.db.query('tasks')
            .filter((q) => q.eq(q.field('projectId'), args.projectId))
            .collect()

        if (args.userId) {
            tasks = tasks.filter((task) => task.assignedTo.includes(identity.subject));
        }

        return tasks;
    }
})

export const getByStatus = query({
    args: { 
        projectId: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if (!identity) {
            throw new Error('Not authenticated.');
        }

        let tasks = await ctx.db.query('tasks')
            .filter((q) => q.eq(q.field('projectId'), args.projectId))
            .filter((q) => q.eq(q.field('status'), args.status))
            .collect()

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

export const update = mutation({
    args: {
      id: v.id("tasks"),
      title: v.optional(v.string()),
      status: v.optional(v.string()),
      assignedTo: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Unauthenticated");
      }
    
      const { id, ...rest } = args;
  
      const existingTask = await ctx.db.get(args.id);
  
      if (!existingTask) {
        throw new Error("Not found");
      }
  
      const task = await ctx.db.patch(args.id, {
        ...rest,
      });

      return task;
    },
  });

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
