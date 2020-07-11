const validate = (values) => {
  const errors = {};

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "address1",
    "postcode",
    "town_city",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  //console.log("errors", errors);
  return errors;
};
export default validate;
