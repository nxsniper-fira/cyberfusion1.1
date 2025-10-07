import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShieldIcon from "@mui/icons-material/Security";
import RedHatIcon from "@mui/icons-material/Whatshot";
import ToolsIcon from "@mui/icons-material/Build";
import { getTheme } from "./theme";
import SettingsPanel from "./components/SettingsPanel";

function App() {
  // Theme settings (persisted)
  const defaultMode = localStorage.getItem("themeMode") || "light";
  const defaultAccent = localStorage.getItem("themeAccent") || "#1976d2";
  const [mode, setMode] = useState<"light"|"dark">(defaultMode as any);
  const [accent, setAccent] = useState(defaultAccent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => { localStorage.setItem("themeMode", mode); }, [mode]);
  useEffect(() => { localStorage.setItem("themeAccent", accent); }, [accent]);

  const theme = useMemo(() => getTheme(mode, accent), [mode, accent]);

  // Responsive drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState("dashboard");

  // Example panels (replace with your own)
  const panels = {
    dashboard: <Box p={2}><Typography variant="h4">Dashboard Overview</Typography></Box>,
    whitehat: <Box p={2}><Typography variant="h4">White Hat Panel</Typography></Box>,
    redhat: <Box p={2}><Typography variant="h4">Red Hat Panel</Typography></Box>,
    tools: <Box p={2}><Typography variant="h4">Tools Admin Panel</Typography></Box>,
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { key: "whitehat", label: "White Hat", icon: <ShieldIcon /> },
    { key: "redhat", label: "Red Hat", icon: <RedHatIcon /> },
    { key: "tools", label: "Tools Admin", icon: <ToolsIcon /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton sx={{ mr: 2 }} edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={()=>setTab("dashboard")}>
            <span style={{ fontWeight: 700, letterSpacing: 1 }}>CyberFusion</span>
          </Typography>
          <IconButton color="inherit" onClick={() => setSettingsOpen(true)}><SettingsIcon /></IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: 220,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 220, boxSizing: "border-box" }
        }}
      >
        <Toolbar />
        <List>
          {navItems.map(item => (
            <ListItem button key={item.key} selected={item.key === tab} onClick={()=>{setTab(item.key); setDrawerOpen(false);}}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <SettingsPanel open={settingsOpen} onClose={()=>setSettingsOpen(false)} mode={mode} setMode={setMode} accent={accent} setAccent={setAccent} />
      <Box
        sx={{
          ml: isMobile ? 0 : "220px",
          pt: 2,
          minHeight: "100vh",
          background: theme.palette.background.default
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          {panels[tab]}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;