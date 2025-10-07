import React, { useEffect, useState } from "react";
import { API_URL } from "../../App";

const AuditPanel = ({ token }: { token: string }) => {
  const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/audit`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setLogs);
  }, [token]);
  return (
    <section>
      <h2>Audit Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.timestamp}: {log.action} by {log.user_id} ({log.resource_type}/{log.resource_id}) {JSON.stringify(log.details)}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default AuditPanel;