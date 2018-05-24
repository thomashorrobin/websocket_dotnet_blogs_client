import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BlogTable, AuthorTable, BlogpostList } from "./Tables";
import { BlogForm, AuthorForm, BlogpostForm } from "./Forms";

const url = 'ws://localhost:5000/ws';

class App extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      people: [],
      posts: [],
    }
    this.socket = new WebSocket(url);
    this.socket.onopen = event => { console.log(event); }
    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);
      console.log(data);
      if (data.MessageType === 'BUSINESS_OBJECT') {
        if (data.ClassName === 'BLOG') {
          if (data.Action === 'ADD_OR_REPLACE') {
            this.addBlog(data.Obj);
          }
        }
        if (data.ClassName === 'AUTHOR') {
          if (data.Action === 'ADD_OR_REPLACE') {
            this.addAuthor(data.Obj);
          }
        }
        if (data.ClassName === 'POST') {
          if (data.Action === 'ADD_OR_REPLACE') {
            this.addPost(data.Obj);
          }
        }
      }
    }
    this.socket.onerror = event => { console.log(event); }
    this.socket.onclose = event => console.log(event);
  }
  addBlog(blog){
    let blogs = this.state.blogs;
    blogs.push(blog);
    this.setState({ blogs });
  }
  addAuthor(author){
    let people = this.state.people;
    people.push(author);
    this.setState({ people });
  }
  addPost(post){
    let posts = this.state.posts;
    posts.push(post);
    this.setState({ posts });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="main-container">
          <BlogsContainer socket={this.socket} blogs={this.state.blogs}/>
          <BlogpostContainer socket={this.socket} posts={this.state.posts} blogs={this.state.blogs} authors={this.state.people}/>
          <AuthorContainer socket={this.socket} people={this.state.people}/>
        </div>
      </div>
    );
  }
}

function BlogsContainer(props) {
  return <div className="entity-container">
    <BlogForm socket={props.socket}/>
    <BlogTable blogs={props.blogs}/>
  </div>
}

function AuthorContainer(props) {
  return <div className="entity-container">
    <AuthorForm socket={props.socket}/>
    <AuthorTable authors={props.people}/>
  </div>
}

function BlogpostContainer(props) {
  return <div className="entity-container">
    <BlogpostForm socket={props.socket} blogs={props.blogs} authors={props.authors}/>
    <BlogpostList posts={props.posts}/>
  </div>
}

export default App;
