import React, { useEffect, useState } from "react";
import { API_URL } from "../../App";

type Asset = { id: string; ip_address: string; hostname: string; os: string; discovered_at: string };

const WhiteHatPanel = ({ token }: { token: string }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [ip, setIp] = useState("");
  const [hostname, setHostname] = useState("");
  const [os, setOs] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/assets`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setAssets);
  }, [token]);

  const handleAdd = async () => {
    const resp = await fetch(`${API_URL}/assets`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ip_address: ip, hostname, os }),
    });
    if (resp.ok) {
      const asset = await resp.json();
      setAssets([asset, ...assets]);
      setIp(""); setHostname(""); setOs("");
    }
  };

  return (
    <section>
      <h2>White Hat Panel (Assets)</h2>
      <input placeholder="IP" value={ip} onChange={e => setIp(e.target.value)} />
      <input placeholder="Hostname" value={hostname} onChange={e => setHostname(e.target.value)} />
      <input placeholder="OS" value={os} onChange={e => setOs(e.target.value)} />
      <button onClick={handleAdd}>Add Asset</button>
      <ul>
        {assets.map(a => (
          <li key={a.id}>{a.ip_address} - {a.hostname} - {a.os} ({a.discovered_at})</li>
        ))}
      </ul>
    </section>
  );
};

export default WhiteHatPanel;