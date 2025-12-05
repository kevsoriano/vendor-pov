# Git

## Prerequisites

*You only need to set this up once per machine.*

1. Install Git if you don't already have it.
    a. You can check your git version by running git --version in the terminal
2. Set up your name and email, if you haven't already
```
git config --global user.name "Your Name"
git config --global user.email "your-email@email.com"
```
Check that your settings are correct by running:
```
git config user.name
git config user.email
```

## Clone Repository
```
git clone https://github.com/kevsoriano/vendor-pov.git
```

## Developer Workflow

1. Go to the working directory of the repository
```
cd vendor-pov
```
2. Download all branches and tags from your remote repository into your local repository
* To list all your remote repositories, run git remote -v
```
git fetch origin
```

3. Checkout the appropriate "base" branch.
```
git checkout master
```

4. Pull any updates from the remote branch
```
git pull --rebase
```

5. Checkout a local branch to make changes to
* Use prefix and your initials in our branch naming convention. e.g. kgs/feature/custom-description
```
git checkout -b <my-local-branch-name>
```

6. Make changes to the code

7. Stage your changes
```
git add .
```

8. Commit your changes
```
git commit -m "My commit message"
```

9. If you realize that you are not done and want to make more changes, you can amend those changes to your commit
```
git add . # Do more changes and then add to the index
git commit --amend # Update (rewrite) the current commit
```

10. Push changes
```
git push
```

### Merging feature branch into *main* branch
1. Checkout the target branch: switch to the branch you want to merge into.
```
git checkout master
```
2. Pull latest changes
```
git pull --rebase
```

3. Merge the source branch
```
git merge kgs/feature/branch-name
```

4. Resolve conflicts (if any):
If there are conflicting changes between the two branchers, Git will pause the merge and ask you to resolve them manually. Edit the conflicting files, then stage them using git add, and continue the merge with *git commit*.

5. Complete the merge:
Once all conflicts are resolved (or if there were none), Git will create a new merge commit, combining the changes from both branches.

6. To delete the local branches pointing to merged branches.
```
git fetch -p && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D
```

### Revert changes

1. Undoing a Local Commit (Not yet pushed):
git reset: This command modifies the commit history.
git reset --soft HEAD~1: Undoes the last commit but keeps the changes in the staging area. The files remain staged, ready for a new commit.
git reset --mixed HEAD~1: (or simply git reset HEAD~1): Undoes the last commit and unstages the changes. The changes remain in your working directory.
git reset --hard HEAD~1: Undoes the last commit and discards all changes made in that commit from both the staging area and the working directory. Use with caution as this deletes local changes. 
To undo multiple commits, replace HEAD~1 with HEAD~N, where N is the number of commits to undo.

2. Undoing a Pushed Commit (Shared History):
git revert: This is the recommended and safest method for undoing pushed commits as it creates a new commit that reverses the changes of the target commit, preserving the history.
git revert <commit-hash>: Creates a new commit that undoes the changes introduced by the specified commit. You will be prompted to edit the revert commit message.
git revert HEAD: Reverts the most recent commit. 

Some basic Git commands are:
```
git status
git add
git commit
```