# Issue Coordination Guide

This guide helps coordinate work across multiple issues to avoid merge conflicts and ensure efficient collaboration.

## 🎯 Purpose

When multiple contributors work on the repository simultaneously, file conflicts can occur. This guide provides:
1. A quick reference for which issues affect which files
2. Strategies for avoiding merge conflicts
3. Best practices for coordinating parallel work

## 🗂️ File Ownership Map

### Developer Track Files (`dev-*.md`)

| File | Currently Affected Issues | Status |
|------|---------------------------|--------|
| `slides/pages/dev-advanced-github.md` | #60, #61, #62, #63, #64, #65, #66, #67, #68 | 🔴 High conflict risk |
| `slides/pages/dev-sonarqube-xray.md` | #49, #50, #51, #52, #53, #54, #55, #56, #57 | 🔴 High conflict risk |
| `slides/pages/dev-intro-artifactory.md` | #41, #42, #43, #44, #47, #48 | 🟠 Medium conflict risk |
| `slides/pages/dev-ci.md` | #31, #34, #35, #36, #37, #38, #40 | 🟠 Medium conflict risk |
| `slides/pages/dev-containerization.md` | #33, #34, #35, #36, #37, #39, #40 | 🟠 Medium conflict risk |
| `slides/pages/dev-intro.md` | #10 | 🟢 Low conflict risk |
| `slides/pages/dev-versioning.md` | #10 | 🟢 Low conflict risk |
| `exercises/*` | #45, #50, #59 | 🟠 Medium conflict risk |
| `README.md` | #57, #58 | 🟠 Medium conflict risk |

### Production Track Files (`prod-*.md`)

| File | Planned Issues (from ISSUES_TO_CREATE.md) | Status |
|------|-------------------------------------------|--------|
| `slides/pages/prod-k8s-apps.md` | Issues #1, #3, #4 | 🔴 Critical - Must sequence |
| `slides/pages/prod-ansible-basics.md` | Issue #2 | 🟢 Independent |
| `slides/pages/prod-ansible-public.md` | Issue #3 | 🟢 Independent (if #1 done) |
| `README.md` | Issue #7 | 🟠 May conflict |
| `DRAFT` | Issue #6 | 🟢 Independent |
| `exercises/infra-tutorial/*` | Issue #5 | 🟢 Independent (new dir) |

## 🚦 Conflict Risk Levels

- 🔴 **High Risk**: 5+ issues affecting the same file - requires careful coordination
- 🟠 **Medium Risk**: 2-4 issues affecting the same file - communicate before starting
- 🟢 **Low Risk**: 1 issue or independent files - safe to work on in parallel

## 📋 Coordination Strategies

### For High-Risk Files (🔴)

**Example: `dev-advanced-github.md` (9 open issues)**

**Option 1: Sequential Assignment**
```
Week 1: Issue #61 → #62 → #63
Week 2: Issue #64 → #65 → #66
Week 3: Issue #67 → #68 → #60
```

**Option 2: Section-Based Division**
1. Analyze the file structure
2. Assign issues to different sections
3. Each contributor works on their section
4. Merge in agreed-upon order (top to bottom)

**Option 3: Consolidation**
1. Create a meta-issue combining multiple related issues
2. One contributor handles all changes
3. Review comprehensively before merge

### For Medium-Risk Files (🟠)

**Example: `dev-ci.md` (7 open issues)**

**Recommended Approach:**
1. Group related issues (e.g., #34, #35, #36 all about best practices)
2. Assign groups to different contributors
3. Use clear section boundaries
4. Coordinate merge order via comments

### For Production Track Issues

**Critical Dependency Chain:**
```
Issue #1 (Create prod-k8s-apps.md)
    ↓
Issue #3 (Enhance external access) ←→ Issue #4 (Add scaling/DNS)
    ↓
Issue #7 (Create 2-day deck)
```

**Safe Parallel Work:**
- Issue #2 (Ansible integration) - Independent
- Issue #5 (Exercise files) - Independent
- Issue #6 (DRAFT update) - Independent

## 🛠️ Best Practices

### Before Starting Work

1. **Check current status**
   ```bash
   # Check which issues are assigned
   gh issue list --state open --label "in-progress"
   
   # Check which files have been recently modified
   git log --oneline --name-only -10
   ```

2. **Communicate your intent**
   - Comment on the issue: "Starting work on this"
   - Note which files you'll be modifying
   - Tag related issues if conflicts exist

3. **Create a focused branch**
   ```bash
   git checkout -b fix/issue-<number>-<brief-description>
   ```

### During Work

1. **Stay synchronized**
   ```bash
   # Pull latest changes regularly
   git fetch origin main
   git rebase origin/main
   ```

2. **Make atomic commits**
   - One logical change per commit
   - Clear commit messages
   - Easier to resolve conflicts

3. **Test frequently**
   ```bash
   # Build slides to catch errors early
   pnpm build
   
   # Check for broken references
   pnpm dev:dev  # or dev:prod
   ```

### Before Submitting PR

1. **Final sync**
   ```bash
   git fetch origin main
   git rebase origin/main
   ```

2. **Verify builds**
   ```bash
   make clean && make
   ```

3. **List all modified files**
   ```bash
   git diff --name-only origin/main
   ```

4. **Cross-reference with coordination guide**
   - Check if your files conflict with open issues
   - Mention related issues in PR description

## 🔄 Merge Conflict Resolution

If conflicts occur despite coordination:

### For Slide Files (Markdown)

1. **Understand the structure**
   - Slides use `---` separators
   - Each section is independent
   - Usually safe to accept both changes

2. **Resolution pattern**
   ```markdown
   <<<<<<< HEAD
   ---
   # My New Slide
   Content from my branch
   =======
   ---
   # Their New Slide  
   Content from main branch
   >>>>>>> main
   ```
   
   **Resolve to:**
   ```markdown
   ---
   # My New Slide
   Content from my branch
   
   ---
   # Their New Slide
   Content from main branch
   ```

3. **Verify slide order makes sense**
   - Check that the flow is logical
   - Test the presentation

### For Exercise Files

1. **Prefer additive changes**
   - Keep both exercises if both are valuable
   - Number them sequentially

2. **Check for duplicate content**
   - Merge if exercises are too similar
   - Keep the more comprehensive version

## 📊 Issue Assignment Matrix

Use this when assigning multiple issues:

### Can Work in Parallel ✅

| Issue Set | Why Safe |
|-----------|----------|
| #2, #5, #6 | Different files, no overlap |
| #10 (dev) + Any prod issue | Different tracks |
| #45, #59 (if different exercise topics) | Different subdirectories |

### Must Sequence ⚠️

| Sequence | Reason |
|----------|--------|
| #1 → #3 → #4 | #1 creates file, #3 & #4 modify it |
| #1 → #7 | #7 references content from #1-#4 |
| #61-#68 (dev-advanced-github.md) | Same file, too many conflicts |
| #49-#57 (dev-sonarqube-xray.md) | Same file, too many conflicts |

### Require Coordination 🤝

| Issue Pair | Coordination Needed |
|------------|---------------------|
| #3, #4 | Both modify prod-k8s-apps.md - assign sections |
| #57, #58 | Both modify README.md - sequence or coordinate |
| #34-#40 (dev-ci.md) | Multiple issues - use section assignments |

## 📞 Communication Channels

When coordinating:

1. **GitHub Issue Comments**
   - Tag related issues: "Related to #XX"
   - Mention assignees: "@username"
   - Update status regularly

2. **PR Descriptions**
   - List all files modified
   - Mention dependent/conflicting issues
   - Note any deviations from original plan

3. **Commit Messages**
   ```
   Add matrix builds section to dev-advanced-github.md (#61)
   
   - Added 3 slides on matrix build configuration
   - Included examples for multiple Node versions
   - Related to #62, #63 (also updating this file)
   ```

## 🎓 Examples

### Example 1: Coordinating Issues #3 and #4

**Problem**: Both modify `prod-k8s-apps.md`

**Solution**:
```markdown
Issue #3 assignee comment:
"I'll handle lines 1-200 (external access, ingress, TLS). 
Will merge by Friday. @issue4-assignee can start after."

Issue #4 assignee response:
"Got it. I'll work on a separate file prod-scaling-lb.md instead,
or wait for your PR to merge and add scaling sections after line 200."
```

### Example 2: Breaking Up dev-advanced-github.md Issues

**Problem**: 9 issues (#60-#68) all modify same file

**Solution**: Create a coordination issue
```markdown
Title: Coordination: dev-advanced-github.md improvements (#60-#68)

Structure:
- Lines 1-50: Introduction and triggers (#61)
- Lines 51-100: Reusable workflows (#62)
- Lines 101-150: Security (#63)
- Lines 151-200: Project management (#64)
- Lines 201-250: Exercises (#65)
- Lines 251-300: Visuals (#67)
- Lines 301-350: Timing (#66)
- Lines 351-400: Troubleshooting (#68)
- Lines 401-450: Best practices (#60) - NEW: instructor notes

Assignments:
- Week 1: #61, #62
- Week 2: #63, #64  
- Week 3: #65, #67
- Week 4: #66, #68, #60
```

## ✅ Checklist for Issue Coordinators

Before assigning issues:
- [ ] Check this guide for file conflicts
- [ ] Review the dependency matrix in ISSUES_TO_CREATE.md
- [ ] Identify if issues must be sequenced
- [ ] Determine if parallel work is possible with coordination
- [ ] Create coordination issue if needed for complex files
- [ ] Communicate assignment plan to all assignees
- [ ] Set up milestone or project board for tracking

During active work:
- [ ] Monitor PR progress
- [ ] Facilitate communication between assignees
- [ ] Adjust plan if conflicts emerge
- [ ] Ensure sequential issues don't start too early

After completion:
- [ ] Update this guide if new patterns emerge
- [ ] Document lessons learned
- [ ] Celebrate successful coordination! 🎉

## 📚 Additional Resources

- See `ISSUES_TO_CREATE.md` for detailed dependency matrix on production track issues
- Use `git log --graph --oneline --all` to visualize branch relationships
- GitHub Projects can help track issue dependencies visually

---

**Last Updated**: 2025-11-07
**Maintainer**: Project coordinators should keep this guide updated as new issues are created or patterns emerge.
