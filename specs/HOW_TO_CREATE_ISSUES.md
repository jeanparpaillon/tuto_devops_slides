# Creating Issues from ISSUES_TO_CREATE.md

This guide helps you create the production track issues on GitHub with proper dependency tracking.

## Prerequisites

Before creating issues:
- [ ] Read ISSUE_COORDINATION_GUIDE.md
- [ ] Review the dependency matrix in ISSUES_TO_CREATE.md
- [ ] Understand the recommended assignment order
- [ ] Have permissions to create issues in the repository

## Option 1: Manual Creation (Recommended for Small Teams)

### Step-by-Step Process

For each issue in ISSUES_TO_CREATE.md:

1. **Go to GitHub Issues**
   - Navigate to: https://github.com/jeanparpaillon/tuto_devops_slides/issues
   - Click "New Issue"

2. **Copy Title**
   - Use the exact title from ISSUES_TO_CREATE.md
   - Example: "Create missing slide file for Kubernetes application deployment"

3. **Copy Body**
   - Copy the markdown content from the Body section
   - Paste into GitHub issue description

4. **Add Labels**
   - Add all labels specified in the template
   - Example for Issue #1: `slides`, `kubernetes`, `bug`, `high-priority`
   - Create new labels if they don't exist

5. **Add Dependency Information**
   - Copy the "⚠️ File Dependencies" section into issue body
   - This ensures all assignees see dependency warnings

6. **Link Related Issues**
   - In the issue body, add:
     ```markdown
     ## Related Issues
     - Blocks: #XX, #YY (replace with actual issue numbers)
     - Depends on: #ZZ (replace with actual issue numbers)
     - Conflicts with: #AA (replace with actual issue numbers)
     ```

7. **Add to Project Board** (if applicable)
   - Add to appropriate project board
   - Set status to "Backlog"

8. **Create Issue**
   - Click "Submit new issue"
   - Note the issue number

9. **Update Cross-References**
   - Go back and update related issues with new issue number
   - Update "Blocks", "Depends on", "Conflicts with" links

### Issue Creation Order

Create in this order to establish proper references:

```
1. Issue #1 (prod-k8s-apps.md) - Note issue number: e.g., #100
2. Issue #2 (Ansible integration) - Note issue number: e.g., #101
3. Issue #3 (External access) - Link to #100
4. Issue #4 (Scaling/DNS) - Link to #100
5. Issue #5 (Exercise files) - Note issue number: e.g., #104
6. Issue #6 (DRAFT update) - Note issue number: e.g., #105
7. Issue #7 (2-day deck) - Link to #100, #101, #102, #103
```

### Template for Linking

When creating Issue #3, add to body:
```markdown
## ⚠️ Dependencies

**DEPENDS ON**: #100 - This issue modifies `prod-k8s-apps.md` which must be created first by Issue #100.

**CONFLICTS WITH**: #102 - Both issues modify the same file. Coordinate sections or sequence work.

See [ISSUE_COORDINATION_GUIDE.md](../ISSUE_COORDINATION_GUIDE.md) for coordination strategies.
```

## Option 2: GitHub CLI (Faster for Bulk Creation)

### Setup

```bash
# Install GitHub CLI if not already installed
# See: https://cli.github.com/

# Authenticate
gh auth login
```

### Create Issues with gh CLI

```bash
# Navigate to repository
cd /path/to/tuto_devops_slides

# Issue #1
gh issue create \
  --title "Create missing slide file for Kubernetes application deployment" \
  --label "slides,kubernetes,bug,high-priority" \
  --body-file <(cat << 'EOF'
## Description

The file `slides/pages/prod-k8s-apps.md` is referenced in `slides/formation-prod.md` (line 40) but does not exist.

## ⚠️ File Dependencies
- **Creates**: `slides/pages/prod-k8s-apps.md`
- **References**: `slides/formation-prod.md`
- **⚠️ BLOCKS**: Issues for external access and scaling (will be created next)

[Full details in ISSUES_TO_CREATE.md]
EOF
)

# Note the issue number returned, e.g., #100

# Issue #2
gh issue create \
  --title "Enhance Day 3 slides for Ansible and K8s integration" \
  --label "slides,ansible,enhancement,day3" \
  --body "See ISSUES_TO_CREATE.md Issue #2 for full details"

# Continue for remaining issues...
```

### Script for Bulk Creation

Create a script `create_issues.sh`:

```bash
#!/bin/bash

# Create Issue #1
ISSUE_1=$(gh issue create \
  --title "Create missing slide file for Kubernetes application deployment" \
  --label "slides,kubernetes,bug,high-priority" \
  --body "See ISSUES_TO_CREATE.md Issue #1" \
  --json number -q .number)

echo "Created Issue #$ISSUE_1"

# Create Issue #2
ISSUE_2=$(gh issue create \
  --title "Enhance Day 3 slides for Ansible and K8s integration" \
  --label "slides,ansible,enhancement,day3" \
  --body "See ISSUES_TO_CREATE.md Issue #2" \
  --json number -q .number)

echo "Created Issue #$ISSUE_2"

# Create Issue #3 with dependency
ISSUE_3=$(gh issue create \
  --title "Improve Day 4 slides for external application deployment patterns" \
  --label "slides,kubernetes,ingress,enhancement,high-priority" \
  --body "Depends on #$ISSUE_1. See ISSUES_TO_CREATE.md Issue #3" \
  --json number -q .number)

echo "Created Issue #$ISSUE_3"

# etc...

echo ""
echo "Summary:"
echo "Issue #1 (prod-k8s-apps): #$ISSUE_1"
echo "Issue #2 (Ansible): #$ISSUE_2"
echo "Issue #3 (External access): #$ISSUE_3"
echo ""
echo "Next steps:"
echo "1. Review created issues"
echo "2. Add detailed bodies from ISSUES_TO_CREATE.md"
echo "3. Update cross-references"
echo "4. Add to project board"
```

## Option 3: Issue Templates (Best for Recurring Patterns)

### Create GitHub Issue Templates

Create `.github/ISSUE_TEMPLATE/production-slide-enhancement.md`:

```markdown
---
name: Production Slide Enhancement
about: Enhance or create production training slides
title: ''
labels: slides, enhancement
assignees: ''
---

## Description

[Describe what needs to be added or changed]

## ⚠️ File Dependencies

- **Modifies**: `slides/pages/XXX.md`
- **Creates**: `slides/pages/YYY.md` (if applicable)
- **Depends on**: #XX (if applicable)
- **Conflicts with**: #YY (if applicable)

See [ISSUE_COORDINATION_GUIDE.md](../ISSUE_COORDINATION_GUIDE.md) for coordination strategies.

## Proposed Content

[Outline the content to add]

## Acceptance Criteria

- [ ] Content follows theme structure
- [ ] Includes code examples
- [ ] Slides build successfully
- [ ] No broken references

## Files to Update

- `slides/pages/XXX.md`
- Other files if needed

## Reference

- See ISSUES_TO_CREATE.md
- See PRODUCTION_IMPROVEMENTS.md
```

## Post-Creation Checklist

After creating all issues:

- [ ] All 7 issues created
- [ ] Each issue has proper labels
- [ ] Dependency information included in each issue body
- [ ] Cross-references updated (Issue #3 links to Issue #1, etc.)
- [ ] Issues added to project board if applicable
- [ ] Team notified of new issues
- [ ] Coordination plan shared with team
- [ ] ISSUE_COORDINATION_GUIDE.md referenced in team communication

## Assignment Planning

After issues are created, use this matrix for assignment:

| Week | Issues to Assign | Notes |
|------|------------------|-------|
| Week 1 | #1 (Critical), #2, #5, #6 (Independent) | Maximize parallelism |
| Week 2 | #3 and #4 (After #1 done) | Coordinate sections |
| Week 3 | #7 (After content done) | Structural change |

## Communication Template

Send to team after creating issues:

```
Subject: New Production Track Issues Created

Hi team,

I've created 7 new issues for the production training enhancements:

Critical (do first):
- #100: Create prod-k8s-apps.md

Independent (can do in parallel):
- #101: Ansible integration
- #104: Exercise files
- #105: DRAFT update

Dependent (after #100):
- #102: External access
- #103: Scaling & DNS

Structural (do last):
- #106: 2-day slide deck

Please review:
- ISSUE_COORDINATION_GUIDE.md for coordination strategies
- Each issue for file dependency warnings

Before starting work:
1. Check which files you'll modify
2. Comment on issue to claim it
3. Coordinate with others on same file

Questions? Check FILE_DEPENDENCY_QUICK_REF.md or ask in #dev-chat.
```

## Troubleshooting

### Problem: Can't create labels

**Solution**: Ask repository admin to create labels or create them manually via Settings → Labels

### Problem: Lost track of issue numbers

**Solution**: 
```bash
gh issue list --label "slides" --json number,title
```

### Problem: Need to update many issues with cross-references

**Solution**: Use gh CLI to update:
```bash
gh issue edit 102 --body "Depends on #100. $(gh issue view 102 --json body -q .body)"
```

### Problem: Duplicate issues created

**Solution**: Close duplicates and reference the original:
```bash
gh issue close 107 --comment "Duplicate of #102"
```

## Best Practices

1. **Create all at once**: Easier to manage cross-references
2. **Use consistent labels**: Helps with filtering and organization
3. **Link immediately**: Don't wait to add dependency links
4. **Test one first**: Create Issue #1 as test, verify template works
5. **Document numbers**: Keep a mapping file of issue numbers to template issues
6. **Communicate early**: Share with team before bulk creation
7. **Use projects**: Add to project board for better tracking

## Next Steps

After creating issues:
1. Review ISSUE_COORDINATION_GUIDE.md
2. Plan first sprint assignments
3. Communicate plan to team
4. Monitor for conflicts during execution
5. Update guides based on learnings

---

**Remember**: The goal is to prevent conflicts, not just track them. Use the dependency information to plan work smartly!
