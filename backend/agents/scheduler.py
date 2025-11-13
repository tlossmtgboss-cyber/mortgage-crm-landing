"""
Agent Scheduler

Handles scheduled tasks for agent system:
- Daily pipeline reviews
- Hourly checks
- Weekly reports
"""

import logging
import asyncio
from datetime import datetime, timezone
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from .events import emit_scheduled_event, EventType

logger = logging.getLogger(__name__)


class AgentScheduler:
    """
    Scheduler for automated agent tasks.

    Schedules periodic agent workflows like daily pipeline reviews,
    weekly reports, and hourly monitoring checks.
    """

    def __init__(self):
        self.scheduler = AsyncIOScheduler()
        self._is_running = False
        logger.info("AgentScheduler initialized")

    def setup_scheduled_tasks(self):
        """Set up all scheduled tasks"""

        # Daily Pipeline Review - Every day at 9:00 AM
        self.scheduler.add_job(
            self._daily_pipeline_review,
            trigger=CronTrigger(hour=9, minute=0),
            id='daily_pipeline_review',
            name='Daily Pipeline Review',
            replace_existing=True
        )
        logger.info("Scheduled: Daily Pipeline Review at 9:00 AM")

        # Hourly Check - Every hour
        self.scheduler.add_job(
            self._hourly_check,
            trigger=CronTrigger(minute=0),
            id='hourly_check',
            name='Hourly Check',
            replace_existing=True
        )
        logger.info("Scheduled: Hourly Check at top of every hour")

        # Weekly Report - Every Monday at 8:00 AM
        self.scheduler.add_job(
            self._weekly_report,
            trigger=CronTrigger(day_of_week='mon', hour=8, minute=0),
            id='weekly_report',
            name='Weekly Report',
            replace_existing=True
        )
        logger.info("Scheduled: Weekly Report every Monday at 8:00 AM")

    async def _daily_pipeline_review(self):
        """Trigger daily pipeline review"""
        try:
            logger.info("Triggering daily pipeline review")
            await emit_scheduled_event(
                EventType.DAILY_PIPELINE_REVIEW,
                context={
                    "date": datetime.now(timezone.utc).isoformat(),
                    "trigger": "scheduled"
                }
            )
            logger.info("Daily pipeline review triggered successfully")
        except Exception as e:
            logger.error(f"Failed to trigger daily pipeline review: {e}", exc_info=True)

    async def _hourly_check(self):
        """Trigger hourly check"""
        try:
            logger.info("Triggering hourly check")
            await emit_scheduled_event(
                EventType.HOURLY_CHECK,
                context={
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "trigger": "scheduled"
                }
            )
            logger.info("Hourly check triggered successfully")
        except Exception as e:
            logger.error(f"Failed to trigger hourly check: {e}", exc_info=True)

    async def _weekly_report(self):
        """Trigger weekly report"""
        try:
            logger.info("Triggering weekly report")
            await emit_scheduled_event(
                EventType.WEEKLY_REPORT,
                context={
                    "week_start": datetime.now(timezone.utc).isoformat(),
                    "trigger": "scheduled"
                }
            )
            logger.info("Weekly report triggered successfully")
        except Exception as e:
            logger.error(f"Failed to trigger weekly report: {e}", exc_info=True)

    def start(self):
        """Start the scheduler"""
        if not self._is_running:
            self.setup_scheduled_tasks()
            self.scheduler.start()
            self._is_running = True
            logger.info("AgentScheduler started")
        else:
            logger.warning("AgentScheduler already running")

    def stop(self):
        """Stop the scheduler"""
        if self._is_running:
            self.scheduler.shutdown()
            self._is_running = False
            logger.info("AgentScheduler stopped")
        else:
            logger.warning("AgentScheduler not running")

    def get_jobs(self):
        """Get all scheduled jobs"""
        return self.scheduler.get_jobs()

    def pause_job(self, job_id: str):
        """Pause a specific job"""
        self.scheduler.pause_job(job_id)
        logger.info(f"Paused job: {job_id}")

    def resume_job(self, job_id: str):
        """Resume a specific job"""
        self.scheduler.resume_job(job_id)
        logger.info(f"Resumed job: {job_id}")


# Global scheduler instance
_global_scheduler = None


def get_scheduler() -> AgentScheduler:
    """
    Get or create the global scheduler instance.

    Returns:
        AgentScheduler instance
    """
    global _global_scheduler

    if _global_scheduler is None:
        _global_scheduler = AgentScheduler()
        logger.info("Created global AgentScheduler instance")

    return _global_scheduler


def start_scheduler():
    """Start the global scheduler"""
    scheduler = get_scheduler()
    scheduler.start()


def stop_scheduler():
    """Stop the global scheduler"""
    scheduler = get_scheduler()
    scheduler.stop()
