import React, { useState } from "react";
import { Paper, Typography, Button, Box, Alert } from "@mui/material";

const PHISH_TOOLS = [
  { key: "camphish", name: "CamPhish", desc: "Webcam phishing simulation.", port: 4444 },
  { key: "seeker", name: "Seeker", desc: "Location phishing simulation.", port: 8081 },
  { key: "custom_info_phish", name: "Info Phish", desc: "Info-gathering phishing page.", port: 8082 }
];

export default function BlackHatPanel({ token }: { token: string }) {
  const [links, setLinks] = useState<{[k:string]:string}>({});

  const handleLaunch = async (toolKey: string, port: number) => {
    const resp = await fetch("/api/blackhat/launch", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tool: toolKey })
    });
    const data = await resp.json();
    setLinks(l => ({ ...l, [toolKey]: data.link || `http://${window.location.hostname}:${port}` }));
  };

  return (
    <Box sx={{maxWidth:720,mx:"auto",mt:4}}>
      {PHISH_TOOLS.map(t => (
        <Paper sx={{p:3,mb:4}} key={t.key}>
          <Typography variant="h6">{t.name}</Typography>
          <Typography variant="body2">{t.desc}</Typography>
          <Alert severity="error" sx={{my:2}}>
            FOR AUTHORIZED LAB USE ONLY. All activity is logged.
          </Alert>
          <Button variant="contained" color="error" onClick={()=>handleLaunch(t.key, t.port)}>
            Launch {t.name}
          </Button>
          {links[t.key] && (
            <Box mt={2}>
              <Typography>
                Phishing Link: <a href={links[t.key]} target="_blank" rel="noopener noreferrer">{links[t.key]}</a>
              </Typography>
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
}