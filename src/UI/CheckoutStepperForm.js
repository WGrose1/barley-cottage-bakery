import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StepConnector from "@material-ui/core/StepConnector";
import ContactDetailsForm from "../UI/ContactDetailsForm";
import AddressForm from "../UI/AddressForm";
import PaymentForm from "../UI/PaymentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepperRoot: {
    backgroundColor: "transparent",
    padding: [[5, 0]],
  },
  iconText: {
    fontWeight: 700,
  },
  stepLabel: {
    // display: "none",
    fontSize: 20,
  },
  activeLabel: { color: "red" },
  stepIcon: {
    height: 35,
    width: 35,
  },
  labelContainer: {},
  iconContainer: { padding: 5 },
}));

function getSteps() {
  return ["Contact Details", "Postal Address", "Payment"];
}

const Connector = () => {
  return (
    <div>
      <img alt="arrow" width={90} src="./assets/doodles/arrow1.svg" />
    </div>
  );
};

export default function CheckoutStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const steps = getSteps();

  const isStepOptional = (step) => {
    //return step === 1;
    return false;
  };

  const CustomStepIcon = () => {
    return <img width={120} src="./assets/doodles/circle-doodle-contact.svg" />;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ContactDetailsForm
            handleBackPage={handleBack}
            handleNextPage={handleNext}
          />
        );
      case 1:
        return (
          <AddressForm
            handleBackPage={handleBack}
            handleNextPage={handleNext}
          />
        );
      case 2:
        return <PaymentForm />;
      default:
        return "";
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        classes={{ root: classes.stepperRoot }}
        activeStep={activeStep}
        // connector={
        //   <StepConnector
        //     classes={{
        //       active: classes.connectorActive,
        //       completed: classes.connectorCompleted,
        //       line: classes.line,
        //     }}
        //   />
        // }
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                classes={{ label: classes.stepLabel }}
                StepIconProps={{
                  classes: {
                    text: classes.iconText,
                    root: classes.stepIcon,
                    // labelContainer: classes.labelContainer,
                    // iconContainer: classes.iconContainer,
                    // active: classes.activeLabel,
                  },
                }}
                // StepIconComponent={CustomStepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography component={"span"} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
