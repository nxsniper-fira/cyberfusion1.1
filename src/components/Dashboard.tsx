import React, { useState } from "react";
import ToolsAdminPanel from "../features/tools/ToolsAdminPanel";
import { useAuth } from "../features/auth/AuthContext";
// ... your other imports

export default function Dashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState("tools");

  return (
    <div>
      <nav>
        {/* ...other tabs */}
        {user?.role === "admin" && <button onClick={()=>setTab("tools")}>Tools Admin</button>}
      </nav>
      {tab === "tools" && user?.role === "admin" && <ToolsAdminPanel />}
      {/* ...rest */}
    </div>
  );
}