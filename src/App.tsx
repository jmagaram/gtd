import * as React from "react";
import "./App.css";
import { T as CreateForm } from "./containers//CreateFormContainer";
import { T as ActionItemList } from "./containers/ActionItemListContainer";
import { T as Notification } from "./containers/NotificationContainer";
import { T as View } from "./containers/View";
import logo from "./logo.svg";
import * as Store from "./store";

class App extends React.Component {
  private store = Store.createDefault();

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To Do List</h1>
        </header>
        <CreateForm store={this.store} />
        <View store={this.store} />
        <ActionItemList store={this.store} />
        <Notification store={this.store} />
      </div>
    );
  }
}

export default App;
