import { Component } from 'react';
import './app.css';

class App extends Component {
  componentDidMount() {
    console.log('钓鱼脑 App 启动');
  }

  componentDidShow() {
    console.log('App Show');
  }

  componentDidHide() {
    console.log('App Hide');
  }

  render() {
    return this.props.children;
  }
}

export default App;
