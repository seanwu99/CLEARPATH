/////////////////////////////////////////////////////////////////
// SceneManager Extension
// By Philippe Leefsma, April 2016
/////////////////////////////////////////////////////////////////
import SceneManagerPanel from './Viewing.Extension.SceneManager.Panel'
import ViewerToolkit from 'ViewerToolkit'
import ExtensionBase from 'ExtensionBase'
import Lockr from 'lockr'

class SceneManagerExtension extends ExtensionBase {

  /////////////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////////////
  constructor(viewer, options) {

    super(viewer, options)

    this.modelCollection = {}
  }

  /////////////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////////////
  static get ExtensionId() {

    return 'Viewing.Extension.SceneManager'
  }

  /////////////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////////////
  load() {

    this._control = ViewerToolkit.createButton(
      'scene-manager-control',
      'glyphicon glyphicon-picture',
      'Manage Scenes', ()=>{

        this._panel.toggleVisibility()
      })

    this.onAddSceneHandler =
      (e) => this.onAddScene(e)

    this.onRestoreSceneHandler =
      (e) => this.onRestoreScene(e)

    this.onRemoveSceneHandler =
      (e) => this.onRemoveScene(e)

    this.onSaveSequenceHandler =
      (e) => this.onSaveSequence(e)

    this._panel = new SceneManagerPanel(
      this._viewer.container,
      this._control.container)

    this._panel.on('scene.add', (scene) => {

      return this.onAddSceneHandler(scene)
    })

    this._panel.on('scene.restore', (scene)=>{

      return this.onRestoreSceneHandler(scene)
    })

    this._panel.on('scene.remove', (scene)=>{

      return this.onRemoveSceneHandler(scene)
    })

    this._panel.on('sequence.update', (sequence)=>{

      return this.onSaveSequenceHandler(sequence)
    })

    this.parentControl = this._options.parentControl

    if(!this.parentControl){

      var viewerToolbar = this._viewer.getToolbar(true)

      this.parentControl = new Autodesk.Viewing.UI.ControlGroup(
        'scene-manager')

      viewerToolbar.addControl(this.parentControl)
    }

    this.parentControl.addControl(
      this._control)

    this.sceneMap = Lockr.get(
      SceneManagerExtension.ExtensionId + '.scenes') || {}

    this.sequence = Lockr.get(
      SceneManagerExtension.ExtensionId + '.sequence') || []

    this.sequence.forEach((sceneId) => {

      this._panel.addItem(this.sceneMap[ sceneId ])
    })

    console.log('Viewing.Extension.SceneManager loaded')

    return true
  }

  /////////////////////////////////////////////////////////////////
  // Unload callback
  //
  /////////////////////////////////////////////////////////////////
  unload() {

    this.parentControl.removeControl(
      this._control)

    this._panel.setVisible(false)

    console.log('Viewing.Extension.SceneManager unloaded')

    return true
  }

  /////////////////////////////////////////////////////////////////
  // Save current scene
  //
  ////////////////////////////////////////////////////////////////
  onAddScene (data) {

    var filter = {
      renderOptions: false,
      objectSet: false,
      viewport: true,
      guid: true
    }

    var scene = this._viewer.getState(filter)

    scene.name = (data.name.length ?
      data.name : new Date().toString('d/M/yyyy H:mm:ss'))

    scene.modelInfo = []

    for(var modelId in this.modelCollection) {

      var model = this.modelCollection[modelId]

      scene.modelInfo.push({
        storageUrn: model.storageUrn,
        transform: model.transform,
        version: model.version,
        name: model.name
      })
    }

    this.sequence.push(scene.guid)

    this.sceneMap[ scene.guid ] = scene

    Lockr.set(
      SceneManagerExtension.ExtensionId + '.sequence',
      this.sequence)

    Lockr.set(
      SceneManagerExtension.ExtensionId + '.scenes',
      this.sceneMap)

    return scene
  }

  /////////////////////////////////////////////////////////////////
  // Restore scene
  //
  ////////////////////////////////////////////////////////////////
  onRestoreScene (scene) {

    var filter = {
      renderOptions: false,
      objectSet: false,
      viewport: true
    }
    
    //this._viewer.restoreState(scene, filter, false)

    var deleteSet = Object.keys(this.modelCollection).map(
      (modelId) => {

        return this.modelCollection[modelId]
      })

    var transformSet = []

    var loadSet = []

    scene.modelInfo.forEach((modelInfo) => {

      for(var i=0; i < deleteSet.length; ++i) {

        if(modelInfo.storageUrn === deleteSet[i].storageUrn) {

          var model = deleteSet[i]

          model.transform = modelInfo.transform

          transformSet.push(model)

          deleteSet.splice(i, 1)

          return
        }
      }

      loadSet.push(modelInfo)
    })

    this.modelCollection = {}

    this.emit('scene.restore', {
      transformSet,
      deleteSet,
      loadSet
    })
  }

  /////////////////////////////////////////////////////////////////
  // Delete scene
  //
  ////////////////////////////////////////////////////////////////
  onRemoveScene (scene) {

    var idx = this.sequence.indexOf(scene.guid)

    this.sequence.splice(idx, 1)

    delete this.sceneMap[scene.guid]

    Lockr.set(
      SceneManagerExtension.ExtensionId + '.sequence',
      this.sequence)

    Lockr.set(
      SceneManagerExtension.ExtensionId + '.scenes',
      this.sceneMap)
  }

  /////////////////////////////////////////////////////////////////
  // Save scenes sequence
  //
  ////////////////////////////////////////////////////////////////
  onSaveSequence (sequence) {

    this.sequence = sequence

    Lockr.set(
      SceneManagerExtension.ExtensionId + '.sequence',
      this.sequence)
  }

  /////////////////////////////////////////////////////////////////
  // Register model in SceneManager 
  //
  ////////////////////////////////////////////////////////////////
  addModel (model) {

    this.modelCollection[model.modelId] = model
  }

  /////////////////////////////////////////////////////////////////
  // Unregister model in SceneManager 
  //
  ////////////////////////////////////////////////////////////////
  removeModel (model) {

    if(this.modelCollection[model.modelId]){

      delete this.modelCollection[model.modelId]
    }
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  SceneManagerExtension.ExtensionId,
  SceneManagerExtension)
