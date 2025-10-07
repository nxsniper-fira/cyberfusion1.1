from flask import Flask, request, render_template_string
import requests

app = Flask(__name__)

TEMPLATE = """
<html>
<head><title>Fake Login</title></head>
<body>
<h3>Login to view document</h3>
<form><input name="user" placeholder="Username"/><input type="password" name="pass" placeholder="Password"/><button>Login</button></form>
<hr>
<p>Your IP: {{ip}}</p>
<p>Your User-Agent: {{ua}}</p>
<p>Your Country: {{country}}</p>
</body>
</html>
"""

@app.route("/")
def index():
    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    ua = request.headers.get("User-Agent", "")
    country = ""
    try:
        r = requests.get(f"https://ipapi.co/{ip}/country_name/")
        country = r.text
    except:
        country = "Unknown"
    return render_template_string(TEMPLATE, ip=ip, ua=ua, country=country)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)