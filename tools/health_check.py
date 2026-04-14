"""
health_check.py
───────────────
Pings the CRM Arena API /health endpoint and prints the result.

Usage:
    cd backend
    python ../tools/health_check.py
    python ../tools/health_check.py --url http://localhost:8000
"""

import sys
import argparse
import urllib.request
import json

DEFAULT_URL = "http://localhost:8000/health"


def check(url: str) -> int:
    """Returns exit code 0 (healthy) or 1 (unreachable / unhealthy)."""
    try:
        with urllib.request.urlopen(url, timeout=5) as resp:
            body = json.loads(resp.read())
            status = body.get("status", "unknown")
            service = body.get("service", "")
            print(f"✓ {service} — status: {status} (HTTP {resp.status})")
            return 0 if status == "ok" else 1
    except Exception as e:
        print(f"✗ Health check failed: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CRM Arena API health check")
    parser.add_argument("--url", default=DEFAULT_URL, help="Health endpoint URL")
    args = parser.parse_args()
    sys.exit(check(args.url))
