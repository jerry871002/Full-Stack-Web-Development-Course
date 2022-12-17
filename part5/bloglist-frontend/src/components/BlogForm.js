const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        URL:
        <input
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm