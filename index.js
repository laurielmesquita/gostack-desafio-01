const express = require('express')
const server = express()

server.use(express.json())

const projects = []

function checkProjectExists (req, res, next) {
  const { id } = req.params
  const project = projects.find(p => p.id === id)

  if (!project) {
    return res.status(400).json({ error: 'This project does not exist!' })
  }

  return next()
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json(project)
})

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const projectIndex = projects.find(p => p.id === id)

  projects.splice(projectIndex, 1)

  return res.send()
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id === id)

  project.title = title

  return res.json(project)
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id === id)

  project.tasks.push(title)

  return res.json(project)
})

server.listen(3000)
