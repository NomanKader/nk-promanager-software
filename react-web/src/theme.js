import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {      
      primary: {
        main: '#2981b8',
        text: "#FA977A",
        contrastText: "#fff"        
      },
      secondary:{
        main:'#2db9dd',
        backgroundColor: "#ffffff"
      },
      Card: {
        main: "#F98C6BE5"
      },
      action:{
        main:'#EADDFF'
      },
      text:{
        main:'#001619',
        
      },
      success:{
        main:'#008080'
      },
      warning:{
        main:'#FFA700'
      },
      error:{
        main:"#C30000"
      },
      default:{
        main:"#fff"
      },
      hover: {
        main: "#F98C6B"
      }
      
    },
    components:{
      dashboard:{
        titleColor:'#7A165B',
        saleCircleIcon:'#6FD195',
        rentCircleIcon:"#FFAE4C",
        saleCarCircleIcon:"#FFAE4C",
        inquiryOtherCircleIcon:"#ea615e",
        welcomeTextColor:"#AC2582",
        inquiryTitleColor:'#001619B2'
      }
    },

    typography:{ 
      "h4":{        
        fontWeight:'bold'
      } ,  
      "h6":{
        fontWeight:'bold'
      },
    },
    Stepper:{
      border:{
        main: '#ea625e'
      }
    },
    homePage:{
      navbar:'#FFFFFF',
      backgroundColor:'#e3e1f7'
    },
    mobileDrawer: {
      backgroundColor: "#fafafa"
    },
    button: {
      backgroundColor: {
        main: "#F98C6B"
      },
      textColor: {
        main: "#000000"
      }
    }
  });
  export default theme;