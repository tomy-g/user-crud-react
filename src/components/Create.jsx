import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ObjectID } from "bson";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import * as Styles from "./Create.style";
import { userTemplate } from "../constants";


const Create = (props) => {
  let navigate = useNavigate();

  const [user, setUser] = useState(userTemplate());

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [userOk, setUserOk] = useState(false);
  const [pulsed, setPulsed] = useState(false);

  useEffect(() => {
    setInvalidName(!user.name);
    setInvalidPassword(user.password.length >= 6 && user.password.length <= 12);
    setInvalidEmail(!validator.isEmail(user.email));
  }, [user]);

  useEffect(() => {
    setUserOk(!invalidEmail && !invalidName && !invalidPassword);
  }, [invalidEmail, invalidName, invalidPassword]);

  //Uses bson library to generate a MongoDB style ID.
  //If that id is already in the memory, creates a new one.
  const processUser = () => {
    if (userOk) {
      let id = new ObjectID().toString();
      // poco legible 
      while (props.users.find((x) => x._id === id)) {
        id = new ObjectID().toString();
      }
      props.addUser(user, id);
      navigate("/users");
    }
  };

  const addUser = () => {
    setPulsed(true);
    processUser();
  };

  return (
    <Styles.Container>
      <Styles.Title>Crear Ususario:</Styles.Title>
      <Styles.Section>
        <Styles.Label>Nombre</Styles.Label>
        <Styles.Value
          type="text"
          onChange={(event) => setUser({ ...user, name: event.target.value })  }
        />
        {pulsed && invalidName && (
          <Styles.ErrorText>El nombre no puede estar vacío.</Styles.ErrorText>
        )}
      </Styles.Section>
      <Styles.Section>
        <Styles.Label>Email</Styles.Label>
        <Styles.Value
          type="text"
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
          }}
        />
        {pulsed && invalidEmail && (
          <Styles.ErrorText>Introduce una dirección de email válida.</Styles.ErrorText>
        )}
      </Styles.Section>
      <Styles.Section>
        <Styles.Label>Password</Styles.Label>
        <Styles.Value
          type="text"
          onChange={(event) => setUser({ ...user, password: event.target.value})}
        />
        {pulsed && invalidPassword && (
          <Styles.ErrorText>La contraseña debe tener de 6 a 12 caracteres.</Styles.ErrorText>
        )}
      </Styles.Section>
      <Styles.Buttons>
        <Styles.Edit onClick={addUser}>
          <AddIcon />
        </Styles.Edit>
      </Styles.Buttons>
    </Styles.Container>
  );
};

export default Create;
