"""
Agentic AI System for Mortgage CRM

This module contains the core agent orchestration system that powers
autonomous AI operations in the CRM.
"""

from .manager import AgentManager
from .base_agent import BaseAgent
from .tools import ToolRegistry, tool
from .events import EventBus

__all__ = ['AgentManager', 'BaseAgent', 'ToolRegistry', 'tool', 'EventBus']
