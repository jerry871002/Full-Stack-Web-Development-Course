import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

// exercise 5.16
test('<BlogForm /> updates parent state and calls createBlog', async () => {
  const createBlog = jest.fn()
  const setMessage = jest.fn()
  const setMessageType = jest.fn()
  const user = userEvent.setup()

  render(
    <BlogForm
      createBlog={createBlog}
      setMessage={setMessage}
      setMessageType={setMessageType}
    />
  )

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')
  const sendButton = screen.getByText('Create')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})