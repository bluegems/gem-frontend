import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import GemHeader from './components/GemHeader';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
        <Router>
          <Route path="/">
            <GemHeader />
            <Route exact path='/feed' component={Feed} />
          </Route>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          {/* <Route exact component={NotFound} /> */}
        </Router>
    </div>
  );
}

export default App;
