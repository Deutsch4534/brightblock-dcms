import storage from 'bright-block-auth/src/services/storage'
import moment from 'moment'
var _ = require('lodash')

const PROJECTS_FILE = 'projects.json'

const projectsService = {
  projects: undefined,
  fetch: function () {
    return new Promise(resolve => {
      storage.getFile(PROJECTS_FILE).then((projects) => {
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
  saveOrUpdate: function (uiProject) {
    let myProject = this.getProject(uiProject.projectId)
    if (myProject) {
      myProject.updated = moment.now()
      myProject.name = uiProject.name
      myProject.description = uiProject.description
    } else {
      uiProject.projectId = moment.now()
      uiProject.updated = moment.now()
      if (!this.projects) {
        this.projects = []
      }
      this.projects.push(uiProject)
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
    let myProject
    if (projectId) {
      _.forEach(this.projects, function (project) {
        if (project.projectId === projectId) {
          myProject = project
        }
      })
    }
    return myProject
  }
}
export default projectsService
