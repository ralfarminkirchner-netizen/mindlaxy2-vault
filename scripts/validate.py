#!/usr/bin/env python3
"""Validate structure, counts, links and public-safety invariants."""
from __future__ import annotations
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

payload = json.loads((ROOT / "data" / "repositories.json").read_text(encoding="utf-8"))
repos = payload.get("repositories", [])
manifest = payload.get("manifest", {})

names = [r.get("name") for r in repos]
ids = [r.get("id") for r in repos]
if len(names) != len(set(names)):
    fail("Repository names are not unique.")
if len(ids) != len(set(ids)):
    fail("Repository IDs are not unique.")
if manifest.get("scope", {}).get("github_repository_count") != len(repos):
    fail("Manifest repository count does not match data.")

public_count = sum(r.get("visibility") == "public" for r in repos)
private_count = sum(r.get("visibility") == "private" for r in repos)
scope = manifest.get("scope", {})
if scope.get("public_repository_count") != public_count:
    fail("Public count mismatch.")
if scope.get("private_repository_count") != private_count:
    fail("Private count mismatch.")

families = json.loads((ROOT / "data" / "families.json").read_text(encoding="utf-8"))["families"]
for r in repos:
    required = [
        "id","name","repository_full_name","url","visibility","default_branch",
        "github_size_kb","primary_family","kind","summary","evidence","relations",
        "boundaries","index_status","human_sealed"
    ]
    for key in required:
        if key not in r:
            fail(f"{r.get('name','?')}: missing {key}")
    if r.get("primary_family") not in families:
        fail(f"{r.get('name','?')}: unknown family")
    if r.get("index_status") != "descriptive-projection":
        fail(f"{r.get('name','?')}: invalid index status")
    if r.get("human_sealed") is not False:
        fail(f"{r.get('name','?')}: index must not claim a Human Seal")
    if r.get("visibility") not in {"public","private"}:
        fail(f"{r.get('name','?')}: invalid visibility")
    doc = ROOT / "docs" / "repositories" / (
        f"{r['id']}-" + (re.sub(r"[^A-Za-z0-9._-]+", "-", r["name"]).strip("-") or "repo") + ".md"
    )
    if not doc.exists():
        fail(f"{r['name']}: missing dossier {doc.relative_to(ROOT)}")

# Prevent accidental publication of absolute local paths or typical secrets.
scan_extensions = {".md",".json",".ndjson",".csv",".txt",".html",".js",".css",".py",".yml",".yaml"}
secret_patterns = [
    (re.compile(r"/Users/[^/\s]+/"), "absolute macOS user path"),
    (re.compile(r"/Volumes/[^/\s]+/"), "absolute volume path"),
    (re.compile(r"\bsk-(?:proj-)?[A-Za-z0-9_-]{8,}"), "OpenAI-style secret"),
    (re.compile(r"\bgh[pousr]_[A-Za-z0-9]{12,}"), "GitHub token"),
    (re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"), "private key"),
]
for path in ROOT.rglob("*"):
    if not path.is_file() or ".git" in path.parts or path.suffix.lower() not in scan_extensions:
        continue
    if path.resolve() == Path(__file__).resolve():
        continue
    text = path.read_text(encoding="utf-8", errors="ignore")
    for pattern, label in secret_patterns:
        if pattern.search(text):
            fail(f"{path.relative_to(ROOT)} contains {label}")

if ERRORS:
    print("VALIDATION FAILED", file=sys.stderr)
    for e in ERRORS:
        print(f"- {e}", file=sys.stderr)
    sys.exit(1)

print(f"OK: {len(repos)} repositories; {public_count} public; {private_count} private; no blocked path/secret patterns.")
