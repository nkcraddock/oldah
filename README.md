# oldah 0.0.1

## client
An angular js client based on ng-boilerplate.

* Jade
* CoffeeScript
* Hosted with grunt-contrib-connect for development
* Authentication via google

## server
A restify server based on [node-restify-boilerplate](https://github.com/dominiklessel/node-restify-boilerplate)

* uses google bearer token for authorization 

```
$ git clone git@github.com:nkcraddock/oldah

# client
$ cd oldah/client && npm install && bower install && grunt watch

# server
$ cd oldah/server && npm install && node app.js
```
