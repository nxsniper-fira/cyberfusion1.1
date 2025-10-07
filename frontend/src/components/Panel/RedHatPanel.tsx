import React, { useEffect, useState } from "react";
import { API_URL } from "../../App";

const RedHatPanel = ({ token }: { token: string }) => {
  const [tools, setTools] = useState<any[]>([]);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [output, setOutput] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/tools?team=red_team`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(tools => {
        setTools(tools);
        setSelectedTool(tools.find((t: any) => t.name.toLowerCase() === "nmap") || tools[0]);
      });
  }, [token]);

  const handleField = (name: string, value: any) => {
    setForm({ ...form, [name]: value });
  };

  const handleExecute = async () => {
    setOutput("Running...");
    setJobId(null);
    const resp = await fetch(`${API_URL}/tools/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        toolId: selectedTool.id,
        parameters: form
      }),
    });
    const data = await resp.json();
    setJobId(data.jobId);
  };

  // Poll for output
  useEffect(() => {
    if (!jobId) return;
    setOutput("Waiting for output...");
    const interval = setInterval(async () => {
      const resp = await fetch(`${API_URL}/tools/jobs/${jobId}/output`);
      const data = await resp.json();
      setOutput(data.output || "Waiting...");
      if (data.status === "finished" || data.status === "failed") clearInterval(interval);
    }, 2000);
    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <section>
      <h2>Red Hat Panel (Tool Execution)</h2>
      <div>
        <label>Target (IP or hostname): </label>
        <input value={form.target || ""} onChange={e => handleField("target", e.target.value)} />
        <button onClick={handleExecute} disabled={!form.target}>Run Nmap</button>
      </div>
      <pre style={{background:"#eee",padding:8}}>{output}</pre>
    </section>
  );
};

export default RedHatPanel;