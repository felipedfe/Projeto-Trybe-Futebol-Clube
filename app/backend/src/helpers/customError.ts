const customError = (name: string, message:string) => {
  const error = new Error();
  error.name = name;
  error.message = message;

  return error;
};

export default customError;
