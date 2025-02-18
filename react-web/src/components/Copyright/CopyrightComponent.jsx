import { Typography,Link } from "@mui/material";
const CopyrightComponent=()=>{
    return (
        <Typography variant="body2" color="text.secondary" align="center" >
          {'Copyright © '}
          <Link color="inherit" href="https://search.com.mm">
            NK-POS System
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    )
}
export default CopyrightComponent;