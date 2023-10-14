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
})