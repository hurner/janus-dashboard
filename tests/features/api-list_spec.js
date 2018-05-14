const JANUS_URL = 'http://localhost:8081'
const UUID = Math.random().toString(36).replace(/[0-9]/g, '').substring(1)
const API_NAME = `test-api-${UUID}`
const API_PATH = `/test-api-${UUID}`
const API_TARGET_URL = `http://localhost/${UUID}`
const API_HEALTH_CHECK_PATH = `http://localhost/${UUID}/status`

describe('API List Page', () => {
  it('should be accessible', () => {
    cy.loginVisit('/')
      .then(() => cy.log(localStorage.getItem('access_token')))
      .then(() => expect(localStorage.getItem('access_token')).to.exist)
      .get('.j-title').should('contain', 'APIs')
  })
})
