import {AdminInterface} from './container/mainAdmin.js';
import Operation from './container/operation.js';
import AdminUserCreate from './container/account.js';
import Login from './container/login.js';
import {Private} from './components/private.js';
import {isLoggedIn} from './components/auth/auth.js';
import MainLogout from './components/logout.js';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    	<BrowserRouter>
    		<Private path="/edit" component={Operation} />
            <Private path="/admin" component={AdminInterface} />
    		<Route exact path="/login" component={Login} />
            <Route exact path="/signout" component={MainLogout} />
    		<Private exact path="/Database" component={AdminUserCreate} />
    	</BrowserRouter>
    </div>
  );
}

export default App;
