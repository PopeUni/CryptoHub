import { makeStyles } from "@material-ui/core";
import React from "react";

const SelectButton = ({children, selected, onClick}) => {

    const useStyles = makeStyles({

        selectbutton: {
        
            border: "1px solid #041C32",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "#6998AB" : "",
            color: selected ? "black" : "black",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "#6998AB",
                color: "black"
            },
            width: "22%",
            

        }


    }) 
      

    const classes = useStyles();

    return (
        <span
        onClick={onClick}
            className={classes.selectbutton}
        
        >{children}</span>
    )


}

export default SelectButton