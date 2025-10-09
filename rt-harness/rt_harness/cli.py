import argparse
from datetime import datetime
from .runner import run_attacks, load_seeds
from .sarif import write_sarif
from .policy import load_policy, evaluate_thresholds, validate_policy
from .evidence import init_db, insert_run, insert_findings


def main():
    parser = argparse.ArgumentParser(prog="rt-harness")
    sub = parser.add_subparsers(dest="command", required=True)

    run_p = sub.add_parser("run", help="Execute attack seeds against target")
    run_p.add_argument("--target", required=True, help="Target URL endpoint")
    run_p.add_argument("--seeds", default="rt-harness/attacks/seeds", help="Seeds directory")
    run_p.add_argument("--out", default="findings.sarif.json", help="Output SARIF or JSON path")
    run_p.add_argument("--policy", default="ci/policy.yaml", help="Policy YAML path")
    run_p.add_argument("--json", action="store_true", help="Emit JSON findings instead of SARIF")
    run_p.add_argument("--evidence-db", default="evidence/harness.db", help="SQLite evidence DB path")

    list_p = sub.add_parser("list-attacks", help="List available attack seeds")
    list_p.add_argument("--seeds", default="rt-harness/attacks/seeds", help="Seeds directory")

    score_p = sub.add_parser("score", help="Evaluate findings against policy thresholds")
    score_p.add_argument("--in", dest="input_path", required=True, help="Findings SARIF/JSON path")
    score_p.add_argument("--policy", default="ci/policy.yaml", help="Policy YAML path")
    score_p.add_argument("--fail-on-threshold", action="store_true")

    lint_p = sub.add_parser("policy-lint", help="Validate policy YAML structure")
    lint_p.add_argument("--policy", default="ci/policy.yaml", help="Policy YAML path")

    args = parser.parse_args()

    if args.command == "run":
        policy = load_policy(args.policy)
        init_db(args.evidence_db)
        run_id = insert_run(args.evidence_db, datetime.utcnow().isoformat(), args.target, str(policy.get("version", "1")))
        results = run_attacks(args.target, args.seeds, policy)
        insert_findings(args.evidence_db, run_id, results)
        if args.json:
            from json import dump
            with open(args.out, "w", encoding="utf-8") as f:
                dump({"results": results}, f, ensure_ascii=False, indent=2)
        else:
            write_sarif(results, args.out)
    elif args.command == "list-attacks":
        seeds = load_seeds(args.seeds)
        for s in seeds:
            print(f"{s.get('id')}\t{s.get('owasp_code')}\t{s.get('category')}")
    elif args.command == "score":
        policy = load_policy(args.policy)
        from .sarif import read_findings
        findings = read_findings(args.input_path)
        violated, message = evaluate_thresholds(findings, policy)
        if violated and args.fail_on_threshold:
            print(message)
            raise SystemExit(1)
        print(message)
    elif args.command == "policy-lint":
        policy = load_policy(args.policy)
        errors = validate_policy(policy)
        if errors:
            for e in errors:
                print(f"ERROR: {e}")
            raise SystemExit(1)
        print("Policy is valid")
