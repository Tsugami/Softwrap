import React, { useEffect, useState } from 'react'
import AppContainer from './styles/AppContainer'
import AppContent from './components/AppContent'
import SearchBar from './components/SearchBar'
import Card from './components/Card'
import { getUsers, createUser, updateUser, deleteUser } from './services/api'
import Form from './components/Form'

function App() {
  const [users, setUsers] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [updateUserId, setUpdateUserId] = useState(null)

  useEffect(() => getUsers().then(users => setUsers(users ?? [])), []);

  async function getUsersHandler (input) {
    try {
      const newUsers = await getUsers({ name: input })
      setUsers(newUsers)
    } catch (error) {
      console.error(error)
    }
  }

  async function createUserHandler (data) {
    try {
      await createUser(data)
      setShowForm(false)
    } catch (error) {
      console.error('alo', error)
      console.log(error?.response.data);
        console.log(error?.response.status);
        console.log(error?.response.headers);
    }
  }

  async function updateUserHandler (data) {
    try {
      await updateUser(updateUserId, data).catch(() => null)

    const {
      name,
      age,
      civilState,
      cpf,
      stateUf,
      city,
    } = data

    const userIndex  = users.findIndex(u => u.userId === updateUserId)

    if (userIndex !== -1) {
      users[userIndex] = {
        name,
        age,
        civil_state: civilState,
        cpf,
        state_uf: stateUf,
        city,
        userId: updateUserId }
      setUsers(users)
      setUpdateUserId(null)
      setShowForm(false)
    }
    } catch (error) {
      console.error('alo', error)
      console.log(error?.response.data);
      console.log(error?.response.status);
      console.log(error?.response.headers);
    }
  }

  async function deleteUserHandler (userId) {
    try {
      await deleteUser(userId)
      const newUsers = users.filter(u => u.userId !== userId)
      setUsers(newUsers)
    } catch (error) {
      console.error(error?.message ?? error)
    }
  }

  async function updateButtonHandler (userId) {
    setUpdateUserId(userId)
    setShowForm(true)
  }

  return (
    <>
      {
        showForm ?
          <Form
            data={updateUserId ? users.find(user => user.userId === updateUserId) : null}
            handler={updateUserId ? updateUserHandler : createUserHandler}
            cancelHandler={() => setShowForm(false) && setUpdateUserId(null)}
            buttonContent={updateUserId ? 'Atualizar' : 'Registrar'}
          ></Form> : null}
      <AppContainer>
        <div>
          <SearchBar
            newRegister={() => setShowForm(true) && setUpdateUserId(null)}
            onClickHandler={getUsersHandler}></SearchBar>
          {/* <SearchFilter></SearchFilter> */}
        </div>
        <AppContent>
          {users.map((user) => <Card
            updateButtonHandler={() => updateButtonHandler(user.userId)}
            deleteButtomHandler={() => deleteUserHandler(user.userId)}
            key={user.userId}
            user={user}
            />)}
        </AppContent>
      </AppContainer>
    </>
  );
}

export default App;

