
import ServiceManager from '../services/SvcManager'
import { serverConfig as config } from 'c0nfig'
import findRemoveSync from 'find-remove'
import express from 'express'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'

module.exports = function() {

  var router = express.Router()

  ///////////////////////////////////////////////////////////////////
  // start cleanup task to remove uploaded temp files
  //
  ///////////////////////////////////////////////////////////////////
  setInterval( () => {

    findRemoveSync('TMP', {
      age: { seconds: 3600 }
    }), 60 * 60 * 1000
  })

  //////////////////////////////////////////////////////////////////////////////
  // Initialization upload
  //
  ///////////////////////////////////////////////////////////////////////////////
  var storage = multer.diskStorage({

    destination: 'TMP/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })

  var upload = multer({ storage: storage })

  /////////////////////////////////////////////////////////////////////////////
  // POST /upload/dm/:projectId/:folderId
  // Upload file to DataManagement
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/dm/:projectId/:folderId', upload.any(), async (req, res) => {

    try {

      var projectId = req.params.projectId

      var folderId = req.params.folderId

      var file = req.files[0]

      var forgeSvc = ServiceManager.getService(
        'ForgeSvc');

      var token = await forgeSvc.getToken(req.sessionID)

      var dmSvc = ServiceManager.getService('DMSvc')

      var response = await dmSvc.upload(
        token.access_token,
        projectId,
        folderId,
        file)

      res.json(response)
    }
    catch (ex) {

      console.log(ex)

      res.status(ex.status || 500)
      res.json(ex)
    }
  })

  /////////////////////////////////////////////////////////////////////////////
  // POST /upload/oss/:bucketKey
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/oss/:bucketKey', upload.any(), async (req, res) => {

    try {

      var bucketKey = req.params.bucketKey

      var file = req.files[0]

      var objectKey = file.originalname

      var forgeSvc = ServiceManager.getService(
        'ForgeSvc');

      var token = await forgeSvc.getToken('2legged')

      var ossSvc = ServiceManager.getService('OssSvc')

      var response = await ossSvc.putObject(
        token.access_token,
        bucketKey,
        objectKey,
        file)

      res.json(response)
    }
    catch (ex) {

      res.status(ex.status || 500)
      res.json(ex)
    }
  })

  return router
}