import * as React from 'react';
import * as View from 'src/components/View'
import * as Store from 'src/store'
import './App.css';

import logo from './logo.svg';

const store = Store.createDefault();

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <View.T store={store} />
      </div>
    );
  }
}

export default App;
