
import ServiceManager from '../services/SvcManager'
import { serverConfig as config } from 'c0nfig'
import express from 'express'

module.exports = function() {

  var router = express.Router()

  /////////////////////////////////////////////////////////////////////////////
  // Register socketId from client
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/register', function (req, res) {

    console.log('Registering socket: ' + req.body.socketId)

    req.session.socketId = req.body.socketId

    res.json('success')
  })

  /////////////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  router.get('/details/:data', function (req, res) {

    try {

      var data = JSON.parse(req.params.data)

      res.json(data)

    } catch (ex) {

      res.json(ex)
    }
  })

  return router
}
