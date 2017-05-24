
import BaseSvc from './BaseSvc'
import jsonfile from 'jsonfile'
import request from 'request'
import util from 'util'
import fs from 'fs'

export default class OssSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(opts) {

    super(opts)

    this.loadBucketSettings()
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return 'OssSvc'
  }

  /////////////////////////////////////////////////////////////////
  // Read some override on the bucket from a file saved on server
  //
  /////////////////////////////////////////////////////////////////
  loadBucketSettings () {

    jsonfile.readFile(this._config.storageFile,
      (err, settings) => {

        if(err) {

          this._bucketSettings = {}

        } else {

          this._bucketSettings = settings
        }
      })
  }

  /////////////////////////////////////////////////////////////////
  // Returns bucket settings
  //
  /////////////////////////////////////////////////////////////////
  get bucketSettings () {

    return this._bucketSettings
  }

  /////////////////////////////////////////////////////////////////
  // Hides a bucket so it doesn't appear in the UI by default
  //
  /////////////////////////////////////////////////////////////////
  hideBucket (bucketKey, hide) {

    if (!this._bucketSettings[bucketKey]) {

      this._bucketSettings[bucketKey] = {}
    }

    this._bucketSettings[bucketKey].hidden = hide

    jsonfile.writeFile(
      this._config.storageFile,
      this._bucketSettings, {spaces: 2}, function (err) {
      })
  }

  /////////////////////////////////////////////////////////////////
  // Returns bucket list
  //
  /////////////////////////////////////////////////////////////////
  getBuckets (token) {

    var url = this._config.endPoints.buckets

    return requestAsync({
      token: token,
      json: true,
      url: url
    })
  }

  /////////////////////////////////////////////////////////////////
  // Returns bucket details
  //
  /////////////////////////////////////////////////////////////////
  getBucketDetails (token, bucketKey) {

    var url = util.format(
      this._config.endPoints.bucketDetails,
      bucketKey)

    return requestAsync({
      token: token,
      json: true,
      url: url
    })
  }

  /////////////////////////////////////////////////////////////////
  // Returns object list in specific bucket
  //
  /////////////////////////////////////////////////////////////////
  getObjects (token, bucketKey) {

    var url = util.format(
      this._config.endPoints.objects,
      bucketKey)

    return requestAsync({
      token: token,
      json: true,
      url: url
    })
  }

  /////////////////////////////////////////////////////////////////
  // Returns object details
  //
  /////////////////////////////////////////////////////////////////
  getObjectDetails (token, bucketKey, objectKey) {

    var url = util.format(
      this._config.endPoints.objectDetails,
      bucketKey, objectKey)

    return requestAsync({
      token: token,
      json: true,
      url: url
    })
  }

  /////////////////////////////////////////////////////////////////
  // parse objectId into { bucketKey, objectKey }
  //
  /////////////////////////////////////////////////////////////////
  parseObjectId (objectId) {

    var parts = objectId.split('/')

    var bucketKey = parts[0].split(':').pop()

    var objectKey = parts[1]

    return {
      bucketKey,
      objectKey
    }
  }

  /////////////////////////////////////////////////////////////////
  // Creates a new bucket
  //
  /////////////////////////////////////////////////////////////////
  createBucket (token, bucketCreationData) {

    var url = this._config.endPoints.buckets

    bucketCreationData.bucketKey = validateBucketKey(
      bucketCreationData.bucketKey)

    bucketCreationData.policyKey = validatePolicyKey(
      bucketCreationData.policyKey)

    return requestAsync({
      body: bucketCreationData,
      method: 'POST',
      token: token,
      json: true,
      url: url
    })
  }

  /////////////////////////////////////////////////////////////////
  // Uploads object to bucket
  //
  /////////////////////////////////////////////////////////////////
  putObject (token, bucketKey, objectKey, file) {

    return new Promise((resolve, reject) => {

      try {

        fs.readFile(file.path, async(err, data) => {

          if (err) {

            return reject(err)
          }

          var url = util.format(
            this._config.endPoints.object,
            bucketKey, objectKey)

          var response = await requestAsync({
            method: 'PUT',
            headers: {
              //'Content-Type': getMimeType(file),
              'Content-Type': 'application/octet-stream',
              'Authorization': 'Bearer ' + token
            },
            body: data,
            url: url
          })

          resolve(JSON.parse(response))
        })
      }
      catch (ex) {

        reject(ex)
      }
    })
  }

  /////////////////////////////////////////////////////////////////
  // Download object from bucket
  //
  /////////////////////////////////////////////////////////////////
  getObject (token, bucketKey, objectKey) {

    return new Promise((resolve, reject) => {

      var url = util.format(
        this._config.endPoints.object,
        bucketKey, objectKey)

      request({
        url: url,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        encoding: null
      }, function(err, response, body) {

        if(err) {

          return reject(err)
        }

        resolve(body)
      })
    })
  }

  /////////////////////////////////////////////////////////////////
  // Deletes object from bucket
  //
  /////////////////////////////////////////////////////////////////
  deleteObject (token, bucketKey, objectKey) {

    var url = util.format(
      this._config.endPoints.object,
      bucketKey, objectKey)

    return requestAsync({
      method: 'DELETE',
      token: token,
      json: true,
      url: url
    })
  }
}

/////////////////////////////////////////////////////////////////
// REST request wrapper
//
/////////////////////////////////////////////////////////////////
function requestAsync(params) {

  return new Promise( function(resolve, reject) {

    request({

      url: params.url,
      method: params.method || 'GET',
      headers: params.headers || {
        'Authorization': 'Bearer ' + params.token
      },
      json: params.json,
      body: params.body

    }, function (err, response, body) {

      try {

        if (err) {

          console.log('error: ' + params.url)
          console.log(err)

          return reject(err)
        }

        if (body && body.errors) {

          console.log('body error: ' + params.url)
          console.log(body.errors)

          return reject(body.errors)
        }

        if (response && [200, 201, 202].indexOf(
            response.statusCode) < 0) {

          return reject(response.statusMessage)
        }

        return resolve(body.data || body)
      }
      catch(ex){

        console.log(params.url)
        console.log(ex)

        return reject(ex)
      }
    })
  })
}

/////////////////////////////////////////////////////////////////
// Validates bucketKey
//
/////////////////////////////////////////////////////////////////
function validateBucketKey (bucketKey) {

  var result = bucketKey.replace(
    /[&\/\\#,+()$~%. '":*?<>{}]/g,'-')

  return result.toLowerCase()
}

/////////////////////////////////////////////////////////////////
// Validates policyKey
//
/////////////////////////////////////////////////////////////////
function validatePolicyKey (policyKey) {

  policyKey = policyKey.toLowerCase()

  if ([
      'transient',
      'temporary',
      'persistent'
    ].indexOf(policyKey) < 0) {

    return 'transient'
  }

  return policyKey
}

