const messages = {
  movies: {
    delete: {
      notFound: 'Movie does not exist',
      forbidden: 'You may delete only own movies',
    },
  },
  users: {
    exists: 'User exists!',
    notFound: 'User is not found',
  },
  badRequestError: {
    default: 'Bad request',
  },
  conflictError: {
    default: 'Conflicting request',
  },
  forbiddenError: {
    default: 'Forbidden',
  },
  notFoundError: {
    default: 'Requested data not found',
  },
  unauthorizedError: {
    default: 'Authorization required',
  },
  internalServerError: {
    default: 'Internal server error',
  },
  invalidURL: 'You should specify valid URL!',
  invalidEmail: 'You should specify valid user email!',
  authFailed: 'Email or password are incorrect',
  pathNotFound: 'Endpoint or method not found',
  imageNotValid: 'Field image is not valid',
  trailerNotValid: 'Field trailer is not valid',
  thumbnailNotValid: 'Field thumbnail is not valid',
};
module.exports = messages;
