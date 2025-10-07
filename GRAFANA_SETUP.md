# Grafana Setup for CyberFusion Monitoring

1. **Access Grafana:**  
   - URL: [http://localhost:3001](http://localhost:3001)
   - Login: admin / admin

2. **Add Data Source:**  
   - Go to "Configuration" -> "Data Sources"
   - Add "Prometheus"
   - URL: `http://prometheus:9090`

3. **Import a Dashboard:**  
   - Go to "+" -> "Import"
   - Use dashboard IDs from [Grafana.com](https://grafana.com/grafana/dashboards/) (e.g., "1860" for Node.js metrics)
   - Set Prometheus as data source

4. **Visualize:**  
   - You can now visualize API response times, request rates, error rates, and custom app metrics

5. **Custom Panels:**  
   - Use `/metrics` endpoint from backend for custom Prometheus queries