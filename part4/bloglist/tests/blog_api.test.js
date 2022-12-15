const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)
// long timeout ensures that our test won't fail due to the time it takes to run

describe('when there is initially some blogs saved', () => {
  // exercise 4.8
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  // exercise 4.8
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Canonical string reduction'
    )
  }, 100000)
})

// exercise 4.9
test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
}, 100000)

// exercise 4.10
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Full Stack Web Development',
    author: 'Jerry',
    url: 'https://github.com/jerry871002/Full-Stack-Web-Development-Course',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // the total number of blogs in the system is increased by one
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  // the content of the blog post is saved correctly to the database
  const contents = blogsAtEnd.map(r => r.title)
  expect(contents).toContain(newBlog.title)
}, 100000)

// exercise 4.11
test('the default value of likes property is 0', async () => {
  const newBlog = {
    title: 'Full Stack Web Development',
    author: 'Jerry',
    url: 'https://github.com/jerry871002/Full-Stack-Web-Development-Course',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const newBlogId = response.body.id

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.find(blog => blog.id === newBlogId)
  expect(blog.likes).toEqual(0)
}, 100000)

// exercise 4.12
test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Jerry',
    url: 'https://github.com/jerry871002/Full-Stack-Web-Development-Course',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

// exercise 4.12
test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Full Stack Web Development',
    author: 'Jerry',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
}, 100000)

// exercise 4.13
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogsAtEnd.title)
}, 100000)

// exercise 4.14
test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  console.log(`Updating "${blogToUpdate.title}"`)

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    })
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

  expect(blog.likes).toEqual(blogToUpdate.likes + 1)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})