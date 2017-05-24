
/////////////////////////////////////////////////////////////////////
// PRODUCTION configuration
//
/////////////////////////////////////////////////////////////////////
var FORGE_BASE_URL = 'https://developer.api.autodesk.com'
var FORGE_DERIVATIVE_VERSION = 'v2'
var FORGE_OAUTH_VERSION = 'v1'
var FORGE_OSS_VERSION = 'v2'
var FORGE_DM_VERSION = 'v1'

module.exports = {

  clientConfig: {

    forge: {
      token3LeggedUrl: '/api/forge/token/3legged',
      token2LeggedUrl: '/api/forge/token/2legged',
      viewerEnv: 'AutodeskProduction'
    },

    env: 'production',
    host: 'https://forge.autodesk.io',
    port: 443
  },

  serverConfig: {

    port: 3000,

    forge: {

      oauth: {

        authenticationUri: '/authentication/' + FORGE_OAUTH_VERSION + '/authenticate',
        refreshTokenUri: '/authentication/' + FORGE_OAUTH_VERSION + '/refreshtoken',
        authorizationUri: '/authentication/' + FORGE_OAUTH_VERSION + '/authorize',
        accessTokenUri:  '/authentication/' + FORGE_OAUTH_VERSION + '/gettoken',
        redirectUri: 'https://forge.autodesk.io/api/forge/callback/oauth',
        clientSecret: process.env.FORGE_CLIENTSECRET,
        clientId: process.env.FORGE_CLIENTID,
        baseUri: FORGE_BASE_URL,

        scope: [
          'data:read',
          'data:create',
          'data:write',
          'bucket:read',
          'bucket:create'
        ]
      },

      endPoints: {

        bucketDetails:    FORGE_BASE_URL + '/oss/' + FORGE_OSS_VERSION + '/buckets/%s/details',
        objectDetails:    FORGE_BASE_URL + '/oss/' + FORGE_OSS_VERSION + '/buckets/%s/objects/%s/details',
        buckets:          FORGE_BASE_URL + '/oss/' + FORGE_OSS_VERSION + '/buckets',
        bucket:           FORGE_BASE_URL + '/oss/' + FORGE_OSS_VERSION + '/buckets/%s',
        objects:          FORGE_BASE_URL + '/oss/' + FORGE_OSS_VERSION + '/buckets/%s/objects',
        object:           FORGE_BASE_URL + '/oss/' + FORGE_OSS_VERSION + '/buckets/%s/objects/%s',

        supported:        FORGE_BASE_URL + '/viewingservice/' + FORGE_OSS_VERSION + '/supported',
        register:         FORGE_BASE_URL + '/viewingservice/' + FORGE_OSS_VERSION + '/register',
        viewable:         FORGE_BASE_URL + '/viewingservice/' + FORGE_OSS_VERSION + '/%s',
        items:            FORGE_BASE_URL + '/viewingservice/' + FORGE_OSS_VERSION + '/items/%s',

        user:            FORGE_BASE_URL + '/userprofile/'    + FORGE_DM_VERSION + '/users/@me',

        hubs:            FORGE_BASE_URL + '/project/'        + FORGE_DM_VERSION + '/hubs',
        projects:        FORGE_BASE_URL + '/project/'        + FORGE_DM_VERSION + '/hubs/%s/projects',
        project:         FORGE_BASE_URL + '/project/'        + FORGE_DM_VERSION + '/hubs/%s/projects/%s',
        storage:         FORGE_BASE_URL + '/data/'           + FORGE_DM_VERSION + '/projects/%s/storage',
        folderContent:   FORGE_BASE_URL + '/data/'           + FORGE_DM_VERSION + '/projects/%s/folders/%s/contents',
        itemVersions:    FORGE_BASE_URL + '/data/'           + FORGE_DM_VERSION + '/projects/%s/items/%s/versions',
        versions:        FORGE_BASE_URL + '/data/'           + FORGE_DM_VERSION + '/projects/%s/versions',
        items:           FORGE_BASE_URL + '/data/'           + FORGE_DM_VERSION + '/projects/%s/items',

        job:             FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/job',
        formats:         FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/formats',
        manifest:        FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/%s/manifest',
        download:        FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/%s/manifest/%s',
        metadata:        FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/%s/metadata',
        hierarchy:       FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/%s/metadata/%s',
        properties:      FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/%s/metadata/%s/properties',
        thumbnail:       FORGE_BASE_URL + '/modelderivative/' + FORGE_DERIVATIVE_VERSION + '/designdata/%s/thumbnail?width=%s&height=%s'
      }
    }
  }
}
