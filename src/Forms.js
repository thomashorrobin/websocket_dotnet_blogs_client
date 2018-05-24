import React, { Component } from 'react';

export class BlogForm extends Component {
    constructor() {
        super();
        this.state = {
            blogName: ''
        }
    }
    handleChange(event) {
      this.setState({blogName: event.target.value});
    }
    submit(){
        let payload = {
            messageType: 'BUSINESS_OBJECT',
            className: 'BLOG',
            action: 'CREATE',
            obj: {
                name: this.state.blogName
            }
        }
        this.props.socket.send(JSON.stringify(payload));
        this.setState({blogName: ''});
    }
    render() {
        let canSubmit = this.state.blogName.length > 0;
        return <div>
            <input type="text" placeholder="blog name" value={this.state.blogName} onChange={this.handleChange.bind(this)}/>
            <br />
            <button disabled={ !canSubmit } onClick={this.submit.bind(this)}>Add</button>
        </div>
    }
}

export class AuthorForm extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
        }
    }
    handleFirstNameChange(event) {
      this.setState({ firstName: event.target.value });
    }
    handleLastNameChange(event) {
      this.setState({ lastName: event.target.value });
    }
    submit(){
        let payload = {
            messageType: 'BUSINESS_OBJECT',
            className: 'AUTHOR',
            action: 'CREATE',
            obj: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            }
        }
        this.props.socket.send(JSON.stringify(payload));
        this.setState({firstName: '', lastName: ''});
    }
    render(){
        let canSubmit = this.state.firstName.length > 0 && this.state.lastName.length > 0;
        return <div>
            <input type="text" placeholder="first name" value={this.state.firstName} onChange={this.handleFirstNameChange.bind(this)}/>
            <br />
            <input type="text" placeholder="last name" value={this.state.lastName} onChange={this.handleLastNameChange.bind(this)}/>
            <br />
            <button disabled={ !canSubmit } onClick={this.submit.bind(this)}>Add</button>
        </div>
    }
}

export class BlogpostForm extends Component {
    constructor() {
        super();
        this.state = {
            authorId: '',
            blogId: '',
            title: '',
            content: '',
        }
    }
    handleTitleChange(event) {
      this.setState({ title: event.target.value });
    }
    handleContentChange(event) {
      this.setState({ content: event.target.value });
    }
    handleAuthorChange(event) {
        console.log(event.target.value);
      this.setState({ authorId: event.target.value });
    }
    handleBlogChange(event) {
      this.setState({ blogId: event.target.value });
    }
    submit(){
        let payload = {
            messageType: 'BUSINESS_OBJECT',
            className: 'POST',
            action: 'CREATE',
            obj: this.state
        }
        this.props.socket.send(JSON.stringify(payload));
    }
    render(){
        let blogOptions = this.props.blogs.map(b => <option key={b.Id} value={b.Id}>{ b.Name }</option>);
        let canSubmit = this.state.authorId.length > 0 && this.state.blogId.length > 0 && this.state.content.length > 0 && this.state.title.length > 0;
        let authorOptions = this.props.authors.map(b => <option key={b.Id} value={b.Id}>{ b.FullName }</option>);
        return <div>
            <select value={this.state.blogId} onChange={this.handleBlogChange.bind(this)}>
                { blogOptions }
            </select>
            <br />
            <select value={this.state.authorId} onChange={this.handleAuthorChange.bind(this)}>
                { authorOptions }
            </select>
            <br />
            <input type="text" placeholder="title" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
            <br />
            <input type="text" placeholder="content" value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
            <br />
            <button onClick={this.submit.bind(this)} disabled={ !canSubmit }>Add</button>
        </div>
    }
}