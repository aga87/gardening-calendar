export const getErrorMessage = (err: unknown) => {
  let error = '';
  if (err instanceof Error) {
    error = err.message;
  } else {
    error = 'Unknown server error';
  }
  return error;
};
