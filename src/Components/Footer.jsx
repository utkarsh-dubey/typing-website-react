import React from 'react';
import Select from 'react-select';
import { useTheme } from '../Context/ThemeContext';
import { themeOptions } from '../Utils/theme';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

    const {setTheme, defaultTheme} = useTheme();

    const handleThemeChange = (e)=>{
        console.log(e.value);
        setTheme(e.value);
        localStorage.setItem('theme', JSON.stringify(e.value));
    }


  return (
    <div className='footer'>

      <div className="links">
          <GitHubIcon style={{marginRight:'4px'}}/>
          <LinkedInIcon/>
      </div>

      <div className="themes">  
        <Select
              options={themeOptions}
              onChange={handleThemeChange}
              menuPlacement='top'
              defaultValue={{value:defaultTheme, label: defaultTheme.label}}
          />
      </div>

        

    </div>
  )
}

export default Footer