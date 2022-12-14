import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";

var randomWords =  require('random-words');

function App() {

  const {theme} = useTheme();
  const words = randomWords(100);

  // useEffect(()=>{
  //   console.log("theme in app", theme);
  // },[theme]);

  return (

    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles/>
        <h1>Typing Test</h1>
        <TypingBox words={words}/>
        <Footer/>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
