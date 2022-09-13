# Combination API

We have created and deployed an API Gateway configuration, which then points to a Lamda.

In the Lamba, we have business logic to query two different API endpoints and combine the data.

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

### Project structure

.
├── serverless
│   └── functions               # Lambda configuration and source code folder 
├── src
│   ├── functions               # Lambda configuration and source code folder 
│   │   └── combinationAPI
│   │       └── index.ts        # `combinationAPI` lambda source code
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── webpack.config.js           # Webpack configuration
└── tsconfig.paths.json         # Typescript paths
```