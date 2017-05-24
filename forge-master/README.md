# Forge APIs Sample

## Description
Forge APIs Demo Sample. A Node.js/babel/webpack/ES7 sample that demos many of the features exposed by [Autodesk Forge](http://forge.autodesk.com) APIs

## Live Demo

[https://forge.autodesk.io](https://forge.autodesk.io)


## Configuration

This sample is relying on environment variables to avoid hard-coding your credentials in plain text. It is using two configuration files (***config/development.config.js*** and ***config/production.config.js***) that you need to edit based on your settings.
The recommended way is to create the following environment variables (respectively for DEV and PROD):

    FORGE_DEV_CLIENTID
    FORGE_DEV_CLIENTSECRET

    FORGE_CLIENTID
    FORGE_CLIENTSECRET

You need to set those env variables with Forge API credentials obtained from the [Autodesk developer portal](https://developer.autodesk.com/)

## Build & Deployment

Assuming you have node.js and webpack installed on the machine (otherwise install them from the web)

    npm install
    node bin/run.js
    http://localhost:3000

The post-install step will build the sample for production, you may want to run "npm run build-dev" if you plan to test locally

Server runs on port 3000, assuming you didn't modify the default port in config, otherwise adapt to your settings

## License

[MIT License](http://opensource.org/licenses/MIT).

## Written by 

Written by [Philippe Leefsma](http://twitter.com/F3lipek)
Autodesk Developer Network.

