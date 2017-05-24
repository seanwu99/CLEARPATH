/////////////////////////////////////////////////////////////////////
// DerivativeExtension
// by Philippe Leefsma, April 2016
//
/////////////////////////////////////////////////////////////////////
import ViewerPropertyPanel from './Viewing.Extension.Derivative.ViewerPropertyPanel'
import DerivativesPanel from './Viewing.Extension.Derivative.Panel'
import DerivativeAPI from './Viewing.Extension.Derivative.API'
import JobPanel from './Viewing.Extension.Derivative.JobPanel'
import ExtensionBase from 'ExtensionBase'
import ViewerToolkit from 'ViewerToolkit'

class DerivativeExtension extends ExtensionBase {

  /////////////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////////////
  constructor(viewer, options) {

    super(viewer, options)

    this.api = new DerivativeAPI({
      apiUrl: '/api/derivatives'
    })

    this.api.getFormats().then((res) => {

      this._formats = res.formats
    })
  }

  /////////////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////////////
  static get ExtensionId() {

    return 'Viewing.Extension.Derivative'
  }

  /////////////////////////////////////////////////////////////////
  // Formats
  //
  /////////////////////////////////////////////////////////////////
  get Formats() {

    return this._formats
  }

  /////////////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////////////
  load() {

    this._viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {

        if(!this.propertyPanel) {

          this.propertyPanel = new ViewerPropertyPanel(
            this._viewer, this)

          this._viewer.setPropertyPanel(this.propertyPanel)
        }
      })
    
    console.log('Viewing.Extension.Derivative loaded')

    return true
  }

  /////////////////////////////////////////////////////////////////
  // Unload callback
  //
  /////////////////////////////////////////////////////////////////
  unload() {

    this._viewer.setPropertyPanel(null)

    console.log('Viewing.Extension.Derivative unloaded')

    return true
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  postSVFJob(version, showProgress = true) {

    return new Promise(async(resolve, reject) => {

      var storageUrn = window.btoa(
        version.relationships.storage.data.id)

      storageUrn = storageUrn.replace(
        new RegExp('=', 'g'), '')

      console.log('Job: ' + storageUrn)

      var jobPanel = new JobPanel(
        this._viewer.container,
        version)

      jobPanel.setVisible(showProgress)

      try {

        var job = await this.api.postJob({
          fileExtType: version.attributes && version.attributes.extension ?
            version.attributes.extension.type : null,
          rootFilename: version.attributes ? version.attributes.name : null,
          outputType: 'svf',
          urn: storageUrn
        })

        if (job.result === 'success' || job.result === 'created') {

          var manifest = await this.api.waitJob(storageUrn,
            (progress) => {

              return !showProgress || jobPanel.updateProgress(progress)
            })

          jobPanel.done()

          return resolve(manifest)
        }
        else {

          this.deleteManifest(storageUrn)
          jobPanel.jobFailed(job)
          return reject(job)
        }
      }
      catch(ex) {

        this.deleteManifest(storageUrn)
        jobPanel.jobFailed(ex)
        return reject(ex)
      }
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getManifest(urn) {

    return this.api.getManifest(urn)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getMetadata(urn) {

    return this.api.getMetadata(urn)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getThumbnail(urn, options) {

    return this.api.getThumbnail(urn, options)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  deleteManifest(urn) {

    return this.api.deleteManifest(urn)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  hasDerivative(manifest, params) {

    var derivativeResult = this.api.findDerivative(
      manifest, params)

    return derivativeResult.target ? true : false
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  loadDerivativesPanel(params) {

    var panel = new DerivativesPanel(
      this, params)

    panel.setVisible(true)

    return panel
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  DerivativeExtension.ExtensionId,
  DerivativeExtension)
