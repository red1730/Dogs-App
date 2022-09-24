import React from 'react' ;
import {Link} from 'react-router-dom';
import "./styles/landingpage.css"

export default function LandingPage () {
return (
<div>
  <div className="landingpage">
        <h1>dogs.</h1>
          </div>
            <div className='subtitle'>
              <h1>your bestie, my bestie.</h1>
            </div>
          <div>
           <Link to= '/home'>
             <button className='button'>Entry</button>
           </Link>
          </div>
  </div>
 )
}