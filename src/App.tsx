import * as React from 'react';
import * as ActionItemList from 'src/containers/ActionItemListContainer'
import * as View from 'src/containers/View'
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
          <h1 className="App-title">To Do List</h1>
        </header>
        <View.T store={store} />
        <ActionItemList.T store={store} />
      </div>
    );
  }
}

export default App;
