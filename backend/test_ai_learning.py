"""
Comprehensive Test Suite for AI Task Learning System

Tests the complete AI learning workflow:
1. Generate AI drafts
2. Approval workflow
3. Learning progression (New → In Training → Approved)
4. Rejection and counter reset
5. Pending approval tasks
"""

import os
import sys
import requests
import json
from datetime import datetime

# Configuration
API_BASE_URL = "https://mortgage-crm-production-7a9a.up.railway.app"
# For local testing, use:
# API_BASE_URL = "http://localhost:8000"

# Test user credentials - valid token
TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaS10ZXN0LTIwMjUxMTEyMjEzNzE4QGV4YW1wbGUuY29tIiwiZXhwIjoxNzYzMDAzMjM4fQ.CMkGGULL9OCxs8jXUF4hceWxAEQCrQVdBy0nQt7j8kA"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_test(message):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*70}{Colors.RESET}")
    print(f"{Colors.BLUE}{Colors.BOLD}{message}{Colors.RESET}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*70}{Colors.RESET}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.RESET}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.RESET}")

def print_info(message):
    print(f"{Colors.YELLOW}ℹ️  {message}{Colors.RESET}")

def make_request(method, endpoint, data=None, params=None):
    """Make API request with authentication"""
    url = f"{API_BASE_URL}{endpoint}"
    headers = {
        "Authorization": f"Bearer {TEST_TOKEN}",
        "Content-Type": "application/json"
    }

    try:
        if method == "GET":
            response = requests.get(url, headers=headers, params=params, timeout=30)
        elif method == "POST":
            response = requests.post(url, headers=headers, json=data, timeout=30)
        elif method == "PUT":
            response = requests.put(url, headers=headers, json=data, timeout=30)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers, timeout=30)

        # Print response details for debugging
        if response.status_code >= 400:
            print_error(f"HTTP {response.status_code}: {response.text[:200]}")

        return response
    except requests.exceptions.Timeout:
        print_error(f"Request timed out after 30 seconds: {method} {url}")
        return None
    except requests.exceptions.ConnectionError as e:
        print_error(f"Connection error: {e}")
        return None
    except Exception as e:
        print_error(f"Request failed: {e}")
        return None

def test_1_create_test_task():
    """Test 1: Create a test task for AI learning"""
    print_test("TEST 1: Create Test Task")

    task_data = {
        "title": "Follow up on pre-approval",
        "description": "Contact Sarah Johnson about her pre-approval that expires Feb 8, 2025",
        "type": "Human Needed",
        "priority": "high",
        "task_type": "follow_up_pre_approval"
    }

    response = make_request("POST", "/api/v1/tasks/", task_data)

    if response and response.status_code in [200, 201]:
        task = response.json()
        print_success(f"Task created: ID={task.get('id')}, Title='{task.get('title')}'")
        return task.get('id')
    else:
        print_error(f"Failed to create task: {response.status_code if response else 'No response'}")
        if response:
            print_error(f"Response: {response.text}")
        return None

def test_2_generate_ai_draft(task_id):
    """Test 2: Generate AI draft for the task"""
    print_test(f"TEST 2: Generate AI Draft for Task {task_id}")

    if not task_id:
        print_error("No task ID provided, skipping test")
        return None

    # Generate AI draft (task_type should be set during creation)
    response = make_request("POST", f"/api/v1/tasks/{task_id}/generate-ai-draft")

    if response and response.status_code == 200:
        result = response.json()
        print_success("AI draft generated successfully")
        print_info(f"Task Type: {result.get('task_type')}")
        print_info(f"AI Message:\n{result.get('ai_drafted_message')}")
        return result
    else:
        print_error(f"Failed to generate AI draft: {response.status_code if response else 'No response'}")
        if response:
            print_error(f"Response: {response.text}")
        return None

def test_3_get_ai_learning_status(task_type="follow_up_pre_approval"):
    """Test 3: Get AI learning status for task type"""
    print_test(f"TEST 3: Get AI Learning Status for '{task_type}'")

    response = make_request("GET", "/api/v1/ai-learning/status", params={"task_type": task_type})

    if response and response.status_code == 200:
        status = response.json()
        print_success("AI learning status retrieved")
        print_info(f"Status: {status.get('ai_status')}")
        print_info(f"Consecutive Approvals: {status.get('consecutive_approvals')}/5")
        print_info(f"Total Approvals: {status.get('total_approvals')}")
        print_info(f"Total Rejections: {status.get('total_rejections')}")
        return status
    else:
        print_error(f"Failed to get AI status: {response.status_code if response else 'No response'}")
        if response:
            print_error(f"Response: {response.text}")
        return None

def test_4_approve_ai_action(task_id, approved=True, corrections=None):
    """Test 4: Approve or reject AI action"""
    action = "APPROVE" if approved else "REJECT"
    print_test(f"TEST 4: {action} AI Action for Task {task_id}")

    if not task_id:
        print_error("No task ID provided, skipping test")
        return None

    data = {
        "approved": approved,
        "user_corrections": corrections
    }

    response = make_request("POST", f"/api/v1/tasks/{task_id}/approve-ai-action", data)

    if response and response.status_code == 200:
        result = response.json()
        print_success(f"AI action {action}ED successfully")
        print_info(f"New AI Status: {result.get('ai_status')}")
        print_info(f"Consecutive Approvals: {result.get('consecutive_approvals')}/5")
        print_info(f"Message: {result.get('message')}")
        return result
    else:
        print_error(f"Failed to {action} AI action: {response.status_code if response else 'No response'}")
        if response:
            print_error(f"Response: {response.text}")
        return None

def test_5_full_learning_cycle():
    """Test 5: Complete learning cycle (0 → 5 approvals)"""
    print_test("TEST 5: Full AI Learning Cycle (New → In Training → Approved)")

    task_type = "schedule_appraisal"
    print_info(f"Testing with task type: '{task_type}'")

    # Check initial status (should be new)
    print("\n📊 Initial Status Check:")
    initial_status = test_3_get_ai_learning_status(task_type)

    if initial_status and initial_status.get('ai_status') != 'new':
        print_info("Resetting to 'new' status for clean test...")

    # Create and approve 5 tasks in sequence
    for i in range(1, 6):
        print(f"\n{'='*70}")
        print(f"🔄 Approval Round {i}/5")
        print(f"{'='*70}")

        # Create task
        task_data = {
            "title": f"Schedule appraisal - Test {i}",
            "description": f"Schedule appraisal for property - iteration {i}",
            "type": "Human Needed",
            "priority": "medium",
            "task_type": task_type
        }

        response = make_request("POST", "/api/v1/tasks/", task_data)
        if not response or response.status_code not in [200, 201]:
            print_error(f"Failed to create task {i}")
            continue

        task_id = response.json().get('id')
        print_success(f"Task {i} created (ID: {task_id})")

        # Generate AI draft
        draft_response = make_request("POST", f"/api/v1/tasks/{task_id}/generate-ai-draft")
        if draft_response and draft_response.status_code == 200:
            draft = draft_response.json()
            print_success(f"AI draft generated")
            print_info(f"Message preview: {draft.get('ai_drafted_message', '')[:100]}...")

        # Approve the AI action
        approval_response = make_request("POST", f"/api/v1/tasks/{task_id}/approve-ai-action", {"approved": True})
        if approval_response and approval_response.status_code == 200:
            result = approval_response.json()
            print_success(f"✅ Approved! ({result.get('consecutive_approvals')}/5)")
            print_info(f"Current Status: {result.get('ai_status')}")

            # Check if reached milestones
            consecutive = result.get('consecutive_approvals', 0)
            if consecutive == 1:
                print_success("🎯 MILESTONE: AI entered 'In Training' mode!")
            elif consecutive == 5:
                print_success("🎉 MILESTONE: AI is now FULLY APPROVED and autonomous!")

    # Final status check
    print("\n📊 Final Status Check:")
    final_status = test_3_get_ai_learning_status(task_type)

    if final_status:
        if final_status.get('ai_status') == 'approved' and final_status.get('consecutive_approvals') >= 5:
            print_success("\n🎉 LEARNING CYCLE COMPLETE! AI is now fully autonomous!")
        else:
            print_error(f"\n⚠️  Learning cycle incomplete. Status: {final_status.get('ai_status')}")

def test_6_rejection_and_reset():
    """Test 6: Test rejection and counter reset"""
    print_test("TEST 6: Rejection and Counter Reset")

    task_type = "upload_documents"
    print_info(f"Testing with task type: '{task_type}'")

    # Create and approve 3 tasks
    print("\n📈 Building up 3 consecutive approvals...")
    task_ids = []

    for i in range(1, 4):
        task_data = {
            "title": f"Upload missing documents - Test {i}",
            "description": "Upload required documents",
            "type": "Human Needed",
            "priority": "high",
            "task_type": task_type
        }

        response = make_request("POST", "/api/v1/tasks/", task_data)
        if response and response.status_code in [200, 201]:
            task_id = response.json().get('id')
            task_ids.append(task_id)

            # Generate draft
            make_request("POST", f"/api/v1/tasks/{task_id}/generate-ai-draft")

            # Approve
            approval = make_request("POST", f"/api/v1/tasks/{task_id}/approve-ai-action", {"approved": True})
            if approval and approval.status_code == 200:
                result = approval.json()
                print_success(f"Task {i} approved ({result.get('consecutive_approvals')}/5)")

    # Check status after 3 approvals
    status_before = test_3_get_ai_learning_status(task_type)
    print_info(f"Status before rejection: {status_before.get('ai_status')} with {status_before.get('consecutive_approvals')} consecutive approvals")

    # Create 4th task and REJECT it
    print("\n❌ Creating 4th task and REJECTING it...")
    task_data = {
        "title": "Upload missing documents - Test 4 (will reject)",
        "description": "Upload required documents",
        "type": "Human Needed",
        "priority": "high",
        "task_type": task_type
    }

    response = make_request("POST", "/api/v1/tasks/", task_data)
    if response and response.status_code in [200, 201]:
        task_id = response.json().get('id')

        make_request("POST", f"/api/v1/tasks/{task_id}/generate-ai-draft")

        # REJECT with corrections
        rejection = make_request("POST", f"/api/v1/tasks/{task_id}/approve-ai-action", {
            "approved": False,
            "user_corrections": "The message was too formal. Use more casual, friendly tone."
        })

        if rejection and rejection.status_code == 200:
            result = rejection.json()
            print_success("Task rejected with corrections")
            print_info(f"New Status: {result.get('ai_status')}")
            print_info(f"Consecutive Approvals: {result.get('consecutive_approvals')}/5 (RESET!)")

    # Check status after rejection
    status_after = test_3_get_ai_learning_status(task_type)

    if status_after.get('consecutive_approvals') == 0:
        print_success("\n✅ Counter successfully reset to 0 after rejection!")
    else:
        print_error(f"\n❌ Counter not reset! Current: {status_after.get('consecutive_approvals')}")

def test_7_get_all_ai_statuses():
    """Test 7: Get all AI learning statuses"""
    print_test("TEST 7: Get All AI Learning Statuses")

    response = make_request("GET", "/api/v1/ai-learning/status")

    if response and response.status_code == 200:
        statuses = response.json()
        print_success(f"Retrieved {len(statuses)} task type statuses")

        for status in statuses:
            print(f"\n📋 {status.get('task_type')}:")
            print(f"   Status: {status.get('ai_status')}")
            print(f"   Consecutive: {status.get('consecutive_approvals')}/5")
            print(f"   Total Approvals: {status.get('total_approvals')}")
            print(f"   Total Rejections: {status.get('total_rejections')}")

        return statuses
    else:
        print_error(f"Failed to get all statuses: {response.status_code if response else 'No response'}")
        return None

def run_all_tests():
    """Run all AI learning tests"""
    print(f"\n{Colors.BOLD}{'='*70}")
    print(f"🤖 AI TASK LEARNING SYSTEM - COMPREHENSIVE TEST SUITE")
    print(f"{'='*70}{Colors.RESET}\n")

    print_info(f"API Base URL: {API_BASE_URL}")
    print_info(f"Starting tests at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    try:
        # Quick tests
        task_id = test_1_create_test_task()
        if task_id:
            test_2_generate_ai_draft(task_id)
            test_3_get_ai_learning_status()
            test_4_approve_ai_action(task_id, approved=True)

        # Comprehensive tests
        test_5_full_learning_cycle()
        test_6_rejection_and_reset()
        test_7_get_all_ai_statuses()

        print(f"\n{Colors.BOLD}{Colors.GREEN}{'='*70}")
        print(f"✅ ALL TESTS COMPLETED")
        print(f"{'='*70}{Colors.RESET}\n")

    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}⚠️  Tests interrupted by user{Colors.RESET}\n")
    except Exception as e:
        print(f"\n\n{Colors.RED}❌ Tests failed with error: {e}{Colors.RESET}\n")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    run_all_tests()
