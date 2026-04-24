## Contributing
1. Clone the repository
```
git clone https://github.com/Daschle-Newberry/WebCasino
```
2. Add remote
```
git remote add origin https://github.com/Daschle-Newberry/WebCasino
```
3. Create a new local branch
```
git branch -m Your-Name
```
4. Go to the project page, and create new issue(s) for what you want to work on
5. Make sure to add yourself to the issue, and set a time estimate (if you want).
6. When ready, commit your code to your branch
```
git add *
git status
git commit -m "message"
git push origin Your-Name
```

**Optional**: Add "resolves #_" to the commit message to auto resolve an issue.

7. When you want to push to the main branch
```
git checkout main
git pull origin main
git merge origin/Your-Name
git push origin main
```
**Please make sure to discuss any merge conflicts with the team.**

**Always pull and merge main into your current working branch before working on your code to ensure you are up to date.**
```
git checkout Your-Name
git fetch origin
git merge origin/main
```

## Running the Project
```
npm start
```

**You do not need ```npx tsc --watch```, webpack will auto compile the src tsx files to js**

