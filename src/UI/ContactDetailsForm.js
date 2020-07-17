import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
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
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import validate from "./validateCheckoutForm";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

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
  reponsiveInput: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
});

// const validate = (values) => {
//   const errors = {};
//   console.log("values", values);
//   try {
//     const requiredFields = ["firstName", "lastName", "email"];
//     requiredFields.forEach((field) => {
//       if (!values[field]) {
//         errors[field] = "Required";
//       }
//     });
//     if (
//       values.email &&
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//     ) {
//       errors.email = "Invalid email address";
//     }
//     console.log("errs", errors);
//   } catch (error) {
//     console.log(error);
//   }
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

const ContactDetailsForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexWrap="wrap" flexDirection="column">
        <Box m={0.5} display="flex" flexWrap="wrap">
          <Box m={0.5} className={classes.reponsiveInput}>
            <Field
              name="firstName"
              component={renderTextField}
              className={classes.textField}
              label="First Name"
              // classes={{ root: classes.textField2 }}
              InputLabelProps={{ className: classes.inputLabel }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textInputOutline,
                  input: classes.input,
                },
              }}
            />
          </Box>
          <Box m={0.5} className={classes.reponsiveInput}>
            <Field
              // classes={classes}
              name="lastName"
              component={renderTextField}
              className={classes.textField}
              label="Last Name"
              InputLabelProps={{ className: classes.inputLabel }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textInputOutline,
                  input: classes.input,
                },
              }}
            />
          </Box>
        </Box>
        <Box m={0.5} display="flex" flexWrap="wrap">
          <Box m={0.5} className={classes.reponsiveInput}>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              className={classes.textField}
              InputLabelProps={{ className: classes.inputLabel }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textInputOutline,
                  input: classes.input,
                },
              }}
            />
          </Box>
          <Box m={0.5} className={classes.reponsiveInput}>
            <Field
              name="telephone"
              component={renderTextField}
              label="Telephone"
              className={classes.textField}
              InputLabelProps={{ className: classes.inputLabel }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textInputOutline,
                  input: classes.input,
                },
              }}
            />
          </Box>
        </Box>
        {/* <div>
        <Field name="sex" component={radioButton}>
          <Radio value="male" label="male" />
        </Field>
      </div> */}
        <Box m={1} className={classes.reponsiveInput}>
          <Field
            name="notes"
            style={{ width: matchesMd ? "80%" : 415, maxWidth: 415 }}
            component={renderTextField}
            label="Additional information"
            multiline
            rowsMax="4"
            margin="normal"
            placeholder="Any additional information you wish to let us know, dietary requirements etc..."
            InputLabelProps={{ className: classes.inputLabel }}
            className={classes.textField}
            InputProps={{
              classes: {
                notchedOutline: classes.textInputOutline,
                input: classes.input,
              },
            }}
          />
        </Box>
        <Box mx={0.5} mb={2}>
          <Field
            name="signup"
            component={renderCheckbox}
            label="sign up to our email newsletter containing exciting information and promotional discounts?"
          />
        </Box>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
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
})(withStyles(styles)(ContactDetailsForm));

// export default reduxForm({
//   form: "MaterialUiForm", // a unique identifier for this form
//   validate,
//   asyncValidate,
// })(withStyles(styles)(ContactDetailsForm));
