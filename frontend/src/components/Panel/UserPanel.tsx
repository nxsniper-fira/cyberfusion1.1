import React, { useEffect, useState } from "react";
import { API_URL } from "../../App";

const UserPanel = ({ token }: { token: string }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setUsers);
  }, [token]);

  const handleRoleUpdate = async () => {
    await fetch(`${API_URL}/users/${selectedUser.id}/role`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role }),
    });
    setRole("");
    setSelectedUser(null);
    // Refresh users
    fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setUsers);
  };

  return (
    <section>
      <h2>User Management</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.username} - {u.role}
            <button onClick={() => setSelectedUser(u)}>Set Role</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h4>Set role for {selectedUser.username}</h4>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="admin">admin</option>
            <option value="team_lead">team_lead</option>
            <option value="operator">operator</option>
            <option value="viewer">viewer</option>
          </select>
          <button onClick={handleRoleUpdate} disabled={!role}>Update</button>
        </div>
      )}
    </section>
  );
};
export default UserPanel;