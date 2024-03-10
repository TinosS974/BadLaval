import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/LeaderBoard.css";

const apiUrl = process.env.REACT_APP_API_URL;

export default function LeaderBoard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}users`);
        const sortedUsers = response.data.sort((a, b) => b.rating - a.rating);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="leaderboard-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Classement</th>
            <th>Nom</th>
            <th>Cote</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
