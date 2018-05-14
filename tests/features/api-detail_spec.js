const JANUS_URL = 'http://localhost:8081'
const UUID = Math.random().toString(36).replace(/[0-9]/g, '').substring(1)
const API_NAME = `test-api-${UUID}`
const API_PATH = `/test-api-${UUID}`
const API_TARGET_URL = `http://localhost/${UUID}`
const API_HEALTH_CHECK_PATH = `http://localhost/${UUID}/status`

describe('API Endpoint', () => {
  it('should be accessible', () => {
    cy.loginVisit('/')
      .then(() => cy.log(localStorage.getItem('access_token')))
      .then(() => expect(localStorage.getItem('access_token')).to.exist)
      .get('.j-title').should('contain', 'APIs')
  })

  it('should be able to be created', () => {
    cy.loginVisit('/new')

    // Fill form
    cy.get(':nth-child(1) > .j-row--fullwidth > :nth-child(1) > .j-col > .j-input', { timeout: 10000 })
      .type(API_NAME)

    cy.get('#is-active')
      .click()

    cy.get('input[name="proxy.listen_path"]')
      .type(API_PATH)

    cy.get('#react-select-2--value > .Select-input > input')
      .type('roundrobin{enter}', { force: true })

    cy.get(':nth-child(1) > .j-control > .j-icon')
      .click()
      .get('.j-row__item > .j-input')
      .type(API_TARGET_URL)

    cy.get('#react-select-3--value > .Select-input > input')
      .type('all{enter}', { force: true })

    cy.get('#preserve-host-true')
      .click()

    cy.get('#append-path-true')
      .click()

    cy.get('#strip-path-true')
      .click()

    cy.get(':nth-child(3) > .j-row > :nth-child(1) > .j-col > .j-input')
      .type(API_HEALTH_CHECK_PATH)

    // Save
    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-buttons__wrapper > .j-button--primary')
      .click()

    cy.wait(1000)

    // Validate values saved
    cy.loginVisit(`/${API_NAME}`)

    cy.get(':nth-child(1) > .j-row--fullwidth > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_NAME)

    cy.get('#is-active')
      .should('be.checked')

    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_PATH)

    cy.get('input[name="token_strategy.name"]')
      .should('have.value', 'roundrobin')
    cy.get('input[name="proxy.upstreams.targets[0].target"]')
      .should('have.value', API_TARGET_URL)

    cy.get('#preserve-host-true')
      .should('be.checked')

    cy.get('#append-path-true')
      .should('be.checked')

    cy.get('#strip-path-true')
      .should('be.checked')

    cy.get(':nth-child(3) > .j-row > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_HEALTH_CHECK_PATH)
  })

  it('active status: should be toggleable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('#is-active', { timeout: 10000 })
      .click()

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('#is-active')
      .should('have.value', 'true')
  })

  it('listen path: should be editable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('input[name="proxy.listen_path"]', { timeout: 10000 })
      .type(`-edited`);

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('input[name="proxy.listen_path"]')
      .should('have.value', `${API_PATH}-edited`)
  })

  it('load balancing target URL: should be editable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('input[name="proxy.upstreams.targets[0].target"]', { timeout: 10000 })
      .type(`-edited`);

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('input[name="proxy.upstreams.targets[0].target"]')
      .should('have.value', `${API_TARGET_URL}-edited`)
  })

  it('preserve host option: should be toggleable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('#preserve-host-false', { timeout: 10000 })
      .click()

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('#preserve-host-true')
      .should('not.be.checked')
    cy.get('#preserve-host-false')
      .should('be.checked')
  })

  it('append path option: should be toggleable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('#append-path-false', { timeout: 10000 })
      .click()

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('#append-path-true')
      .should('not.be.checked')
    cy.get('#append-path-false')
      .should('be.checked')
  })

  it('strip path option: should be toggleable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('#strip-path-false', { timeout: 10000 })
      .click()

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('#strip-path-true')
      .should('not.be.checked')
    cy.get('#strip-path-false')
      .should('be.checked')
  })

  it('healthcheck URL: should be editable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('input[name="health_check.url"]', { timeout: 10000 })
      .type('-edited')

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('input[name="health_check.url"]')
      .should('have.value', `${API_HEALTH_CHECK_PATH}-edited`)
  })

  it('healthcheck timeout: should be editable', () => {
    cy.loginVisit(`/${API_NAME}`)

    cy.get('input[name="health_check.timeout"]', { timeout: 10000 })
      .clear()
      .type('17')

    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-confirmation-container .j-button--primary')
      .click()

    cy.loginVisit(`/preview/${API_NAME}`)

    cy.get('input[name="health_check.timeout"]')
      .should('have.value', '17')
  })



})
