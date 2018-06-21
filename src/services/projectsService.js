import storage from 'bright-block-auth/src/services/storage'
import moment from 'moment'
import axios from 'axios'
// import versioning from '../../node_modules/grpc/node_modules/node-pre-gyp/lib/util/versioning.js'
var _ = require('lodash')

const MY_ROOT_FILE = 'projects.json'
// const SS_URL = 'https://cors.shapeshift.io'

const projectsService = {
  projects: undefined,
  getDetails: function (documentId) {
    return {
      method: 'get',
      url: 'https://cors.shapeshift.io/rate/' + documentId,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },
  getSSRates: function () {
    let requestDetails = this.getDetails('btc_ltc')
    return new Promise(resolve => {
      axios.get(requestDetails.url, { headers: requestDetails.headers })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          console.log(e.response)
          resolve(e)
        })
    })
  },
  getEncrypted: function (project) {
    let encP = window.blockstack.encryptContent(project)
    return encP
    // return new Promise(resolve => {
    //   storage.encryptContent(project)
    //     .then((data) => {
    //       resolve(data)
    //     }).catch(e => {
  //         console.log('putFile: e : ', e)
  //         resolve({name: 'unknown'})
  //       })
  //   })
  },
  getDecrypted: function (project) {
    let dencP = storage.decryptContent(project)
    return dencP
  },
  fetch: function () {
    return new Promise(resolve => {
      storage.getFile(MY_ROOT_FILE).then((projects) => {
        if (projects && projects.errorMessage) {
          resolve(false)
        } else {
          this.projects = projects
          resolve(projects)
        }
      }).catch(e => {
        console.log('projects: e : ', e)
        resolve(false)
      })
    })
  },
  delete: function (projectId) {
    _.remove(this.projects, {
      projectId: projectId
    })
    return new Promise(resolve => {
      storage.putFile(this.projects).then((projects) => {
        this.projects = projects
        resolve(projects)
      }).catch(e => {
        console.log('projects: e : ', e)
        resolve(false)
      })
    })
  },
  saveOrUpdate: function (uiObject) {
    let myObject = this.getProject(uiObject.projectId)
    if (myObject) {
      myObject.updated = moment.now()
      myObject.name = uiObject.name
      myObject.description = uiObject.description
    } else {
      uiObject.projectId = moment.now()
      uiObject.updated = moment.now()
      if (!this.projects) {
        this.projects = []
      }
      this.projects.push(uiObject)
    }
    return new Promise(resolve => {
      storage.putFile(this.projects).then((projects) => {
        this.projects = projects
        resolve(projects)
      }).catch(e => {
        console.log('projects: e : ', e)
        resolve(false)
      })
    })
  },
  getProject: function (projectId) {
    let myObject
    if (projectId) {
      _.forEach(this.projects, function (project) {
        if (project.projectId === projectId) {
          myObject = project
        }
      })
    }
    return myObject
  }
}
export default projectsService
