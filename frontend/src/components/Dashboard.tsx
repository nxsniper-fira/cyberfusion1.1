import React, { useState, useEffect } from "react";
import WhiteHatPanel from "./Panel/WhiteHatPanel";
import RedHatPanel from "./Panel/RedHatPanel";
import UserPanel from "./Panel/UserPanel";
import AuditPanel from "./Panel/AuditPanel";
import ToolsAdminPanel from "./Panel/ToolsAdminPanel";
import jwt_decode from "jwt-decode";

const getUserFromToken = (token: string | null) => {
  if (!token) return null;
  try {
    return jwt_decode(token) as any;
  } catch {
    return null;
  }
};

const Dashboard = ({ token }: { token: string | null }) => {
  const [tab, setTab] = useState("white");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUserFromToken(token));
  }, [token]);

  if (!token) return <div>Please login.</div>;

  const isAdmin = user?.role === "admin";

  return (
    <div>
      <h1>CyberFusion Dashboard</h1>
      <nav style={{marginBottom:12}}>
        <button onClick={() => setTab("white")}>White Hat</button>
        <button onClick={() => setTab("red")}>Red Hat</button>
        <button onClick={() => setTab("users")}>Users</button>
        <button onClick={() => setTab("audit")}>Audit</button>
        {isAdmin && <button onClick={() => setTab("tools")}>Tools Admin</button>}
      </nav>
      {tab === "white" && <WhiteHatPanel token={token} />}
      {tab === "red" && <RedHatPanel token={token} />}
      {tab === "users" && <UserPanel token={token} />}
      {tab === "audit" && <AuditPanel token={token} />}
      {tab === "tools" && isAdmin && <ToolsAdminPanel token={token} />}
    </div>
  );
};
export default Dashboard;