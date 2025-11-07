#!/bin/bash
# Environment Check Script for Day 4 Exercises
# This script verifies that all required tools and services are available

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

echo "======================================"
echo "Day 4 Exercise Environment Check"
echo "======================================"
echo ""

# Function to check command availability
check_command() {
    local cmd=$1
    local name=$2
    local required=$3
    
    if command -v "$cmd" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $name is installed"
        PASSED=$((PASSED + 1))
        
        # Show version if available
        case $cmd in
            docker)
                echo "  Version: $(docker --version)"
                ;;
            node)
                echo "  Version: $(node --version)"
                ;;
            npm)
                echo "  Version: $(npm --version)"
                ;;
            git)
                echo "  Version: $(git --version)"
                ;;
        esac
    else
        if [ "$required" = "true" ]; then
            echo -e "${RED}✗${NC} $name is NOT installed (REQUIRED)"
            FAILED=$((FAILED + 1))
        else
            echo -e "${YELLOW}⚠${NC} $name is NOT installed (optional)"
            WARNINGS=$((WARNINGS + 1))
        fi
    fi
}

# Check Docker
check_command "docker" "Docker" "true"

# Check Docker Compose
if command -v docker &> /dev/null; then
    if docker compose version &> /dev/null; then
        echo -e "${GREEN}✓${NC} Docker Compose is available"
        echo "  Version: $(docker compose version)"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} Docker Compose is NOT available (REQUIRED)"
        FAILED=$((FAILED + 1))
    fi
fi

# Check Node.js
check_command "node" "Node.js" "true"

# Check npm
check_command "npm" "npm" "true"

# Check Git
check_command "git" "Git" "true"

# Check curl
check_command "curl" "curl" "false"

# Check sonar-scanner (optional)
check_command "sonar-scanner" "SonarScanner CLI" "false"

echo ""
echo "======================================"
echo "Docker Service Check"
echo "======================================"
echo ""

# Check if Docker daemon is running
if docker info &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker daemon is running"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}✗${NC} Docker daemon is NOT running (REQUIRED)"
    echo "  Please start Docker Desktop or Docker daemon"
    FAILED=$((FAILED + 1))
fi

echo ""
echo "======================================"
echo "Network Connectivity Check"
echo "======================================"
echo ""

# Check internet connectivity
if curl -s --max-time 5 https://www.google.com > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Internet connectivity is available"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠${NC} Internet connectivity check failed"
    echo "  Some exercises may not work without internet"
    WARNINGS=$((WARNINGS + 1))
fi

# Check Docker Hub connectivity
if curl -s --max-time 5 https://hub.docker.com > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Docker Hub is reachable"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠${NC} Docker Hub connectivity check failed"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "======================================"
echo "GitHub Setup Check"
echo "======================================"
echo ""

# Check Git configuration
if git config user.name &> /dev/null && git config user.email &> /dev/null; then
    echo -e "${GREEN}✓${NC} Git is configured"
    echo "  User: $(git config user.name) <$(git config user.email)>"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠${NC} Git user configuration is incomplete"
    echo "  Run: git config --global user.name 'Your Name'"
    echo "  Run: git config --global user.email 'your.email@example.com'"
    WARNINGS=$((WARNINGS + 1))
fi

# Check GitHub authentication (optional)
if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null; then
        echo -e "${GREEN}✓${NC} GitHub CLI is authenticated"
        PASSED=$((PASSED + 1))
    else
        echo -e "${YELLOW}⚠${NC} GitHub CLI is not authenticated (optional)"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC} GitHub CLI (gh) is not installed (optional)"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "======================================"
echo "Port Availability Check"
echo "======================================"
echo ""

# Check if port 9000 (SonarQube) is available
if nc -z localhost 9000 2>/dev/null; then
    echo -e "${YELLOW}⚠${NC} Port 9000 is already in use"
    echo "  SonarQube may fail to start. Please stop the service using this port."
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✓${NC} Port 9000 is available for SonarQube"
    PASSED=$((PASSED + 1))
fi

# Check if port 3000 (nodejs_server) is available
if nc -z localhost 3000 2>/dev/null; then
    echo -e "${YELLOW}⚠${NC} Port 3000 is already in use"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✓${NC} Port 3000 is available for nodejs_server"
    PASSED=$((PASSED + 1))
fi

echo ""
echo "======================================"
echo "Summary"
echo "======================================"
echo ""
echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC} $FAILED"
echo ""

if [ $FAILED -gt 0 ]; then
    echo -e "${RED}⚠ Please fix the failed checks before proceeding${NC}"
    echo ""
    echo "Installation instructions:"
    echo "- Docker: https://docs.docker.com/get-docker/"
    echo "- Node.js: https://nodejs.org/ (version 20 or higher recommended)"
    echo "- Git: https://git-scm.com/downloads"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠ Some optional components are missing${NC}"
    echo "You can proceed, but some exercises may require additional setup"
    exit 0
else
    echo -e "${GREEN}✓ All checks passed! You're ready for Day 4 exercises${NC}"
    exit 0
fi
