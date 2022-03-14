import { CircularProgress, createTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import SelectButton from "./SelectButton";


const CoinInfo = ({ coin }) => {


    //will be used to set and update the historical data and days when first 
    // grabbed and when a change occurs
    const [historicalData, setHistoricData]  = useState();
    const [days, setDays] = useState(1);

    //will be used to update the currency when ever it is changed
     const { currency } = CryptoState();

     const fetchHistoricalData = async () => {

        const {data} = await axios.get(HistoricalChart(coin.id, days, currency))

        setHistoricData(data.prices)
     };

     useEffect(() => {

        fetchHistoricalData();
     }, [currency, days])


     //theme
     const darkTheme = createTheme ({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
     })

     //styles
     const useStyles = makeStyles((theme) => ({
        container: {
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        },
      }));
     const classes = useStyles();

return (

    <ThemeProvider theme={darkTheme}
    
    >
        <div className={classes.container}>

        {/* chart */}

        {
            //checks to see if the historicalData cointains any datam if not, display progress bar
            //else display line chart
            !historicalData ? (
                <CircularProgress
                style={{color: "#041C32"}}
                size={250}
                thickness={1}
                 />
            ) : (

                
                <>
                <Line 
                    //gets the date data from api and maps it in order to get date in 
                    //hours and minutes format for the labels of the chart
                    data={{
                        labels:historicalData.map(coin => {

                         let date = new Date(coin[0]);

                            let time = 
                                date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`   
                                    : `${date.getHours()}:${date.getMinutes()}AM`;


                            return days===1?time:date.toDateString();     

                        }),


                        
                        datasets: [
                            {
                                data:historicalData.map((coin)=>coin[1]), //maps the api data in order to display coin data
                                label: `Price ( Past ${days} Days ) in ${currency}`,
                                borderColor: "#041C32",
                            },
                            ],
                    }}

                    //removes date circles on line graph
                    options = {{
                        elements: {
                            point: {
                                radius:1,
                            },
                        },
                    }}
                />

                <div
                
                style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%",
                }}
                >

                    {chartDays.map(day=> (

                        <SelectButton
                        key={day.value}
                        onClick={() => setDays(day.value)}
                        selected={day.value === days}
                        >
                            {day.label}
                        </SelectButton>
                    ))}   


                </div>

                </>
            )
        } 



         

        </div>

    </ThemeProvider>

)

}

export default CoinInfo