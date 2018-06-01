const apiErrors = require('./errors');

exports.processErrors = (message, method, endpoint, err, payload) => {
  const errorList = [];
  // Check for validation error
  console.log(err);
  switch (err.name) {
    // entry already exists
    case 'AlreadyExist':
      errorList.push(apiErrors.errors.ENTRY_ALREADY_EXISTS);
      break;
    // issues with the query
    case 'QueryError':
      errorList.push(apiErrors.errors.MISSING_ENTRY);
      break;
    // issues with the database
    case 'DatabaseError':
      errorList.push(apiErrors.errors.SERVER_ERROR);
      break;
    default:
      errorList.push(apiErrors.errors.UNKNOWN_ERROR);
      break;
  }
  return apiErrors.create(message, method, endpoint, errorList, payload);
};
