# Development Conventions  
  
## Branch Naming  
  
`<type>/<ISSUE_ID>-<short>`  
  
Remember that this is still a branch, everything except the ISSUE_ID should be in  
lowercase.  
I opted for Lowercase & Kebab-case Rule  
  
Example: `feat/FFL-1-something-short`  

Notice here the use of hiphens in cabab style.  

- Type: Categorizes the branch, as for example:  
  - `feat` for new features  
  - `fix` for bug fixes  
  - `chore` for changes that don’t add a feature, fix a bug, or affect user-facing behavior  
  -  `test` for tests  
  
- Issue ID: Generally try to stick to using Stories and Tasks for Naming Branches  
- Short: Stick to a short name for the branch - Name will be related to the Issue  
  it is covering. A task might be more technical while a story more what you are  
  developing for the benefiting party.  
  
## Commit Naming  
  
`<ISSUE_ID> <type>(<scope>): <subject>`   
  
Example: `FFL-2 feat(auth): add Google OAuth integration`  
  
Up till now, I used Upper case for the subject, but from now on I will use all  
lowercase unless necessary for things like product names as above.  
  
- Type: Categorizes the change, as for example:  
  - `feat` for new features  
  - `fix` for bug fixes  
  - `refactor` for code restructuring  
  - `docs` for documentation changes  
  - `chore` for changes that don’t add a feature, fix a bug, or affect user-facing behavior  
  - `test` for tests  
  - `perf` for performance related  
  - `ci` for pipeline  
- Scope: Specifies the part of the codebase affected (e.g., `auth`, `ui`, `database`).  
- Subject: A concise, imperative, present-tense summary of the change, typically  
           limited to 50 characters and without ending punctuation.  
- Issue ID: Generally a story should not be covered in a single commit. Try to  
            stick to Tasks and Subtasks. But especially subtasks.  
  
# Merging  
  
Merging conventions of our git branching strategy.  
Our git branching strategy is only properly used when we do merges as follows:
  
## Merging develop to feature

Here feature can mean any one of the type categories above.  
You will do this regularly while working in a branch to keep your branch updated
with the latest stable change to develop branch (Assured given our strategy).
  
***Cheat Sheet:***
  
## Merging feature to develop

Here you are done with your story or task branch and you are merging it back into  
develop note you can only do this if you know your branch is in a working state.  
If it is not, and your story or task is done, you create a new branch from your  
current branch (not main) and continue.  
  
***Cheat Sheet:***
 - git fetch origin
 - 
  
  
# Branch, Commit and Jira Strategy  
  
#### Epics  
  
Epics are not constrained to the requirements of being completed in a sprint.  
  
There are 4 epics as follows:  
  
- Account Roles and Data Management  
- Player Gameplay Interfaces and Mechanics  
- Admin Control Panel and Attack Tools  
- Game Engine and Data Services  
  
They are under which all stories and tasks will fall.  
  
#### Stories  
  
Stories should be small enough to be completed at most within a sprint — ideally 2–5 days of work.  
  
(Remember will start at different stages in the sprint, plan accordingly)  
  
As a ***[type of user]***, I want ***[goal]*** so that ***[benefit]***  
  
(Here type of user can be - Player, Developer, Admin, etc.)  
  
#### Tasks  
  
Tasks are for things that don't fit this structure and bugs.  
  
#### Subtasks  
  
Subtasks can be used to fall under both **stories** and **tasks**.  
They can be used for splitting something like a story that can be a Sprint long  
effort, into smaller parts what can range from a few hours to a few days.  
  
  
## Correlation to Branches and Commits  
  
| Jira Item | Branch? (y - yes, n - no) | Commit? (y - yes, n - no) |  
| --------- | ------------------------- | ------------------------- |  
| Epic      | n - No branch             | n - No commit             |  
| Story     | y - Usually               | n - Commits are subtasks  |  
| Task      | y - If large              | y - If small, commit only |  
| Subtask   | n- No branch              | y - Always commit         |  
