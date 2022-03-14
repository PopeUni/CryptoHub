import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";


const useStyles = makeStyles(() => ({

title: {
  
    flex: 1,
    color: "#EEEDDE",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
},


headerB: {

backgroundColor: "#141E27"

}

}))

const Header = () => {


    const classes = useStyles();

    const history = useNavigate();


    const {currency, setCurrency} = CryptoState();


    console.log(currency);


    const darkTheme = createTheme( {
       palette: {
           primary: {
            main: "#141E27",
           },
           type: "dark"
            
        },
 });

    return (
        <ThemeProvider //theme={darkTheme}
        >
        <AppBar className={classes.headerB} position="static">
        
            <Container>
                <Toolbar style={{
                    

                }}
                >
                    <Typography onClick={() => history("/")} className={classes.title} variant="h6">Crypto Hub</Typography>
                
                <Select variant="outlined" style={{

                        backgroundColor:"#ECECEC",
                        color: "#141E27",  
                        width: 100,
                        height: 40,
                        marginRight: 15,

                    }}
                    value={currency}
                    //changing the currency using the drop down menu will update the currency for the
                    //entire site
                    onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                        <MenuItem value={"AUD"}>AUD</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>

    </ThemeProvider>
        
    
    )
}

export default Header