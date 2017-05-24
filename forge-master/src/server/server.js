///////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2016 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
///////////////////////////////////////////////////////////////////////
import {serverConfig as config} from 'c0nfig'

//Server stuff
import cookieParser from 'cookie-parser'
import Session from 'express-session'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import express from 'express'
import helmet from 'helmet'
import path from 'path'

//Webpack hot reloading stuff
import webpackConfig from '../../webpack/webpack.config.development'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'

//Endpoints
import DerivativeAPI from './api/endpoints/derivatives'
import UploadAPI from './api/endpoints/upload'
import ForgeAPI from './api/endpoints/forge'
import UserAPI from './api/endpoints/user'
import AppAPI from './api/endpoints/app'
import OssAPI from './api/endpoints/oss'
import DMAPI from './api/endpoints/dm'

//Services
import DerivativeSvc from './api/services/DerivativeSvc'
import SocketSvc from './api/services/SocketSvc'
import ForgeSvc from './api/services/ForgeSvc'
import OssSvc from './api/services/OssSvc'
import DMSvc from './api/services/DMSvc'

/////////////////////////////////////////////////////////////////////
// Webpack hot-reloading setup
//
/////////////////////////////////////////////////////////////////////
function setWebpackHotReloading(app) {

    var compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }))

    app.use(webpackHotMiddleware(compiler))
}

/////////////////////////////////////////////////////////////////////
// App initialization
//
/////////////////////////////////////////////////////////////////////
var app = express()

if(process.env.WEBPACK == 'hot')
    setWebpackHotReloading(app)

app.use('/resources', express.static(__dirname + '/../../resources'))
app.use(favicon(__dirname + '/../../resources/img/forge.png'))
app.use('/', express.static(__dirname + '/../../dist/'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

var store = new Session.MemoryStore

var session = Session({
    secret: 'peperonipizza',
    saveUninitialized: true,
    resave: true,
    store: store
})

app.use(helmet())
app.use(session)

/////////////////////////////////////////////////////////////////////
// Routes setup
//
/////////////////////////////////////////////////////////////////////
app.use('/api/derivatives', DerivativeAPI())
app.use('/api/upload', UploadAPI())
app.use('/api/forge', ForgeAPI())
app.use('/api/user', UserAPI())
app.use('/api/app', AppAPI())
app.use('/api/oss', OssAPI())
app.use('/api/dm', DMAPI())

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function runServer() {

    try {

        process.on('exit', () => {

        })

        process.on('uncaughtException', (err) => {

            console.log('uncaughtException')
            console.log(err)
            console.error(err.stack)
        })

        process.on('unhandledRejection', (reason, p) => {

            console.log('Unhandled Rejection at: Promise ', p,
              ' reason: ', reason)
        })

        var server = app.listen(
          process.env.PORT || config.port || 3000, () => {

              var socketSvc = new SocketSvc({
                  config: {
                      server,
                      session
                  }
              })

              var derivativeSvc = new DerivativeSvc({
                  config: config.forge
              })

              var forgeSvc = new ForgeSvc({
                  config: config.forge
              })

              var ossSvc = new OssSvc({
                  config: Object.assign(
                    config.forge, {
                        storageFile: path.resolve(
                          __dirname,
                          `../../settings/oss.${config.forge.oauth.clientId}.json`)
                    })
              })

              var dmSvc = new DMSvc({
                  config: config.forge
              })

              console.log('Server listening on: ')
              console.log(server.address())
              console.log('ENV: ' + process.env.NODE_ENV)
          })

    } catch (ex) {

        console.log('Failed to run server... ')
        console.log(ex)
    }
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
runServer()