#!/usr/bin/env python3
"""Test bundle server for the iOS simulator tests.

Serves fluxcord.min.js and the signed release manifest so the tweak can download and verify
a bundle, mirroring the builds-next branch behaviour.
"""
from http.server import BaseHTTPRequestHandler, HTTPServer
import os

ROOT = os.path.join(os.path.dirname(__file__), "..", "..", "bundle", "dist")
PORT = 8080

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.lstrip("/")
        if path in ("fluxcord.min.js", "fluxcord-release.json", "fluxcord-release.sig"):
            fp = os.path.join(ROOT, path)
            if os.path.exists(fp):
                self.send_response(200)
                self.send_header("Content-Type", "application/javascript" if path.endswith(".js") else "application/json")
                self.end_headers()
                self.wfile.write(open(fp, "rb").read())
            else:
                self.send_response(404)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    HTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
