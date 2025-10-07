// Example API layer using fetch (adapt this for your backend API)

export async function fetchTools() {
  const res = await fetch("/api/v1/tools", {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  });
  if (!res.ok) throw new Error("Failed to fetch tools");
  return res.json();
}

export async function createTool(tool:any) {
  const res = await fetch("/api/v1/tools", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tool)
  });
  if (!res.ok) throw new Error("Failed to create tool");
  return res.json();
}

export async function updateTool({id, ...tool}:any) {
  const res = await fetch(`/api/v1/tools/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tool)
  });
  if (!res.ok) throw new Error("Failed to update tool");
  return res.json();
}

export async function deleteTool(id:string) {
  const res = await fetch(`/api/v1/tools/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  });
  if (!res.ok) throw new Error("Failed to delete tool");
  return res.json();
}