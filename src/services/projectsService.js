import storage from 'bright-block-auth/src/services/storage'
import moment from 'moment'
var _ = require('lodash')

const MY_ROOT_FILE = 'projects.json'

const projectsService = {
  projects: undefined,
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
