import React, { useState } from "react";
import { Paper, Typography, Button, Box, Alert, TextField } from "@mui/material";

const TOOLS = [
  { key: "aircrack-ng", name: "Aircrack-ng", desc: "Wi-Fi cracking tool." },
  { key: "xsstrike", name: "XSStrike", desc: "XSS vulnerability scanner." },
  { key: "netcat", name: "Netcat", desc: "Network utility (shells, etc)." }
  // Add other tools as needed
];

export default function ToolControlPanel({ token }) {
  const [logs, setLogs] = useState({});
  const [running, setRunning] = useState({});

  const handleAction = async (tool, action) => {
    const resp = await fetch(`/api/toolsControl/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tool })
    });
    if (action === "start") setRunning(r => ({ ...r, [tool]: true }));
    if (action === "stop") setRunning(r => ({ ...r, [tool]: false }));
  };

  const handleLogs = async (tool) => {
    const resp = await fetch(`/api/toolsControl/logs/${tool}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await resp.json();
    setLogs(l => ({ ...l, [tool]: data.logs }));
  };

  return (
    <Box sx={{maxWidth:720,mx:"auto",mt:4}}>
      {TOOLS.map(t => (
        <Paper sx={{p:3,mb:4}} key={t.key}>
          <Typography variant="h6">{t.name}</Typography>
          <Typography variant="body2">{t.desc}</Typography>
          <Alert severity="warning" sx={{my:2}}>Command-line tool. Use responsibly in lab.</Alert>
          <Button variant="contained" color="success" onClick={()=>handleAction(t.key, "start")}>Start</Button>
          <Button variant="contained" color="error" onClick={()=>handleAction(t.key, "stop")} sx={{ml:2}}>Stop</Button>
          <Button variant="outlined" onClick={()=>handleLogs(t.key)} sx={{ml:2}}>View Logs</Button>
          {logs[t.key] && (<Box mt={2}><TextField multiline fullWidth minRows={6} value={logs[t.key]} /></Box>)}
        </Paper>
      ))}
    </Box>
  );
}