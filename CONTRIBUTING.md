## Contributing
1. Clone the repository
```
git clone https://github.com/Daschle-Newberry/WebCasino
```
2. Add remote
```
git remote add origin https://github.com/Daschle-Newberry/WebCasino
```
or on linux with SSH

```
git remote add orgin git@github:Daschle-Newberry/WebCasino.git
```
3. Create a new local branch
```
git branch -m Your-Name
```
4. Go to the project page, and create new issue(s) for what you want to work on
5. Make sure to add yourself to the issue, and set a time estimate (if you want).
6. When ready, commit your code to your branch<br>
```
git checkout Your-Name
git add *
git status
git commit -m "message"
git push origin Your-Name
```
7. When you want to push to the main branch
```
git checkout main
git pull origin main
git merge origin/Your-Name
git commit -m "..., resolves #_"
git push origin main
```
***Please make sure to discuss any merge conflicts with the team***

***Always pull and merge main into your current working branch before working on your code to ensure you are up to date.***

## Running the Project
1. Start the webserver
```
npm start
```
2. Start tsc in watch mode in a new terminal window ***(optional)***
```
npx tsc --watch
```

**The following compile error will be present:**
```
Cannot find module 'react-router-dom'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?
```

**This is fine, it's an issue with imports and compiling to JSX, the code still functions.**