import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "../Components/Footer";
import TypingBox from "../Components/TypingBox";
import { useTheme } from "../Context/ThemeContext";
import { GlobalStyles } from "../Styles/global";
import { auth } from "../firebaseConfig";
import Header from "../Components/Header";

var randomWords =  require('random-words');

const HomePage = () => {

    const {theme} = useTheme();
    const words = randomWords(100);

  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles/>
        <Header/>
        <TypingBox words={words}/>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default HomePage