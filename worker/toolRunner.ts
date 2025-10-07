import Docker from "dockerode";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const docker = new Docker({ socketPath: "/var/run/docker.sock" });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const TOOL_CONFIG: Record<string, { image: string; cmd: (params: any) => string[] }> = {
  nmap: {
    image: "instrumentisto/nmap",
    cmd: (params) => [params.target || "127.0.0.1"]
  },
  // Add more tools here
};

async function getNextJob() {
  const res = await pool.query(
    "SELECT * FROM tool_jobs WHERE status='queued' ORDER BY created_at LIMIT 1"
  );
  return res.rows[0];
}

async function updateJobStatus(id: string, status: string, output: string | null) {
  await pool.query(
    "UPDATE tool_jobs SET status=$1, output=$2, finished_at=NOW() WHERE id=$3",
    [status, output, id]
  );
}

async function runJob(job: any) {
  const { id, parameters, tool_id } = job;
  const toolRes = await pool.query("SELECT * FROM tools WHERE id=$1", [tool_id]);
  if (!toolRes.rows.length) return updateJobStatus(id, "failed", "Tool not found in DB");
  const tool = toolRes.rows[0];
  const config = TOOL_CONFIG[tool.name.toLowerCase()];
  if (!config) return updateJobStatus(id, "failed", "Tool not mapped");

  try {
    await updateJobStatus(id, "running", null);
    const container = await docker.createContainer({
      Image: config.image,
      Cmd: config.cmd(parameters),
      HostConfig: { AutoRemove: true }
    });
    await container.start();

    const stream = await container.logs({ stdout: true, stderr: true, follow: true });
    let output = "";
    stream.on("data", (chunk) => { output += chunk.toString(); });
    stream.on("end", async () => {
      await updateJobStatus(id, "finished", output);
    });
    // Wait for the container to finish
    await container.wait();
  } catch (err: any) {
    await updateJobStatus(id, "failed", err.message);
  }
}

async function workerLoop() {
  while (true) {
    const job = await getNextJob();
    if (job) await runJob(job);
    else await new Promise((r) => setTimeout(r, 2000));
  }
}

workerLoop();