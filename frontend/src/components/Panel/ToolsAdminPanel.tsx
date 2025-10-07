import React, { useEffect, useState } from "react";
import "./ToolsAdminPanel.css"; // for modal styling

type Tool = {
  id?: string;
  name: string;
  description: string;
  team: string;
  category: string;
  default_parameters?: string;
  requires_scope?: boolean;
  ui_schema?: string;
  icon?: string;
};

const emptyTool: Tool = {
  name: "",
  description: "",
  team: "",
  category: "",
  default_parameters: "{}",
  requires_scope: true,
  ui_schema: '{"fields":[{"name":"target","type":"text"}]}',
  icon: ""
};

const validateTool = (tool: Tool): string | null => {
  if (!tool.name.trim()) return "Tool name is required";
  if (!tool.team.trim()) return "Team is required";
  if (!tool.category.trim()) return "Category is required";
  try { JSON.parse(tool.default_parameters || "{}"); } catch { return "Default parameters must be valid JSON"; }
  try { JSON.parse(tool.ui_schema || "{}"); } catch { return "UI schema must be valid JSON"; }
  return null;
};

const ToolsAdminPanel = ({ token }: { token: string }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [form, setForm] = useState<Tool>(emptyTool);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pagination & Search
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchTools = () => {
    fetch(`/api/v1/tools`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setTools);
  };

  useEffect(() => { fetchTools(); }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setError(null); setSuccess(null);
  };

  const handleModalOpen = (tool?: Tool) => {
    setForm(tool ? {
      ...tool,
      default_parameters: JSON.stringify(tool.default_parameters || {}),
      ui_schema: JSON.stringify(tool.ui_schema || {})
    } : emptyTool);
    setEditingId(tool?.id || null);
    setError(null); setSuccess(null); setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false); setEditingId(null); setForm(emptyTool);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null);
    const validation = validateTool(form);
    if (validation) { setError(validation); return; }
    setLoading(true);
    const url = editingId ? `/api/v1/tools/${editingId}` : `/api/v1/tools`;
    const method = editingId ? "PUT" : "POST";
    try {
      const body = {
        ...form,
        default_parameters: form.default_parameters ? JSON.parse(form.default_parameters) : {},
        ui_schema: form.ui_schema ? JSON.parse(form.ui_schema) : {}
      };
      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (!resp.ok) throw new Error(await resp.text());
      setSuccess(editingId ? "Tool updated!" : "Tool added!");
      fetchTools(); handleModalClose();
    } catch (err: any) { setError(err.message || "Error saving tool"); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this tool?")) return;
    setLoading(true); setError(null); setSuccess(null);
    try {
      const resp = await fetch(`/api/v1/tools/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      if (!resp.ok) throw new Error(await resp.text());
      setSuccess("Tool deleted!"); fetchTools();
    } catch (err: any) { setError(err.message || "Error deleting tool"); }
    setLoading(false);
  };

  // UI: search, filter, pagination
  const filtered = tools.filter(t =>
    (!search || t.name.toLowerCase().includes(search.toLowerCase())) &&
    (!teamFilter || t.team === teamFilter) &&
    (!categoryFilter || t.category === categoryFilter)
  );
  const pageCount = Math.ceil(filtered.length / pageSize);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Collect unique teams and categories for dropdowns
  const teams = Array.from(new Set(tools.map(t => t.team))).sort();
  const categories = Array.from(new Set(tools.map(t => t.category))).sort();

  return (
    <section>
      <h2>Tools Admin Panel</h2>

      {/* Search & Filter */}
      <div style={{marginBottom:10}}>
        <input placeholder="Search Name..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)}>
          <option value="">All Teams</option>
          {teams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={() => handleModalOpen()} style={{marginLeft:10}}>+ Add Tool</button>
      </div>

      {/* Notifications */}
      {error && <div className="cf-toast cf-toast-error">{error}</div>}
      {success && <div className="cf-toast cf-toast-success">{success}</div>}
      {loading && <div className="cf-toast cf-toast-info">Loading...</div>}

      {/* Tools Table */}
      <table className="cf-table">
        <thead>
          <tr>
            <th>Name</th><th>Team</th><th>Category</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map(tool => (
            <tr key={tool.id}>
              <td>{tool.name}</td>
              <td>{tool.team}</td>
              <td>{tool.category}</td>
              <td style={{maxWidth:200,overflow:"auto"}}>{tool.description}</td>
              <td>
                <button onClick={() => handleModalOpen(tool)} className="cf-btn-edit">Edit</button>
                <button onClick={() => handleDelete(tool.id!)} className="cf-btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="cf-pagination">
        {Array.from({length: pageCount}, (_,i) =>
          <button key={i} disabled={page===i+1} onClick={() => setPage(i+1)}>{i+1}</button>
        )}
      </div>

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="cf-modal-bg" onClick={handleModalClose}>
          <div className="cf-modal" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h3>{editingId ? "Edit Tool" : "Add New Tool"}</h3>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Tool Name" required autoFocus />
              <input name="team" value={form.team} onChange={handleChange} placeholder="Team" required />
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
              <input name="icon" value={form.icon} onChange={handleChange} placeholder="Icon filename (optional)" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
              <textarea name="default_parameters" value={form.default_parameters} onChange={handleChange} placeholder="Default Parameters (JSON)" />
              <textarea name="ui_schema" value={form.ui_schema} onChange={handleChange} placeholder='UI Schema (e.g. {"fields":[{"name":"target","type":"text"}]})' />
              <label>
                Requires Scope:
                <input type="checkbox" name="requires_scope" checked={!!form.requires_scope} onChange={handleChange} />
              </label>
              <div style={{marginTop:6}}>
                <button type="submit" disabled={loading}>{editingId ? "Update" : "Add"}</button>
                <button type="button" onClick={handleModalClose} disabled={loading} style={{marginLeft:6}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ToolsAdminPanel;