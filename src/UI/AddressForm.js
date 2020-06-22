import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import asyncValidate from "./asyncValidate";
import Box from "@material-ui/core/Box";
import validate from "./validateCheckoutForm";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  inputLabel: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    color: "white",
    fontSize: 18,
  },
  textInputOutline: {
    borderColor: "white",
    borderWidth: 1,
    fontSize: 18,
  },
  input: {
    fontSize: 18,
  },
  textField: {
    width: 200,
  },
  textFieldAddress: {
    width: 400,
  },
  button: {
    marginRight: theme.spacing(1),
  },
});

// const validate = (values) => {
//   const errors = {};
//   const requiredFields = ["address1", "postcode", "town_city"];
//   requiredFields.forEach((field) => {
//     if (!values[field]) {
//       errors[field] = "Required";
//     }
//   });
//   if (
//     values.email &&
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//   ) {
//     errors.email = "Invalid email address";
//   }

//   return errors;
// };

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      variant="outlined"
      InputProps={{ color: "primary" }}
      {...input}
      {...custom}
    />
  );
};

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
          color="default"
        />
      }
      label={label}
    />
  </div>
);

const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
  </FormControl>
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: "age",
        id: "age-native-simple",
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

const AddressForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column">
        <Box m={2}>
          <Field
            name="address1"
            component={renderTextField}
            label="Address Line 1"
            InputLabelProps={{ className: classes.inputLabel }}
            className={classes.textFieldAddress}
            InputProps={{
              classes: {
                notchedOutline: classes.textInputOutline,
                input: classes.input,
              },
            }}
          />
        </Box>
        <Box m={2}>
          <Field
            name="address2"
            component={renderTextField}
            label="Address Line 2"
            InputLabelProps={{ className: classes.inputLabel }}
            className={classes.textFieldAddress}
            InputProps={{
              classes: {
                notchedOutline: classes.textInputOutline,
                input: classes.input,
              },
            }}
          />
        </Box>
        <Box m={2}>
          <Field
            name="address3"
            component={renderTextField}
            label="Address Line 3"
            InputLabelProps={{ className: classes.inputLabel }}
            className={classes.textFieldAddress}
            InputProps={{
              classes: {
                notchedOutline: classes.textInputOutline,
                input: classes.input,
              },
            }}
          />
        </Box>
        <Box m={2}>
          <Field
            name="town_city"
            component={renderTextField}
            label="Town / City"
            InputLabelProps={{ className: classes.inputLabel }}
            className={classes.textFieldAddress}
            InputProps={{
              className: classes.textInput2,
              classes: {
                notchedOutline: classes.textInputOutline,
                input: classes.input,
              },
            }}
          />
        </Box>
        <Box m={2}>
          <Field
            name="county"
            component={renderTextField}
            label="County"
            InputLabelProps={{ className: classes.inputLabel }}
            className={classes.textFieldAddress}
            InputProps={{
              className: classes.textInput2,
              classes: {
                notchedOutline: classes.textInputOutline,
                input: classes.input,
              },
            }}
          />
        </Box>
        <Box m={2}>
          <Field
            name="postcode"
            component={renderTextField}
            label="Postcode"
            InputLabelProps={{ className: classes.inputLabel }}
            className={classes.textField}
            InputProps={{
              className: classes.textInput2,
              classes: {
                notchedOutline: classes.textInputOutline,
                input: classes.input,
              },
            }}
          />
        </Box>
      </Box>

      <Box>
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              props.handleBackPage();
            }}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              // props.handleNextPage();
            }}
            className={classes.button}
          >
            Next
          </Button>
        </div>

        {/* <Button
          variant="contained"
          type="submit"
          disabled={pristine || submitting}
          style={{ width: 100, fontSize: 20 }}
        >
          Payment
        </Button> */}
        {/* <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button> */}
      </Box>
    </form>
  );
};

export default reduxForm({
  form: "checkout_form", // a unique identifier for this form
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(withStyles(styles)(AddressForm));
// export default reduxForm({
//   form: "MaterialUiForm", // a unique identifier for this form
//   validate,
//   asyncValidate,
// })(withStyles(styles)(AddressForm));
