"""
Run 10 Consecutive Test Iterations

Runs the agent system test suite 10 times consecutively
and tracks success/failure across all iterations.
"""

import asyncio
import sys
import subprocess
from datetime import datetime


def run_single_test(iteration):
    """Run a single test iteration"""
    print(f"\n{'='*80}")
    print(f"🔄 ITERATION {iteration}/10")
    print(f"{'='*80}\n")

    try:
        import os

        # Pass current environment to subprocess
        env = os.environ.copy()

        result = subprocess.run(
            [sys.executable, "test_agent_system.py"],
            capture_output=True,
            text=True,
            timeout=30,
            env=env
        )

        # Print output
        print(result.stdout)
        if result.stderr:
            print("STDERR:", result.stderr)

        success = result.returncode == 0

        return {
            "iteration": iteration,
            "success": success,
            "return_code": result.returncode,
            "output": result.stdout
        }

    except subprocess.TimeoutExpired:
        print(f"❌ Iteration {iteration} timed out after 30 seconds")
        return {
            "iteration": iteration,
            "success": False,
            "error": "Timeout"
        }
    except Exception as e:
        print(f"❌ Iteration {iteration} failed with error: {e}")
        return {
            "iteration": iteration,
            "success": False,
            "error": str(e)
        }


def main():
    """Run 10 consecutive tests"""
    print("\n" + "="*80)
    print("🚀 RUNNING 10 CONSECUTIVE TEST ITERATIONS")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80)

    results = []

    for i in range(1, 11):
        result = run_single_test(i)
        results.append(result)

        # If this iteration failed, note it
        if not result["success"]:
            print(f"\n⚠️  Iteration {i} failed - continuing to track consecutive failures...")

    # Summary
    print("\n\n" + "="*80)
    print("📊 FINAL RESULTS - 10 CONSECUTIVE ITERATIONS")
    print("="*80)

    passed_count = sum(1 for r in results if r["success"])
    failed_count = len(results) - passed_count

    print(f"\n✅ Passed: {passed_count}/10")
    print(f"❌ Failed: {failed_count}/10")

    print("\n📋 Iteration Results:")
    for r in results:
        status = "✅ PASS" if r["success"] else "❌ FAIL"
        print(f"   Iteration {r['iteration']}: {status}")
        if not r["success"] and "error" in r:
            print(f"      Error: {r['error']}")

    # Check for consecutive passes
    consecutive_passes = 0
    max_consecutive = 0
    for r in results:
        if r["success"]:
            consecutive_passes += 1
            max_consecutive = max(max_consecutive, consecutive_passes)
        else:
            consecutive_passes = 0

    print(f"\n🎯 Max Consecutive Passes: {max_consecutive}/10")

    print("\n" + "="*80)
    if passed_count == 10:
        print("🎉 SUCCESS! ALL 10 TESTS PASSED CONSECUTIVELY!")
        print("="*80 + "\n")
        return 0
    else:
        print(f"⚠️  {failed_count} test(s) failed. Review errors above.")
        print("="*80 + "\n")
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
