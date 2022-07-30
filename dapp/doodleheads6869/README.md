This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


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