
import BaseSvc from './BaseSvc'
import request from 'request'
import util from 'util'

export default class DerivativeSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor (opts) {

    super(opts)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name () {

    return 'DerivativeSvc'
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  get jobOutputBuilder () {

    return {

      svf: (opts = {}) => {

        return {
          destination: {
            region: opts.region || 'us'
          },
          formats: [ {
            type: 'svf',
            views: opts.views || ['2d', '3d']
          } ]
        }
      },

      obj: (opts) => {

        return {
          destination: {
            region: opts.region || 'us'
          },
          formats: [ {
            type: 'obj',
            advanced: {
              modelGuid: opts.guid,
              objectIds: opts.objectIds
            }
          } ]
        }
      },

      defaultOutput: (opts = {}) => {

        return {
          destination: {
            region: opts.region || 'us'
          },
          formats: [ {
            type: opts.outputType
          }]
        }
      }
    }
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  postJob (token, input, output) {

    return requestAsync({
      url: this._config.endPoints.job,
      method: "POST",
      token: token,
      json: true,
      body: {
        input,
        output
      }
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getFormats (token) {

    var url = this._config.endPoints.formats

    return requestAsync({
      url: url,
      token: token,
      json: true
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getMetadata (token, urn) {

    var url = util.format(
      this._config.endPoints.metadata,
      urn)

    return requestAsync({
      url: url,
      token: token,
      json: true
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getHierarchy (token, urn, guid) {

    var url = util.format(
      this._config.endPoints.hierarchy,
      urn, guid)

    return requestAsync({
      url: url,
      token: token,
      json: true
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getProperties (token, urn, guid) {

    var url = util.format(
      this._config.endPoints.properties,
      urn, guid)

    return requestAsync({
      url: url,
      token: token,
      json: true
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getManifest (token, urn) {

    var url = util.format(
      this._config.endPoints.manifest,
      urn)

    return requestAsync({
      url: url,
      token: token,
      json: true
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  deleteManifest (token, urn) {

    var url = util.format(
      this._config.endPoints.manifest,
      urn)

    return requestAsync({
      url: url,
      token: token,
      method: 'DELETE',
      json: false
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  download (token, urn, derivativeURN) {

    var url = util.format(
      this._config.endPoints.download,
      urn, encodeURIComponent(derivativeURN))

    return requestAsync({
      url: url,
      token: token,
      json: true
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getThumbnail (token, urn, options = {width: 100, height: 100}) {

    var url = util.format(
      this._config.endPoints.thumbnail,
      urn, options.width, options.height)

    return new Promise((resolve, reject) => {

      request({
        url: url,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        encoding: null
      }, (err, response, body) => {

        try {

          if (err) {
            return reject(err)
          }

          if (response && [200, 201, 202].indexOf(
              response.statusCode) < 0) {

            return reject(response.statusMessage)
          }

          return resolve(arrayToBase64(body))
        }
        catch(ex){

          console.log(params.url)
          console.log(body)

          return reject(ex)
        }
      })
    })
  }
}

/////////////////////////////////////////////////////////////////
// Utils
//
/////////////////////////////////////////////////////////////////
function requestAsync(params) {

  return new Promise((resolve, reject) => {

    request({

      url: params.url,
      method: params.method || 'GET',
      headers: {
        'Authorization': 'Bearer ' + params.token
      },
      json: params.json,
      body: params.body

    }, (err, response, body) => {

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

        if([200, 201, 202].indexOf(
            response.statusCode) < 0){

          return reject(response)
        }

        return resolve(body.data || body)
      }
      catch(ex){

        console.log(params.url)
        console.log(ex)

        return reject(response)
      }
    })
  })
}

///////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////
function arrayToBase64(arraybuffer) {

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  var bytes = arraybuffer, i, len = bytes.length, base64 = "";

  for (i = 0; i < len; i+=3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if ((len % 3) === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }

  return base64;
}
