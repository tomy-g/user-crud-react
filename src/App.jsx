import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import usersData from "./data/users.json";
import UserList from "./components/UserList";
import Details from "./components/Details";
import Update from "./components/Update";
import Create from "./components/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import moment from "moment";


/*
  This is the main component.
  Uses ReactRouter and the previous imported components as childs.

  It keeps the state of the users, and the logic to add, read, update or delete users.
*/

const App = () => {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(false);

  // Loads users into memory
  useEffect(() => {
    if(file){
      setUsers(usersData);
    }
  }, [file]);

  // Only loads file once
  const loadFile = ()=>{
    if(!file){
      setFile(true);
    }
  }


  // TODA esta logica sacarla a un helper o service 

  // Called by child component, Returns the user data by passing the id.
  const getUser = (id) => {
    if (users.length > 0) {
      let u = users.find((x) => x._id === id);
      return u;
    }
  };

  // Called by child component, updates an user from the array
  const updateUser = (_user) => {
    let newDate = new Date();
    newDate = moment(newDate).format("YYYY-MM-DDThh:mm");
    _user = {..._user, updated: newDate};
    const index = users.findIndex((x) => x._id === _user._id);
    let usersCopy = users;
    usersCopy[index] = _user;
    setUsers(usersCopy);
  };

  //Called by child component, adds user to the memory
  const addUser = (_user, newId) => {
    let newDate = new Date();
    newDate = moment(newDate).format("YYYY-MM-DDThh:mm");
    _user = {..._user, updated: newDate, registered: newDate, _id: newId};
    let usersCopy = users;
    usersCopy.push(_user);
    setUsers(usersCopy);
  };

  // Called by child component, removes an user from the array
  const deleteUser = (_user) => {
    //setUsers(service.deleteuser(usersCopy));

    const index = users.findIndex((x) => x._id == _user);
    let usersCopy = users;
    usersCopy.splice(index, 1);
    setUsers(usersCopy);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home users={users} loadFile={loadFile} />} />
          <Route
            exact
            path="/users"
            element={<UserList users={users} deleteUser={deleteUser} />}
          />
          <Route exact path="/adduser" element={<Create addUser={addUser} users={users} />} />
          <Route
            exact
            path="/edituser/:id"
            element={
              <Update
                getUser={getUser}
                updateUser={updateUser}
                deleteUser={deleteUser}
              />
            }
          />
          <Route
            exact
            path="/readuser/:id"
            element={<Details getUser={getUser} deleteUser={deleteUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

