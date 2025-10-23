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