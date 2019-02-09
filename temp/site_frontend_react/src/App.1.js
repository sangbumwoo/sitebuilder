import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

function Welcome(props) {
  return <h1 className="w3-pink">Welcome, {props.name}</h1>;
}

function NumberList2(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul className="w3-ul w3-green">{listItems}</ul>;
}

function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  return <ul className="w3-ul w3-green">
      {numbers.map(number => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>;
}

const numbers = [1, 2];
const listItems = numbers.map(number => (
  <li key={number.toString()}>{number}</li>
));

function Blog(props) {
  const sidebar = (
    <ul>{props.posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
  );
  const content = props.posts.map(post => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  return (
    <div>
      <div className="w3-black">
        {sidebar}
      </div>
      <hr />
      <div className="w3-gray">
        {content} 
      </div>
    </div>
  );
}

const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." }
];


function FancyBorder(props) {
  return ( 
    <div className={"w3-topbar w3-leftbar w3-bottombar w3-rightbar w3-border-" + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <div className="Dialog-title">Welcome</div>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}


function Contacts() {
  return <div style={{height:30}} className="w3-container w3-red" />;
}

function Chat() {
  return <div style={{ height: 30 }} className="w3-purple" />;
}

function SplitPane(props) {
  return (
    <div className="w3-row">
      <div className="w3-col m4">{props.left}</div>
      <div className="w3-col m8">{props.right}</div>
    </div>
  );
} 

class App extends Component {
  render() {
    return (
      <div className="App">
        <SplitPane
          left={
            <Contacts />
          }
          right={
            <Chat />
          } />
        <WelcomeDialog />
        <Blog posts={posts} />
        <NumberList numbers={numbers} />
        <ul className="w3-ul w3-purple">{listItems}</ul>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        { Welcome({name:'John'}) }
        { this.Hello({name:'John'}) } */}

        <Welcome name="Sara" />
        <Welcome name="Cahal" />
      </div>
    );
  }

  Hello(props) {
    return <h1>Hello, {props.name}</h1>;
  }
}

class Aloha extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default App;
