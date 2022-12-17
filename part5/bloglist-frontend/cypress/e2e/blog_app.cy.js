describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  // exercise 5,17
  it('login form is shown', function () {
    cy.get('#username').should('not.be.visible')
    cy.get('#password').should('not.be.visible')

    cy.contains('Login').click()

    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  // exercise 5.18
  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('New Blog').click()

      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')

      cy.contains('Create').click()
      cy.contains('A new blog test title by test author')
      cy.get('li').contains('test title by test author')
    })

    describe('and a blog exist', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url'
        })
      })

      it('users can like a blog', function() {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.get('li')
          .should('contain', 'Likes: 1')
      })

      // exercise 5.21
      it('user who created a blog can delete it.', function() {
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.should('not.contain', 'test title by test author')
      })

      // exercise 5.21
      it('other users cannot delete the blog', function() {
        const user = {
          name: 'Jerry Yang',
          username: 'jerry',
          password: 'yang'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'jerry', password: 'yang' })
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.get('li')
          .should('contain', 'test title by test author')
      })
    })

    describe('and serveral blogs exist', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'author 1',
          url: 'test url',
          likes: 5
        })
        cy.createBlog({
          title: 'second blog',
          author: 'author 2',
          url: 'test url',
          likes: 10
        })
        cy.createBlog({
          title: 'third blog',
          author: 'author 3',
          url: 'test url',
          likes: 8
        })
      })

      it('the blogs are ordered according to likes', function() {
        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(2).should('contain', 'first blog')
      })
    })
  })
})