/////////////////////////////////////////////////////////////////////
// Viewing.Extension.SceneManager.Panel
// by Philippe Leefsma, Feb 2016
//
/////////////////////////////////////////////////////////////////////
import ToolPanelBase from 'ToolPanelBase/ToolPanelBase'
import './Viewing.Extension.Derivative.css'

export default class DerivativePanel extends ToolPanelBase{

  constructor(extension, params) {

    super(extension._viewer.container,
      'Derivatives', {
      closable: true,
      movable: true,
      shadow: true
    })

    $(this.container).addClass('derivative')
    $(this.container).addClass('derivative-panel')

    this.extension = extension

    this.params = params

    this.loadTree($(`#${this.treeContainerId}`)[0])
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  htmlContent(id) {

    this.treeContainerId = ToolPanelBase.guid()

    return `

      <div class="container">

         <div id="${this.treeContainerId}" class="tree-container">
        </div>

      </div>`
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  loadTree(container) {

    var delegate = new DerivativesTreeDelegate(
      this.extension,
      this.params)

    var rootNode = {
      id: ToolPanelBase.guid(),
      name: this.params.name,
      type: 'root',
      group: true
    }

    new Autodesk.Viewing.UI.Tree(
      delegate, rootNode, container, {
        excludeRoot: false,
        localize: true
      })
  }
}

///////////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////////
class DerivativesTreeDelegate extends Autodesk.Viewing.UI.TreeDelegate {

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  constructor (extension, params) {

    super()

    this.extension = extension

    this.params = params

    this.clickTimeout = 0
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  getTreeNodeId (node) {

    return node.id
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  isTreeNodeGroup (node) {

    return node.group
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  async onTreeNodeDoubleClick (tree, node, event) {

    window.clearTimeout(this.clickTimeout)

    switch(node.type) {

      case 'objects':
      case 'objects.leaf':

        this.properties.forEach((entry) => {

          if(entry.objectid === node.id) {

            var nodeProperties = []

            for(var key in entry.properties) {

              var propertyValue = entry.properties[key]

              propertyValue = Array.isArray(propertyValue) ?
                propertyValue[0] :
                propertyValue

              if(typeof propertyValue === 'object') {

                for(var subKey in propertyValue) {

                  var subPropertyValue = propertyValue[subKey]

                  subPropertyValue = Array.isArray(subPropertyValue) ?
                    subPropertyValue[0] :
                    subPropertyValue

                  nodeProperties.push({
                    displayValue: subPropertyValue,
                    displayCategory: key,
                    displayName: subKey,
                    hidden: 0,
                    type: 20,
                    units: null
                  })
                }
              }
              else {

                nodeProperties.push({
                  displayValue: propertyValue,
                  displayCategory: "Other",
                  displayName: key,
                  hidden: 0,
                  type: 20,
                  units: null
                })
              }
            }

            var propertyPanel = new DerivativesPropertyPanel(
              this.extension._viewer.container,
              node.name + ' Properties',
              nodeProperties)

            propertyPanel.setVisible(true)
          }
        })

        break

      case 'exports.iges':
      case 'exports.step':
      case 'exports.stl':
      case 'exports.obj':

        if(!node.derivativeResult ||
            node.derivativeResult.status === 'not found') {

          var job = await this.extension.api.postJob(node)

          console.log(job)
        }

        // wait till derivative urn is available

        var result = await this.extension.api.getDerivativeURN(
          node, this.onDerivativeProgress(node), true)

        console.log(result)

        if(result.status === 'success'){

          var url = this.extension.api.getDownloadURI(
            node.urn,
            result.derivativeUrn,
            node.filename)

          this.extension.api.downloadURI(url, node.filename)
        }

        break
    }
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  getTreeNodeLabel(node) {

    return node.name
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  createTreeNode (node, parent, options = {}) {

    node.type.split('.').forEach((cls) => {

      parent.classList.add(cls)
    })

    var label = document.createElement('label');

    parent.appendChild(label);

    var text = this.getTreeNodeLabel(node);

    if (options && options.localize) {

      label.setAttribute('data-i18n', text);
      text = Autodesk.Viewing.i18n.translate(text);
    }

    label.textContent = text;

    node.setProgress = (progress) => {

      label.textContent = text + ' - ' + progress
    }
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  onTreeNodeIconClick (tree, node, event) {

    window.clearTimeout(this.clickTimeout)

    this.clickTimeout = setTimeout(() => {

      tree.setCollapsed(node, !tree.isCollapsed(node))

    }, 200)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  onTreeNodeClick (tree, node, event) {

    window.clearTimeout(this.clickTimeout)

    this.clickTimeout = setTimeout(() => {

      tree.setCollapsed(node, !tree.isCollapsed(node))

    }, 200)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  async forEachChild (node, addChildCallback) {

    switch(node.type) {

      case 'root':

        try {

          var exportsNode = {
            id: ToolPanelBase.guid(),
            name: 'Exports',
            type: 'exports',
            group: true
          }

          addChildCallback(exportsNode)

          var manifest = await this.extension.api.getManifest(
            this.params.urn)

          var metadata = await this.extension.api.getMetadata(
            this.params.urn)

          if (metadata.metadata && metadata.metadata.length) {

            var guid = metadata.metadata[0].guid

            var hierarchy = await this.extension.api.getHierarchy(
              this.params.urn, guid)

            var hierarchyNode = {
              objects: hierarchy.objects,
              id: ToolPanelBase.guid(),
              name: 'Hierarchy',
              type: 'objects',
              group: true
            }

            this.extension.api.getProperties(
              this.params.urn, guid).then((properties) => {

                this.properties = properties.collection
              })

            addChildCallback(hierarchyNode)
          }
        }
        catch(ex) {

          console.log(ex)
        }

        break

      case 'exports':

        var modelName = this.params.name.split(".")[0]

        var fileType = this.params.name.split(".").pop(-1)

        var exportFormats = ['svf', 'iges', 'step', 'stl']

        exportFormats.forEach((format) => {

            if(this.extension.Formats[format].indexOf(fileType) > -1) {

              var exportNode = {
                id: ToolPanelBase.guid(),
                urn: this.params.urn,
                type: 'exports.' + format,
                filename: modelName + '.' + format,
                outputType: format,
                name: format.toUpperCase(),
                //fileExtType:'versions:autodesk.a360:CompositeDesign',
                group: true
              }

              addChildCallback(exportNode)

              exportNode.setProgress('loading ...')

              this.getDerivativeNodeProgress(exportNode)
            }
        })

        //OBJ needs guid from metadata

        try {

          var metadata = await this.extension.api.getMetadata(
            this.params.urn)

          var exportNode = {
            id: ToolPanelBase.guid(),
            urn: this.params.urn,
            guid: metadata.metadata[0].guid,
            type: 'exports.obj',
            filename: modelName + '.obj',
            outputType: 'obj',
            name: 'OBJ',
            objectIds: [-1],
            //fileExtType:'versions:autodesk.a360:CompositeDesign',
            group: true
          }

          addChildCallback(exportNode)

          exportNode.setProgress('loading ...')

          this.getDerivativeNodeProgress(exportNode)
        }
        catch(ex) {

          console.log(ex)
        }

        break

      case 'objects':

        if(node.objects) {

          node.objects.forEach((object) => {

            var objectNode = {
              objects: object.objects,
              id: object.objectid,
              name: object.name,
              type: 'objects',
              group: true
            }

            if(!object.objects) {
              objectNode.type += '.leaf'
            }

            addChildCallback(objectNode)
          })
        }

        break
    }
  }

  /////////////////////////////////////////////////////////////////
  // onDerivativeProgress
  //
  /////////////////////////////////////////////////////////////////
  onDerivativeProgress (node) {

    return (progress) => {

      console.log(progress)

      node.setProgress(progress)
    }
  }

  /////////////////////////////////////////////////////////////////
  // getDerivativeNodeProgress
  //
  /////////////////////////////////////////////////////////////////
  getDerivativeNodeProgress (node) {

    this.extension.api.getDerivativeURN(
      node, this.onDerivativeProgress(node)).then(
      (derivativeResult) => {

        console.log('derivativeResult')
        console.log(derivativeResult)

        node.derivativeResult = derivativeResult

        if(derivativeResult.status === 'not found') {

          node.setProgress('0%')

        } else {

          node.setProgress('100%')
        }

      }, (error) => {

        console.log('derivativeResult ERROR')
        console.log(error)

        node.setProgress('0%')

        if(error.status === 'failed') {

          node.setProgress('failed')
        }
      })
  }
}

///////////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////////
class DerivativesPropertyPanel
  extends Autodesk.Viewing.UI.PropertyPanel {

  constructor(container, title, properties) {

    super(container, ToolPanelBase.guid(), title)

    this.setProperties(properties);
  }

  /////////////////////////////////////////////////////////////
  // initialize override
  //
  /////////////////////////////////////////////////////////////
  initialize() {

    super.initialize()

    this.container.classList.add('derivative')
  }

  /////////////////////////////////////////////////////////////
  // createTitleBar override
  //
  /////////////////////////////////////////////////////////////
  createTitleBar (title) {

    var titleBar = document.createElement("div")

    titleBar.className = "dockingPanelTitle"

    this.titleTextId = ToolPanelBase.guid()

    this.titleImgId = ToolPanelBase.guid()

    var html = `
      <img id="${this.titleImgId}"></img>
      <div id="${this.titleTextId}" class="dockingPanelTitleText">
        ${title}
      </div>
    `

    $(titleBar).append(html)

    this.addEventListener(titleBar, 'click', (event)=> {

      if (!this.movedSinceLastClick) {

        this.onTitleClick(event)
      }

      this.movedSinceLastClick = false
    })

    this.addEventListener(titleBar, 'dblclick', (event) => {

      this.onTitleDoubleClick(event)
    })

    return titleBar
  }

  /////////////////////////////////////////////////////////////
  // setTitle override
  //
  /////////////////////////////////////////////////////////////
  setTitle (text, options) {

    if (options && options.localizeTitle) {

      $(`#${this.titleTextId}`).attr('data-i18n', text)

      text = Autodesk.Viewing.i18n.translate(text)

    } else {

      $(`#${this.titleTextId}`).removeAttr('data-i18n')
    }

    $(`#${this.titleTextId}`).text(text)
  }
}

