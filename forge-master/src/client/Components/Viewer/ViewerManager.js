//////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////
import 'Viewing.Extension.ModelTransformer/Viewing.Extension.ModelTransformer'
import 'Viewing.Extension.SceneManager/Viewing.Extension.SceneManager'
import 'Viewing.Extension.Derivative/Viewing.Extension.Derivative'
import 'Viewing.Extension.Storage/Viewing.Extension.Storage'
import ViewerToolkit from 'ViewerToolkit'

export default class ViewerManager {

  //////////////////////////////////////////////////////////////////////////
  // Viewer Component constructor
  //
  //////////////////////////////////////////////////////////////////////////
  constructor (container, config) {

    this._tokenUrl = config.token3LeggedUrl

    this._domContainer = container

    this._config = config

    this.onNodeAddedHandler = (node) => {

      return this.onNodeAdded(node)
    }
  }

  //////////////////////////////////////////////////////////////////////////
  // Initialize
  //
  //////////////////////////////////////////////////////////////////////////
  initialize () {

    var options = {

      env: this._config.viewerEnv,

      getAccessToken: (callback) => {

        $.get(this._tokenUrl, (tokenResponse) => {

          callback(tokenResponse.access_token, tokenResponse.expires_in)
        })
      }
    }

    return new Promise((resolve, reject) => {

      Autodesk.Viewing.Initializer(options, () => {

        resolve()

      }, (error) => {

        reject(error)
      })
    })
  }

  //////////////////////////////////////////////////////////////////////////
  // Initialize new viewer
  //
  //////////////////////////////////////////////////////////////////////////
  createViewer () {

    this.viewer = new Autodesk.Viewing.Private.GuiViewer3D(
      this._domContainer)

    this.viewer.initialize()

    this.initializeUI()

    this.loadExtensions()
  }

  //////////////////////////////////////////////////////////////////////////
  // Initialize viewer UI
  //
  //////////////////////////////////////////////////////////////////////////
  initializeUI () {

    // removes all the loaders when no model

    $('#loader, .spinner').remove()

    this.viewer.setBackgroundColor(
      255, 207, 13,
      219, 219, 219)

    // Add custom control group for our toolbar controls

    var viewerToolbar = this.viewer.getToolbar(true)

    this.ctrlGroup = new Autodesk.Viewing.UI.ControlGroup('forge')

    viewerToolbar.addControl(this.ctrlGroup)

    this.onGeometryLoadedHandler = (e) => {

      this.onGeometryLoaded(e)
    }

    this.viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
      this.onGeometryLoadedHandler)
  }

  //////////////////////////////////////////////////////////////////////////
  // geometry loaded callback
  //
  //////////////////////////////////////////////////////////////////////////
  onGeometryLoaded (e) {

    this.viewer.setLightPreset(1)

    setTimeout(()=> {

      this.viewer.setLightPreset(0)

      this.viewer.setBackgroundColor(
        122, 198, 255,
        219, 219, 219)

    }, 100)
  }

  //////////////////////////////////////////////////////////////////////////
  // Load all extensions and hook up events
  //
  //////////////////////////////////////////////////////////////////////////
  loadExtensions () {

    // Derivative Extension

    this.viewer.loadExtension(
      'Viewing.Extension.Derivative', {
      parentControl: this.ctrlGroup
    })

    this.derivativeExtension = this.viewer.loadedExtensions[
      'Viewing.Extension.Derivative']

    // ModelTransformer Extension

    this.viewer.loadExtension(
      'Viewing.Extension.ModelTransformer', {
        parentControl: this.ctrlGroup
      })

    this.modelTransformerExtension =
      this.viewer.loadedExtensions[
        'Viewing.Extension.ModelTransformer']

    this.modelTransformerExtension.on('model.delete',
      (model) => {

        if (model.node && model.node.parent) {

          model.node.parent.classList.remove('derivated')

          model.node.setTooltip('no derivative on this item')
        }

        delete model.version.manifest

        this.derivativeExtension.deleteManifest(
          model.storageUrn)

        this.sceneManagerExtension.removeModel(model)
    })

    // Storage Extension

    this.viewer.loadExtension(
      'Viewing.Extension.Storage', {
        parentControl: this.ctrlGroup,
        showPanel: true
      })

    this.storageExtension =
      this.viewer.loadedExtensions['Viewing.Extension.Storage']

    this.storageExtension.on('node.added', this.onNodeAddedHandler)

    this.storageExtension.on('node.dblClick', (node)=> {

      console.log(node)

      switch(node.type) {

          case 'items':

            this.onItemNodeDblClicked(node)
            break;

          case 'derivatives':

            this.onDerivativeNodeDblClicked(node)
            break;

        default:
          break;
      }
    })

    // SceneManager Extension

    this.viewer.loadExtension(
      'Viewing.Extension.SceneManager', {
        parentControl: this.ctrlGroup
      })

    this.sceneManagerExtension = this.viewer.loadedExtensions[
      'Viewing.Extension.SceneManager']

    this.sceneManagerExtension.on('scene.restore', (scene)=> {

      console.log(scene)

      scene.deleteSet.forEach((model) => {

        this.modelTransformerExtension.deleteModel(
          model, false)
      })

      this.modelTransformerExtension.clearModels()

      scene.transformSet.forEach((model) => {

        this.modelTransformerExtension.addModel(model)
        this.modelTransformerExtension.applyTransform(model)

        this.sceneManagerExtension.addModel(model)
      })

      scene.loadSet.forEach((modelInfo) => {

        try {

          // build a fake item

          delete modelInfo.version.manifest

          var item = {
            name: modelInfo.name,
            versions: [modelInfo.version]
          }

          var onFullyLoaded = (model) => {

            model.transform = modelInfo.transform

            this.modelTransformerExtension.addModel(model)
            this.modelTransformerExtension.applyTransform(model)

            this.sceneManagerExtension.addModel(model)

            this.viewer.impl.sceneUpdated(true)
          }

          var options = {
            showProgress: true,
            onFullyLoaded: onFullyLoaded
          }

          this.importModelFromItem(item, options)
        }
        catch(error) {

          console.log(error)
        }
      })
    })
  }

  //////////////////////////////////////////////////////////////////////////
  // Storage View Node Added Handler
  //
  //////////////////////////////////////////////////////////////////////////
  onNodeAdded (node) {

    ['hubs'].indexOf(node.type) < 0  ?
      node.collapse():
      node.expand()

    switch (node.type) {

      case 'items':

        if (!(node.versions && node.versions.length)) {

          node.setTooltip('unable to load versions on this item')

          return
        }

        // pick last item version

        var version = node.versions[ node.versions.length - 1 ]

        if (!version.relationships.storage) {

          node.setTooltip('derivatives unavailable on this item')

          node.parent.classList.add('unavailable')

          return
        }

        var storageUrn = window.btoa(
          version.relationships.storage.data.id)

        storageUrn = storageUrn.replace(
          new RegExp('=', 'g'), '')

        this.derivativeExtension.getManifest(
          storageUrn).then((manifest) => {

            if (manifest &&
                manifest.status === 'success' &&
                manifest.progress === 'complete') {

              version.manifest = manifest

              node.parent.classList.add('derivated')

              if (this.derivativeExtension.hasDerivative(
                version.manifest, {outputType: 'svf'})) {

                this.derivativeExtension.getThumbnail(
                  storageUrn, {
                    width: 200,
                    height: 200
                  }).then((thumbnail) => {

                    var img = `<img width="150" height="150"
                    src='data:image/png;base64,${thumbnail}'/>`

                    node.setTooltip(img)
                  })

              } else {

                node.setTooltip('no SVF derivative on this item')
              }
            }

          }, (err) => {

            node.setTooltip('no derivative on this item')

            // file not derivated have no manifest
            // skip those errors
            if (err !== 'Not Found') {

              console.warn(err)
            }
        })

        node.onIteratingChildren = () => {

          var derivativesNode = {
            id: node.id + '-derivatives',
            storageUrn: storageUrn,
            itemName: node.name,
            name: 'Derivatives',
            type: 'derivatives',
            tooltip: true,
            group: true
          }

          node.addChild(derivativesNode)
        }

        break

      case 'derivatives':

        node.setTooltip('Double-click to load derivatives panel')
        break
    }
  }

  //////////////////////////////////////////////////////////////////////////
  // Storage Item Node double-clicked Handler
  //
  //////////////////////////////////////////////////////////////////////////
  onItemNodeDblClicked (node) {

    var item = node

    console.log(item)

    if (!item.versions || !item.versions.length) {

      this.storageExtension.panel.showError(
        'No version available (Please wait) ...')

      console.log('No item version available')
      return
    }

    //pick the last version by default
    var version = item.versions[ item.versions.length - 1 ]

    if(!version.relationships.storage) {

      this.storageExtension.panel.showError(
        'Derivatives unavailable on this item')

      console.log('Derivatives unavailable on this item')
      return
    }

    this.storageExtension.panel.startLoad(
      'Loading ' + item.name + ' ...')

    var options = {
      showProgress: true
    }

    this.importModelFromItem(item, options).then((model) => {

      this.storageExtension.panel.stopLoad()

      this.modelTransformerExtension.addModel(model)

      this.sceneManagerExtension.addModel(model)

      item.parent.classList.add('derivated')

      this.derivativeExtension.getThumbnail(
        model.storageUrn, {
          width: 200,
          height: 200
        }).then((thumbnail) => {

          var img = `<img width="150" height="150"
                src='data:image/png;base64,${thumbnail}'/>`

          node.setTooltip(img)
        })

    }, (error) => {

      this.storageExtension.panel.showError(
        error.description)
    })
  }

  //////////////////////////////////////////////////////////////////////////
  // Derivative node double-clicked handler
  //
  //////////////////////////////////////////////////////////////////////////
  onDerivativeNodeDblClicked (node) {

    this.derivativeExtension.loadDerivativesPanel({
      urn: node.storageUrn,
      name: node.itemName
    })
  }

  //////////////////////////////////////////////////////////////////////////
  // Import model from DM item into the scene
  //
  //////////////////////////////////////////////////////////////////////////
  importModelFromItem (item, options = {}) {

    return new Promise(async(resolve, reject) => {

      try {

        //pick the last version by default
        var version = item.versions[ item.versions.length - 1 ]

        var storageUrn = window.btoa(
          version.relationships.storage.data.id)

        // !IMPORTANT: remove all padding '=' chars
        // not accepted by the adsk services

        storageUrn = storageUrn.replace(new RegExp('=', 'g'), '')

        var urn = version.relationships.derivatives.data.id

        console.log('A360 URN: ' + urn)
        console.log('Storage URN: ' + storageUrn)

        // check if item version has existing svf derivative
        // this has been pre-filled by derivativeExtension

        if (!version.manifest ||
            !this.derivativeExtension.hasDerivative(
              version.manifest, {outputType: 'svf'})) {

          var manifest = await this.derivativeExtension.postSVFJob(
            version, options.showProgress)

          version.manifest = manifest
        }

        // SVF Loaded callback

        var onSVFLoaded = async (svf) => {

          var viewablePath = ViewerToolkit.getDefaultViewablePath(svf)

          if(!viewablePath) {

            return reject('No viewable content')
          }

          var transform =
            this.modelTransformerExtension.buildPlacementTransform(
              item.name)

          let model = await this.loadViewable(viewablePath, {
            onFullyLoaded: options.onFullyLoaded,
            acmSessionId: svf.acmSessionId,
            placementTransform: transform
          })

          var metadata = await this.derivativeExtension.getMetadata(
            storageUrn)

          // assume first metadata, since we loaded first viewable

          if (metadata.metadata && metadata.metadata.length) {

            var guid = metadata.metadata[0].guid

            model.guid = guid
          }

          // store for later use by extensions

          model.node = item
          model.name = item.name
          model.version = version
          model.storageUrn = storageUrn
          model.transform = options.transform

          // fits model to view - need to wait for instance tree
          // but no event gets fired

          this.fitModelToView(model)

          resolve(model)
        }

        Autodesk.Viewing.Document.load(
          'urn:' + storageUrn, (svf) => onSVFLoaded(svf), (error) => {

          var description = this.logError(error)

          reject({
            error,
            description
          })
        })

      }
      catch(ex) {

        return reject(ex)
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////
  // Load viewable path
  //
  //////////////////////////////////////////////////////////////////////////
  loadViewable(viewablePath, options = {}) {

    return new Promise((resolve, reject)=> {

      var geometryLoaded = false

      var objectTreeCreated = false

      var modelId = ViewerToolkit.guid()

      let _onGeometryLoaded = (event)=> {

        if(modelId === event.model.modelId) {

          this.viewer.removeEventListener(
            Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
            _onGeometryLoaded)

          geometryLoaded = true

          if(objectTreeCreated) {

            if (options.onFullyLoaded) {

              options.onFullyLoaded(event.model)
            }
          }
        }
      }

      let _onObjectTreeCreated = (event)=> {

        if(modelId === event.model.modelId) {

          this.viewer.removeEventListener(
            Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
            _onObjectTreeCreated)

          objectTreeCreated = true

          if (geometryLoaded) {

            if (options.onFullyLoaded) {

              options.onFullyLoaded(event.model)
            }
          }
        }
      }

      this.viewer.addEventListener(
        Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
        _onGeometryLoaded)

      this.viewer.addEventListener(
        Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
        _onObjectTreeCreated)

      var _onSuccess = (model) => {

        model.modelId = modelId

        resolve(model)
      }

      var _onError = (errorCode, errorMessage,
                      statusCode, statusText) => {

        this.viewer.removeEventListener(
          Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
          _onGeometryLoaded)

        return reject({
          errorMessage,
          statusCode,
          statusText,
          errorCode
        })
      }

      this.viewer.loadModel(
        viewablePath, options,
        _onSuccess, _onError)
    })
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //
  //////////////////////////////////////////////////////////////////////////
  fitModelToView (model) {

    var instanceTree = model.getData().instanceTree

    if(instanceTree) {

      var rootId = instanceTree.getRootId()

      this.viewer.fitToView([ rootId ])
    }
    else {

      setTimeout(() => {
        this.fitModelToView(model)
      }, 500)
    }
  }

  //////////////////////////////////////////////////////////////////////////
  // Log viewer errors with more explicit message
  //
  //////////////////////////////////////////////////////////////////////////
  logError (err) {

    switch (err) {

      case 1: //Autodesk.Viewing.ErrorCode.UNKNOWN_FAILURE
        return 'An unknown failure has occurred.'

      case 2: //Autodesk.Viewing.ErrorCode.BAD_DATA
        return 'Bad data (corrupted or malformed) was encountered.'

      case 3: //Autodesk.Viewing.ErrorCode.NETWORK_FAILURE
        return 'A network failure was encountered.'

      case 4: //Autodesk.Viewing.ErrorCode.NETWORK_ACCESS_DENIED
        return 'Access was denied to a network resource (HTTP 403).'

      case 5: //Autodesk.Viewing.ErrorCode.NETWORK_FILE_NOT_FOUND
        return 'A network resource could not be found (HTTP 404).'

      case 6: //Autodesk.Viewing.ErrorCode.NETWORK_SERVER_ERROR
        return 'A server error was returned when accessing ' +
          'a network resource (HTTP 5xx).'

      case 7: //Autodesk.Viewing.ErrorCode.NETWORK_UNHANDLED_RESPONSE_CODE
        return 'An unhandled response code was returned ' +
          'when accessing a network resource (HTTP everything else).'

      case 8: //Autodesk.Viewing.ErrorCode.BROWSER_WEBGL_NOT_SUPPORTED
        return 'Browser error: WebGL is not ' +
          'supported by the current browser.'

      case 9: //Autodesk.Viewing.ErrorCode.BAD_DATA_NO_VIEWABLE_CONTENT
        return 'There is nothing viewable in the fetched document.'

      case 10: //Autodesk.Viewing.ErrorCode.BROWSER_WEBGL_DISABLED
        return 'Browser error: WebGL is supported, but not enabled.'

      case 11: //Autodesk.Viewing.ErrorCode.RTC_ERROR
        return 'Collaboration server error'
    }
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //
  //////////////////////////////////////////////////////////////////////////
  destroy () {

    this.viewer.finish()
  }
}


