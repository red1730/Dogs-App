import React from 'react' ;
import {Link} from 'react-router-dom';

export default function LandingPage () {
return (
  <div className="landingpage">
      <h1>Welcome to Dogs</h1>
      <Link to= '/home'>
        <button>Go!</button>
      </Link>
  </div>
)

}