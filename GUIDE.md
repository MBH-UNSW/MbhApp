# UBH Software Git Team Housekeeping Guide 🐱🫀

Welcome to our Git guide!

This document explains the Git workflow that our team should follow when creating branches, making commits, and keeping the project organized.

The goal is to keep our repository clean, readable, and easy for everyone on the team to work with.

---

## Table of Contents

1. [General Rules](#general-rules)
2. [Branch Workflow](#branch-workflow)
3. [Commit Workflow](#commit-workflow)
4. [Quick Reference](#quick-reference)

---

## General Rules

Before touching the code, please keep these rules in mind:

- Do not push directly to the `main` branch.
- Create a new branch for every feature, fix, or task.
- Use clear and consistent branch names.
- Commit your work often.
- Keep commits small and focused.
- Use Conventional Commits for commit messages.
- Make sure your branch name and commit messages are easy for other teammates to understand.

---

## Branch Workflow

Create a new branch every time you work on a new feature, bug fix, or task.

Do not reuse the same branch for multiple unrelated changes.


### Branch Naming Convention

Use the following branch naming format:

```bash
git checkout -b 'your_name/page_or_category/feature/more_subcategories'
```

#### Branch Naming Parts

| Part | Description |
|---|---|
| `your_name` | Your name or nickname |
| `page_or_category` | The page, feature area, or folder you are working on |
| `feature` | The specific feature, fix, or task |
| `more_subcategories` | Optional extra details if needed |


### Branch Naming Examples

```bash
git checkout -b 'lipda/components/button'
git checkout -b 'lipda/components/theme/color'
git checkout -b 'lipda/homePage'
git checkout -b 'lipda/logBook/fileUploader'
git checkout -b 'lipda/homePage/emergencyBtn/fix'
git checkout -b 'lipda/docs/readme/update'
```

---

## Commit Workflow

Commit your work often while developing.

You should create a commit whenever you finish a meaningful change.

Examples of meaningful changes:

- Creating a new component
- Fixing a specific bug
- Updating a function
- Refactoring a file
- Updating documentation
- Adding tests
- Improving styling

Avoid making one large commit with many unrelated changes.

### Commit Message Format

Use the following format:

```bash
git commit -m "type: description"
```

The `type` should describe the category of the change.

The `description` should explain what changed in a short and clear sentence.

### Conventional Commits

Use Conventional Commits to keep commit messages consistent.

| Type | Description |
|---|---|
| `feat` | A new feature for the user |
| `fix` | A bug fix for the user |
| `docs` | Documentation-only changes |
| `style` | Formatting, missing semicolons, spacing, etc. No production code changes |
| `refactor` | Code changes that do not fix a bug or add a feature, such as renaming variables or restructuring code |
| `perf` | Code changes that improve performance |
| `test` | Adding missing tests or correcting existing tests |
| `chore` | Regular maintenance tasks, such as dependency updates or config changes |

### Commit Message Examples

```bash
git commit -m "feat: add emergency button to homepage"
git commit -m "fix: fix button styling"
git commit -m "refactor: refactor card element from homepage"
git commit -m "style: add missing semicolons in TypeScript files"
git commit -m "docs: edit README.md"
```

---

## Quick Reference

#### Create a New Branch

```bash
git checkout -b 'your_name/category/feature'
```

#### Check Current Changes

```bash
git status
```

#### Stage Changes

```bash
git add .
```

#### Commit Changes

```bash
git commit -m "type: description"
```

#### Push Branch

```bash
git push
```

#### Update Main Branch
```bash
git checkout main
git pull origin main
```
---

If someone breaks the code, we have a deal between us:

Meal for the 4 of us! 🍽️

## Happy UBH Frontend Software Team!
