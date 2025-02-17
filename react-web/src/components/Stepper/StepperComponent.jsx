import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';
import { stepConnectorClasses } from '@mui/material/StepConnector';

// Custom StepConnector styled component
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

// Custom step icon component
const StepIconContainer = styled('div')(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[300],
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  fontSize: 18,
}));

const CustomStepIcon = (props) => {
  const { active, icon } = props;
  return <StepIconContainer active={active}>{icon}</StepIconContainer>;
};

function StepperComponent({ activeStep, steps }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '80%', margin: '0 auto' }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={steps.length > 1 ? <QontoConnector /> : null}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} icon={index + 1} />}>
                <Typography variant="h5" sx={{ fontSize: '12px' }}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}

export default StepperComponent;
