import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import Detail from './components/detail/detail';
import './index.css';
import NotFound from './components/notfound/NotFound';
// import ParticlesBg from './components/common/Particles';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                {/* <ParticlesBg /> */}
                <Header />
                <Switch>
                    <Route path="/" component={List} exact />
                    <Route path="/coin/:id" component={Detail} exact />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);