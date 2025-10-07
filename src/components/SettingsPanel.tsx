import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel, TextField } from "@mui/material";

export default function SettingsPanel({ open, onClose, mode, setMode, accent, setAccent }: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customise Dashboard</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Switch checked={mode === "dark"} onChange={() => setMode((m: string) => m === "dark" ? "light" : "dark")} />
          }
          label="Dark Mode"
        />
        <TextField
          label="Accent Color"
          type="color"
          value={accent}
          onChange={e => setAccent(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}