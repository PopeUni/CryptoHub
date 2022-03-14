
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Header from "./components/Header"
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import { makeStyles } from "@material-ui/core";
import { withThemeCreator } from "@material-ui/styles";
import Footer from "./components/Footer";


function App() {


  const useStyles = makeStyles( () => ({

    App: {

      backgroundColor: '#ECECEC',
      color: "white",
      minHeight: "100vh",

    },
  }));

  const classes = useStyles()


  return (

    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path="/" element={<Homepage /> } />
        <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>


  );
}

export default App;
