import React from 'react';

export const BlogTable = (props) => {
    let blogs = props.blogs.map(b => <tr key={b.Id}><td className="uuid">{ b.Id }</td><td>{ b.Name }</td></tr>);
    return <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            { blogs }
        </tbody>
    </table>
}

export const AuthorTable = (props) => {
    let authors = props.authors.map(b => <tr key={b.Id}><td className="uuid">{ b.Id }</td><td>{ b.FirstName }</td><td>{ b.LastName }</td></tr>);
    return <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
        </thead>
        <tbody>
            { authors }
        </tbody>
    </table>
}

export const BlogpostList = (props) => {
    let posts = props.posts.map(p => <h2 key={p.Id}>{ p.Title }</h2>);
    return <div>
        { posts }
    </div>
}