import React from 'react';
import { Button } from '@mui/material';
import theme from './../../theme';

const CommonButtonComponent = ({ children,onClick,sx, ...props }) => {
  return (
    <Button   
      onClick={onClick}         
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        background: theme.button.backgroundColor.main,
        color: theme.button.textColor.main,
        textTransform:'none',
        fontWeight: "700",
        
        border: `1px solid ${theme.button.backgroundColor.main}`,
        '&:hover': {
          backgroundColor: "transparent"
        },
        ...sx, 
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CommonButtonComponent;
