import { Queue } from "bullmq";
import { Tool, ToolJob } from "./models";
import { getToolById } from "./toolService";
const toolQueue = new Queue("tool-jobs");

export async function submitToolJob(userId: string, toolId: string, parameters: any) {
  const tool: Tool = await getToolById(toolId);
  // Validate parameters with Zod/Joi here
  if (!tool) throw new Error("Tool not found");
  // Add job to queue
  const job = await toolQueue.add("run-tool", { userId, toolId, parameters }, { attempts: 3 });
  return job.id;
}