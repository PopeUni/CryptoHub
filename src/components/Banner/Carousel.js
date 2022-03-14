import { makeStyles, rgbToHex } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import {TrendingCoins} from "../../config/api";
import {CryptoState} from "../../CryptoContext";



//styles 
const useStyles = makeStyles((theme) => ({

carousel: {

height: "50%",
display: "flex",
alignItems: "center",
},

carouselItem: {

display: "flex",
flexDirection: "column",
alignItems: "center",
cursor: "pointer",
textTransform: "uppercase",
color: "white",


}


}))

//formatting for large numbers being displayed
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


const Carousel = () => {

    //will set and update the trending coins using the api data
    const [trending, setTrending] = useState([])

    const classes = useStyles();

    const {currency, symbol} = CryptoState();


    //a get request to the api to retrieve trending coin data
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data);
    };


    //whenever the user enters the site or refreshes the useEffect will call
    //the fetchtrending coins function to provide get the data on the 
    //latest trending coins
    // the currency will also be updated if it is changed
    useEffect(() => {
        fetchTrendingCoins();
    },[currency])


    //maps each item to cointain a symbol, 24h change, and current price of the coin
    const items = trending.map((coin) => {


        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
              <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
              />
              <span>
                {coin?.symbol}
                &nbsp;
                <span
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </span>
              <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
              </span>
            </Link>
          );
        });

    const responsive = {

        0: {
            items:2,
        },

        512: {

            items: 4,
        },
    };


    console.log(trending);




    return (
        <div className={classes.carousel}>
            
        <AliceCarousel
        
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive = {responsive}
        autoPlay
        items={
          //displays the items mapped above in the carousel
          items
          }
        />

    </div>
    )
}

export default Carousel