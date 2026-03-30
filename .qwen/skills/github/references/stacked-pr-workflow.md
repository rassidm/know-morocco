# Stacked PR Workflow

When working with stacked PRs (multiple branches where each branch targets the previous feature branch), follow this workflow to merge them cleanly into main as individual commits.

## Scenario

You have:
- `main` branch
- `feature/base` branch (from main)
- `feature/feature-a` branch (from feature/base)
- `feature/feature-b` branch (from feature/feature-a)

## Merge Steps

### Step 1: Merge the Base PR

```bash
# Checkout the base branch
git checkout feature/base

# Squash merge into main
gh pr merge --squash --title "feat: base implementation (#123)"
```

### Step 2: Rebase and Merge Subsequent PRs

For each subsequent PR in the stack:

```bash
# Checkout the feature branch
git checkout feature/feature-a

# Rebase onto main, excluding commits already merged
# This replays only the NEW commits from feature-a onto main
git rebase --onto origin/main origin/feature/base

# Force push the rebased branch
git push --force-with-lease origin feature/feature-a

# Update the PR base to main
gh pr edit --base main

# Squash merge into main
gh pr merge --squash --title "feat: feature a (#124)"
```

### Step 3: Repeat for Remaining PRs

Repeat Step 2 for each subsequent PR in the stack, adjusting branch names.

## Handling Conflicts

If a rebase encounters conflicts:

1. Git will pause and mark conflicting files
2. Resolve conflicts manually in your editor
3. Continue the rebase: `git rebase --continue`
4. If you need to abort: `git rebase --abort`

## Best Practices

- **Small, focused PRs**: Each PR in the stack should be a self-contained feature
- **Clear commit messages**: Use conventional commits for easy squashing
- **Review order**: Review from bottom to top of the stack
- **Update frequently**: Rebase onto main regularly to avoid large conflicts

## Commands Reference

| Command | Purpose |
| --- | --- |
| `gh pr create --base <branch>` | Create PR targeting specific branch |
| `gh pr edit --base main` | Change PR target to main |
| `git rebase --onto <new-base> <old-base>` | Rebase excluding already-merged commits |
| `git push --force-with-lease` | Safe force push (won't overwrite others' work) |
| `gh pr checks` | View CI check status |
| `gh pr status` | View PR overview |
