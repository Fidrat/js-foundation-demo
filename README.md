# Vanilla js ES5 & ES6 functionalities


## Installation

Install/update nvm as explained here

https://github.com/creationix/nvm

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

Close and reopen your terminal

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

Install dependencies
```bash
npm install bower -g
npm install
bower install
```

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