import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  team: z.string(),
  leader: z.string(),
  totalMembers: z.number(),
  pendingTasks: z.number(),
  teamPoints: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
