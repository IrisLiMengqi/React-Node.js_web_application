import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './home'
import Main from './main'
import React, { Component } from 'react';
// HashRouter # 
// BrowserRouter history 模式
class App extends Component {
  render() {
    return (
      <HashRouter>
          <Switch>
            {/* kwh路由 */}
            <Route exact path="/"  component={Home} />
            {/* main页面路由 */}
            <Route exact path="/main" component={Main} />
            {/* 默认跳转到kwh */}
            <Route path="/" render={() => {
              return <Redirect to="/" />
            }} />
          </Switch>
      </HashRouter>
    );
  }
}
export default App

