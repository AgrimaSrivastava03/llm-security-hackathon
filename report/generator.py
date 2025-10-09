import json
import sqlite3
from pathlib import Path
from typing import Dict, Any

HTML_TMPL = """
<!doctype html>
<html><head><meta charset="utf-8"><title>OWASP LLM Report</title>
<style>body{{font-family:system-ui,Segoe UI,Arial;margin:24px}} .fail{{color:#b00020}} .pass{{color:#006400}} table{{border-collapse:collapse}} td,th{{border:1px solid #ddd;padding:6px}}</style>
</head><body>
<h1>OWASP LLM Report</h1>
<p><strong>Target:</strong> {target}</p>
<p><strong>Run ID:</strong> {run_id}</p>
<table>
<tr><th>Rule</th><th>Status</th><th>Severity</th><th>Message</th></tr>
{rows}
</table>
</body></html>
"""


def load_sarif(path: Path) -> Any:
    with path.open('r', encoding='utf-8') as f:
        data = json.load(f)
    if 'runs' in data:
        items = data['runs'][0].get('results', [])
        return [
            {
                'ruleId': it.get('ruleId'),
                'status': 'fail' if it.get('level') == 'error' else 'pass',
                'severity': (it.get('properties', {}) or {}).get('severity'),
                'message': (it.get('message', {}) or {}).get('text', ''),
            }
            for it in items
        ]
    return data.get('results', [])


def load_run_meta(db_path: Path) -> Dict[str, Any]:
    if not db_path.exists():
        return { 'run_id': '-', 'target': '-' }
    con = sqlite3.connect(str(db_path))
    try:
        cur = con.execute("SELECT run_id, target FROM runs ORDER BY run_id DESC LIMIT 1")
        row = cur.fetchone()
        if not row:
            return { 'run_id': '-', 'target': '-' }
        return { 'run_id': row[0], 'target': row[1] }
    finally:
        con.close()


def write_json(findings, out_json: Path, meta: Dict[str, Any]):
    out_json.write_text(json.dumps({ 'meta': meta, 'results': findings }, ensure_ascii=False, indent=2), encoding='utf-8')


def write_html(findings, out_html: Path, meta: Dict[str, Any]):
    rows = []
    for f in findings:
        rows.append(f"<tr><td>{f.get('ruleId')}</td><td class='{f.get('status')}'>{f.get('status')}</td><td>{f.get('severity')}</td><td>{f.get('message')}</td></tr>")
    html = HTML_TMPL.format(target=meta.get('target','-'), run_id=meta.get('run_id','-'), rows='\n'.join(rows))
    out_html.write_text(html, encoding='utf-8')


def generate(sarif_path: str = 'sarif.json', evidence_db: str = 'evidence/harness.db', out_dir: str = 'report/out'):
    sarif = Path(sarif_path)
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    findings = load_sarif(sarif)
    meta = load_run_meta(Path(evidence_db))
    write_json(findings, out / 'report.json', meta)
    write_html(findings, out / 'report.html', meta)

if __name__ == '__main__':
    generate()
