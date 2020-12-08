const CIVIL_STATES = [
  'single',
  'married',
  'divorced',
  'widowed'
]

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

module.exports = { CIVIL_STATES, STATUS_CODES }
