# Vanilla js ES5 & ES6 functionalities


## Installation

Install/update nvm as explained here 
https://github.com/creationix/nvm

Or just run this command and then **close and reopen your terminal**

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

```bash
nvm --version
```

Install latest Node.js (This demo had been built with 9.4.0)

```bash
nvm ls-remote
nvm install x.x.x
nvm ls
```

```bash
git clone https://github.com/Fidrat/js-foundation-demo.git
cd js-foundation-demo
```

Install dependencies, if you run into "file not found" problems it is probably a file permission problem. See below.
```bash
npm install bower -g
npm install
bower install
```

This command will probably give you the appropriate permissions. **DO NOT run install with sudo**
```bash
sudo chown -R $USER:$(id -gn $USER) /home/$USER/.config
```
If it does not solve it, close and reopen your terminal again, nvm will tell you more details.


### Launch

Build the project and launch the server with livereload

```bash
foundation watch
```
OR
```bash
npm start
```

open http://localhost:8080/ in a browser


### Optionnal install to get more control over the project

```bash
npm install -g foundation-cli
npm install -g gulp
```