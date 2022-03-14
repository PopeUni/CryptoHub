import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { numberWithCommas } from "../components/Banner/Carousel";


const CoinPage = () => {

//gets the parameter which will be used to identify the coin the user has clicked on
// and to display the appropriate data
const { id } = useParams();

//useState to set and update the coin data from the api when the user enters or refreshes the page
const [coin,setCoin] = useState();

//sets and update the currency the user is using
const {currency, symbol} = CryptoState();


//request to the api to retrieve the coin data of the usrs choice using the users params
const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data)
}


console.log("this is coin" + coin);


//everytime the user enters the page useEffect will be called which will then call
//the fetch coin function to request api data
useEffect(() => {
    fetchCoin()
}, [])


//styles
const useStyles = makeStyles((theme) => ({

    container: {
        color: "black",
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
      },
      description: {
        fontSize: 20,
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },

      marketData: {
          alignSelf: "start",
          padding: 25,
          paddingTop: 10,
          width: "100%",

          // Making it responsive
          [theme.breakpoints.down("md")]: {

            display: "flex",
            justifyContent: "space-around",
          },

          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
          },

          [theme.breakpoints.down("xs")]: {
            alignItems: "start",

          }
      }


}))

const classes = useStyles();

//if coin data is not avaliable or empty, display a loading bar
if(!coin) return <LinearProgress style={{ backgroundColor: "#1A374D"}} />

return (

//use the api data to display the coin rank, current price and market cap

<div className={classes.container}>

    <div className={classes.sidebar}>

        <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20}}
        
         />

    <Typography variant="h3" className={classes.heading}>
        {coin?.name}
    </Typography>    

    <Typography variant="subtitle1" className={classes.description}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])
        
        }
    </Typography>


    <div className={classes.marketData}>

    <span style={{ display: "flex"}}>
        
        <Typography variant="h5" className={classes.heading}>
            Rank:
        </Typography>
        &nbsp;&nbsp;

        <Typography
            variant="h5"
            style={{fontFamily:"Montserrat"}}
        >
        {coin?.market_cap_rank}
        </Typography>
    </span>

    <span style={{ display: "flex"}}>
        
        <Typography variant="h5" className={classes.heading}>
            Current Price:
        </Typography>
        &nbsp;&nbsp;

        <Typography
            variant="h5"
            style={{fontFamily:"Montserrat"}}
        >

        {symbol}{" "}
        {numberWithCommas(
            coin?.market_data.current_price[currency.toLowerCase()]

        )}
        </Typography>
    </span>

    <span style={{ display: "flex"}}>
        
        <Typography variant="h5" className={classes.heading}>
            Market Cap:
        </Typography>
        &nbsp;&nbsp;

        <Typography
            variant="h5"
            style={{fontFamily:"Montserrat"}}
        >

        {symbol}{" "}
        {numberWithCommas(
            coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)

        )}
        M
        </Typography>
    </span>




    </div>

    </div>

    <CoinInfo coin={coin} />
  
    
</div>

)


}

export default CoinPage