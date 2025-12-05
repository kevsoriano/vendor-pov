Prerequisites
You only need to set this up once per machine.
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



Some basic Git commands are:
```
git status
git add
git commit
```

To delete the local branches pointing to merged branches.
```
git fetch -p && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D
```

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