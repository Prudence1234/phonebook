import React, { useState, useEffect } from 'react';
import'./App.css'
const App = () => {
   const [name, setName] = useState('');
   const [contact, setContact] = useState('');
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchPost = async () => {
         const response = await fetch(
            'http://localhost:3001/contact'
         );
         const data = await response.json();
         console.log(data);
         setPosts(data);
      };
      fetchPost();
   }, []);

   const deletePost = async (id) => {
      let response = await fetch(
         `http://localhost:3001/contact/${id}`,
         {
            method: 'DELETE',
         }
      );
      console.log(response.status)
      if (response.status === {id}) {
         setPosts(
            posts.filter((post) => {
               return post.id !== id;
            })
         );
      } else {
         return;
      }
   };

   const addContact = async (name, contact) => {
      let response = await fetch('http://localhost:3001/contact', {
         method: 'POST',
         body: JSON.stringify({
            name: name,
            contact: contact,
            // userId: Math.random().toString(36).slice(2),
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      });
      let data = await response.json();
      setPosts((posts) => [data, ...posts]);
      setName('');
      setContact('');
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      addContact(name, contact);
   };
  
return (<>
   {posts.map((props) =>{
    return  <React.Fragment>
      <div>
      <p >{props.name}</p>
      <p >{props.contact}</p>
      </div>    

      <div className="app">
          <div className="add-post-container">
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input name="" className="form-control" id="" 
                  value={contact} onChange={(e) => setContact(e.target.value)} 
                ></input>
                <button type="submit">Add contact</button>
                <button className="button">
                  <div className="delete-btn" onClick={() => deletePost(contact.id)}>Delete</div>
                </button>
            </form>
          </div>

      </div>
   </React.Fragment>
   })}

</>);
};

export default App;
