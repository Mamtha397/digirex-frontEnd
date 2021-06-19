import React, { useState } from 'react';
import useToken from '../App/useToken';

export default function Dashboard() {
    const [username, setUserName] = useState();
    const { token, setToken } = useToken();
    const [data, setData] = useState();



  async function loginUser(credentials) {
    return fetch('http://localhost:8000/medical/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await loginUser({
      name: username,
    });
    setData(result?.result)
  }
  return(
      <div>
        <h2>Dashboard</h2>
        <form onSubmit={handleSubmit}>
            <label>
            <p>name</p>
            <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <div>
            <button type="submit">Submit</button>
            </div>
        </form>
      </div>
  );
}