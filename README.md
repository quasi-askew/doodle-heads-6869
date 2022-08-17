# Doodle Heads 6869

[https://doodle-heads-6869.vercel.app/](https://doodle-heads-6869.vercel.app/)

## flow.json

flow.json file has been added to .gitignore to protect sensitive keys in the file. When spinning up this project for the first time, make sure to add one to the root of the project with this setup:

```
{
    "emulators": {
      "default": {
        "port": 3569,
        "serviceAccount": "emulator-account"
      }
    },
    "contracts": {
      "DoodleShot": "./contracts/DoodleShot.cdc",
      "DoodleHeads": "./contracts/DoodleHeads.cdc",
      "DoodleHeads6869": "./contracts/DoodleHeads6869.cdc"
    },
    "networks": {
      "emulator": "127.0.0.1:3569",
      "mainnet": "access.mainnet.nodes.onflow.org:9000",
      "testnet": "access.devnet.nodes.onflow.org:9000"
    },
    "accounts": {
      "emulator-account": {
        "address": "<address here>",
        "key": "<key here>"
      },
      "testnet-account": {
        "address": "<address here>",
        "key": "<key here>"
      }
    },
    "deployments": {
      "testnet": {
        "testnet-account": ["DoodleHeads6869"]
      }
    }
  }
  
```