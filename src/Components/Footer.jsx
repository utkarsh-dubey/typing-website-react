import React from 'react';
import Select from 'react-select';
import { useTheme } from '../Context/ThemeContext';
import { themeOptions } from '../Utils/theme';

const Footer = () => {

    const {setTheme, defaultTheme} = useTheme();

    const handleThemeChange = (e)=>{
        console.log(e.value);
        setTheme(e.value);
        localStorage.setItem('theme', JSON.stringify(e.value));
    }


  return (
    <div className='footer'>
        <Select
            options={themeOptions}
            onChange={handleThemeChange}
            menuPlacement='top'
            defaultValue={{value:defaultTheme, label: defaultTheme.label}}
        />

    </div>
  )
}

export default Footer