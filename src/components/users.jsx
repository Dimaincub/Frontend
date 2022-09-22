import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((i) => i._id !== userId))
  }

  const renderPhrase = (number) => {
    return number > 4 || number < 2 ? 'человек тусанет' : 'человека тусанут'
  }

  return (
    <>
      <h3>
        <span
          className={`badge bg-${users.length === 0 ? 'danger' : 'primary'}`}
        >
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
            : 'Никто с тобой не тусанет'}
        </span>
      </h3>

      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Профессия</th>
              <th>Встретился, раз</th>
              <th>Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((i) => (
              <tr>
                <td>{i.name}</td>
                <td>
                  {i.qualities.map((qualitie) => (
                    <span className={`badge bg-${qualitie.color} m-1`}>
                      {qualitie.name}
                    </span>
                  ))}
                </td>
                <td>{i.profession.name}</td>
                <td>{i.completedMeetings}</td>
                <td>{i.rate}/5</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(i._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
