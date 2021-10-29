import './App.scss';
import Home from './Components/Home';
import Error from './Components/Error';
import User from './Components/User';
import OtherRoute from './Components/OtherRoute'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export function App() {
    return (
        <div className="App" >
            <BrowserRouter>
                <Switch>
                    {/** Home Page Route **/}
                    <Route exact path='/' component={Home} />

                    {/** Error Page Route **/}
                    <Route exact path='/404' component={Error} />

                    {/** Users Page Route **/}
                    <Route path='/users/:user' component={User} />

                    {/** Any Other Route ) **/}
                    <Route exact path='/*' component={OtherRoute} />
                </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;