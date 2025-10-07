import { Queue, Worker } from "bullmq";
import { Tool, ToolJob } from "../models";
import { runToolInDocker } from "../utils/docker";
import { prisma } from "../prismaClient";

const queue = new Queue("tool-jobs", { connection: { host: "localhost", port: 6379 } });

export async function submitToolJob(userId: string, toolId: string, parameters: any) {
  const tool = await prisma.tool.findUnique({ where: { id: toolId } });
  if (!tool) throw new Error("Tool not found");
  // Validate parameters here...
  const job = await queue.add("run-tool", { userId, toolId, parameters });
  return job.id;
}

const worker = new Worker("tool-jobs", async job => {
  const { toolId, parameters } = job.data;
  const tool = await prisma.tool.findUnique({ where: { id: toolId } });
  const result = await runToolInDocker(tool, parameters);
  await prisma.toolJob.update({ where: { id: job.id }, data: { status: "finished", output: result } });
});