import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, TextField, Button, Snackbar, Select, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTools, createTool, updateTool, deleteTool } from "./api";

const schema = yup.object({
  name: yup.string().required(),
  team: yup.string().required(),
  category: yup.string().required(),
  default_parameters: yup.string().test("json", "Must be valid JSON", v => {
    try { JSON.parse(v || "{}"); return true; } catch { return false; }
  }),
  ui_schema: yup.string().test("json", "Must be valid JSON", v => {
    try { JSON.parse(v || "{}"); return true; } catch { return false; }
  }),
});

export default function ToolsAdminPanel() {
  const queryClient = useQueryClient();
  const { data: tools } = useQuery(["tools"], fetchTools);
  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });

  const addMutation = useMutation(createTool, { onSuccess: () => queryClient.invalidateQueries(["tools"]) });
  // ...update, delete mutations

  return (
    <div>
      <Button variant="contained" onClick={() => reset()}>Add Tool</Button>
      {/* Modal dialog for form */}
      <Dialog open={/* open state */} onClose={/* close logic */}>
        <form onSubmit={handleSubmit(data => addMutation.mutate(data))}>
          <Controller name="name" control={control} render={({field,fieldState}) =>
            <TextField {...field} label="Tool Name" error={!!fieldState.error} helperText={fieldState.error?.message} />}
          />
          {/* ...other fields */}
          <Button type="submit">Save</Button>
        </form>
      </Dialog>
      {/* Table with pagination, sorting, filtering */}
      {/* Snackbar for notifications */}
      <Snackbar open={!!addMutation.isSuccess} message="Tool added!" />
    </div>
  );
}