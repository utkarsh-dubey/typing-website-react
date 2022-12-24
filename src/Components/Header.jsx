import React from 'react'
import AccountIcon from './AccountIcon'
import CompareButton from './CompareButton'

const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            <span>
              LOGO
            </span>
            <div>
              <CompareButton/>
            </div>
            
        </div>
        <div className="user-logo">
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header