const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

// blogRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Blog.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

module.exports = blogRouter