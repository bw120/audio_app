import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor() {
    super();
  }
  render() {
    const arr = ["one", "two", "three"];

    return (
      <div>
        <h1>React is working!!!!</h1>
        <ul>{[...arr].map((item, key) => <li key={key}>{item}</li>)}</ul>
      </div>
    );
  }
}
export default App;