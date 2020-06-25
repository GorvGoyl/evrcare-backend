# Guidelines

- follow guidelines from evrcare-app repo
- use cross platform Powershell for commands to avoid any platform specific syntax issues https://github.com/powershell/powershell#get-powershell. Tips: Use `&` for parallel commands, `;` for sequential commands, To stop running commands: ctrl+C

# Multiple ENV

- check: `firebase use`
- use specific env for run & debug: `firebase use prod`
- deploy to specific env: `firebase deploy -P dev --only functions`

# RUN

- use `package.json` scripts to run, debug, & deploy

`firebase serve` // to run hosting + functions
`firebase serve --host 0.0.0.0` // to also run in mobile
`firebase serve --host 0.0.0.0 --only functions`

- to point local firestore, add below to firebase json "emulators"
  "firestore": {
  "port": 8080
  },

# DEBUG FUNCTIONS

- use `package.json` scripts to run, debug, & deploy

## vscode debugger

1. `npm run hotReload`
2. `firebase emulators:start --only functions --inspect-functions`
3. Run `Attach` or press `F5`

## see functions logs in terminal

https://firebase.google.com/docs/functions/local-shell

2. `firebase functions:shell` //execute trigger functions in terminal and look for logs
3. or `firebase serve` //look for terminal logs

## see logs of deployed functions in vscode console

- `firebase functions:log --only <method name>` //for specific function

- `firebase functions:log` //for all functions

- `firebase help functions:log` //see help

# DEPLOY

- use `package.json` scripts to run, debug, & deploy

# SERVER LOCATION

- `GCP` & `firestore` region: `asia-south1` (mumbai)
- `functions` region: `asia-east 2` (HK)

## Emulators

to test emulators paste after functions object in firebase.json

```
,
  "emulators": {
    "functions": {
      "port": 5001
    },
    "firestore": {
      "port": 8080
    },
    "pubsub": {
      "port": 8085
    },
    "ui": {
      "enabled": true
    }
  }
```
