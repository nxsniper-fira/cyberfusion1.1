import React, { useState, useMemo } from "react";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, Snackbar, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography, InputLabel, FormControl
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTools, createTool, updateTool, deleteTool } from "./toolsApi";
import { useAuth } from "../auth/AuthContext"; // context with user info

const schema = yup.object({
  name: yup.string().required("Tool name required"),
  team: yup.string().required("Team required"),
  category: yup.string().required("Category required"),
  default_parameters: yup.string().test(
    "json", "Default parameters must be valid JSON",
    v => { try { JSON.parse(v || "{}"); return true; } catch { return false; } }
  ),
  ui_schema: yup.string().test(
    "json", "UI schema must be valid JSON",
    v => { try { JSON.parse(v || "{}"); return true; } catch { return false; } }
  ),
  description: yup.string(),
  icon: yup.string()
});

const teams = [
  "red_team", "blue_team", "white_hat", "gray_team", "black_hat"
];

export default function ToolsAdminPanel() {
  const queryClient = useQueryClient();
  const { user } = useAuth(); // user?.role === "admin" to show panel
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [snackbar, setSnackbar] = useState<{message:string, type:"success"|"error"}|null>(null);
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  // React Hook Form
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // Data
  const { data: tools = [], isLoading } = useQuery(["tools"], fetchTools);
  const createMut = useMutation(createTool, {
    onSuccess: () => {
      setSnackbar({message:"Tool added!",type:"success"});
      queryClient.invalidateQueries(["tools"]);
      setModalOpen(false);
    },
    onError: () => setSnackbar({message:"Failed to add tool",type:"error"})
  });
  const updateMut = useMutation(updateTool, {
    onSuccess: () => {
      setSnackbar({message:"Tool updated!",type:"success"});
      queryClient.invalidateQueries(["tools"]);
      setModalOpen(false);
    },
    onError: () => setSnackbar({message:"Failed to update tool",type:"error"})
  });
  const deleteMut = useMutation(deleteTool, {
    onSuccess: () => {
      setSnackbar({message:"Tool deleted!",type:"success"});
      queryClient.invalidateQueries(["tools"]);
    },
    onError: () => setSnackbar({message:"Failed to delete tool",type:"error"})
  });

  // Table Filter & Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const filtered = useMemo(() => tools.filter((t:any) =>
    (!search || t.name.toLowerCase().includes(search.toLowerCase())) &&
    (!teamFilter || t.team === teamFilter)
  ), [tools, search, teamFilter]);
  const pageCount = Math.ceil(filtered.length / pageSize);
  const pageRows = filtered.slice((page-1)*pageSize, page*pageSize);

  // Open modal: if editing, fill with tool data; else empty
  const openModal = (tool?: any) => {
    setEditing(tool || null);
    reset(tool ? {
      ...tool,
      default_parameters: JSON.stringify(tool.default_parameters || {}, null, 2),
      ui_schema: JSON.stringify(tool.ui_schema || {}, null, 2)
    } : {});
    setModalOpen(true);
  };

  // Submit (add or update)
  const onSubmit = (data:any) => {
    const toSend = {
      ...data,
      default_parameters: JSON.parse(data.default_parameters || "{}"),
      ui_schema: JSON.parse(data.ui_schema || "{}"),
      requires_scope: data.requires_scope ?? true,
    };
    if (editing) updateMut.mutate({ id: editing.id, ...toSend });
    else createMut.mutate(toSend);
  };

  // Only show for admins
  if (user?.role !== "admin") return null;

  return (
    <Box>
      <Typography variant="h5" sx={{mb:2}}>Tools Admin Panel</Typography>
      <Box sx={{display:"flex", gap:2, mb:2}}>
        <TextField
          size="small" label="Search" variant="outlined"
          value={search} onChange={e=>setSearch(e.target.value)}
        />
        <FormControl size="small">
          <InputLabel>Team</InputLabel>
          <Select
            value={teamFilter} label="Team"
            onChange={e=>setTeamFilter(e.target.value)}
            sx={{minWidth:130}}
          >
            <MenuItem value="">All</MenuItem>
            {teams.map(t=><MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
        <Button
          startIcon={<AddIcon/>}
          variant="contained"
          onClick={()=>openModal()}
          sx={{ml:"auto"}}
        >Add Tool</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageRows.map((tool:any) => (
              <TableRow key={tool.id}>
                <TableCell>{tool.name}</TableCell>
                <TableCell>{tool.team}</TableCell>
                <TableCell>{tool.category}</TableCell>
                <TableCell sx={{maxWidth:200,overflow:"auto"}}>{tool.description}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={()=>openModal(tool)}><EditIcon fontSize="inherit" /></IconButton>
                  <IconButton size="small" color="error" onClick={()=>deleteMut.mutate(tool.id)}><DeleteIcon fontSize="inherit" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Box sx={{mt:2}}>
        {Array.from({length:pageCount},(_,i)=>
          <Button
            key={i}
            size="small"
            variant={page===i+1?"contained":"outlined"}
            sx={{mr:1}}
            onClick={()=>setPage(i+1)}
          >{i+1}</Button>
        )}
      </Box>
      {/* Modal for Add/Edit */}
      <Dialog open={modalOpen} onClose={()=>setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edit Tool" : "Add Tool"}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller name="name" control={control} defaultValue="" render={({field}) =>
              <TextField {...field} label="Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message}/>
            }/>
            <Controller name="team" control={control} defaultValue="" render={({field}) =>
              <FormControl fullWidth margin="normal">
                <InputLabel>Team</InputLabel>
                <Select {...field} label="Team" error={!!errors.team}>
                  {teams.map(t=><MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </FormControl>
            }/>
            <Controller name="category" control={control} defaultValue="" render={({field}) =>
              <TextField {...field} label="Category" fullWidth margin="normal" error={!!errors.category} helperText={errors.category?.message}/>
            }/>
            <Controller name="icon" control={control} defaultValue="" render={({field}) =>
              <TextField {...field} label="Icon filename" fullWidth margin="normal"/>
            }/>
            <Controller name="description" control={control} defaultValue="" render={({field}) =>
              <TextField {...field} label="Description" fullWidth margin="normal" multiline rows={2}/>
            }/>
            <Controller name="default_parameters" control={control} defaultValue="{}" render={({field}) =>
              <TextField {...field} label="Default Parameters (JSON)" fullWidth margin="normal" multiline rows={2}
                error={!!errors.default_parameters} helperText={errors.default_parameters?.message}/>
            }/>
            <Controller name="ui_schema" control={control} defaultValue='{"fields":[{"name":"target","type":"text"}]}' render={({field}) =>
              <TextField {...field} label="UI Schema (JSON)" fullWidth margin="normal" multiline rows={2}
                error={!!errors.ui_schema} helperText={errors.ui_schema?.message}/>
            }/>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setModalOpen(false)} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained">{editing ? "Update" : "Add"}</Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Snackbar for feedback */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={()=>setSnackbar(null)}
        message={snackbar?.message}
        anchorOrigin={{vertical:"bottom",horizontal:"center"}}
        ContentProps={{ sx: { backgroundColor: snackbar?.type==="success"?"#4caf50":"#f44336" } }}
      />
    </Box>
  );
}