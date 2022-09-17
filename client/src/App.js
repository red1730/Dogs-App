import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import DogCreated from './components/DogCreated'
import Detail from './components/Details'

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <Switch> 
      <Route exact path='/' component={LandingPage} />
      <Route path='/dogcreated' component={DogCreated}/>
      <Route path ='/home' component={Home}/>
      <Route path='/:id' component={Detail}/>
      </Switch>
    </div>
      </BrowserRouter>
  );
}

export default App;

//el Switch hace que siempre se mueva dentro de los Links establecidos