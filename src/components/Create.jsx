import React, { useEffect } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { ObjectID } from "bson";
import validator from "validator";
import { useParams, useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 9.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 18.75vw;
  margin-right: 18.75vw;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-left: 200px;
`;

const Label = styled.h4`
  font-size: 20px;
`;

const Value = styled.input`
  margin-top: 5px;
  font-size: 20px;
  padding-left: 5px;
  width: 50%;
`;

const Title = styled.h1`
  color: #0c2846;
  font-size: 40px;
  margin-bottom: 60px;
  margin-left: 200px;
`;

const Buttons = styled.div`
  display: flex;
`;

const Edit = styled.button`
  border: none;
  color: white;
  background-color: #27a553;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 5px;
  width: 100px;
  margin-left: 200px;
  margin-top: 50px;
  &:hover {
    cursor: pointer;
    background-color: #1ed85f;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

const Create = (props) => {
  let navigate = useNavigate();

  const [user, setUser] = React.useState({
    _id: "",
    name: "",
    email: "",
    registered: "",
    updated: "",
    password: "",
  });

  const [invalidName, setInvalidName] = React.useState(false);
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);

  const [userOk, setUserOk] = React.useState(false);
  const [pulsed, setPulsed] = React.useState(false);

  useEffect(() => {
    !user.name ? setInvalidName(true) : setInvalidName(false);
    user.password.length >= 6 && user.password.length <= 12
      ? setInvalidPassword(false)
      : setInvalidPassword(true);
    validator.isEmail(user.email)
      ? setInvalidEmail(false)
      : setInvalidEmail(true);
  }, [user]);

  useEffect(() => {
    if (!invalidEmail && !invalidName && !invalidPassword) {
      setUserOk(true);
    } else {
      setUserOk(false);
    }
  }, [invalidEmail, invalidName, invalidPassword]);

  //Uses bson library to generate a MongoDB style ID.
  //If that id is already in the memory, creates a new one.
  const processUser = () => {
    if (userOk) {
      var id = new ObjectID().toString();
      while (props.users.find((x) => x._id === id) != undefined) {
        id = new ObjectID().toString();
      }
      console.log(id);
      props.addUser(user, id);
      navigate("/users");
    }
  };

  const addUser = () => {
    setPulsed(true);
    processUser();
  };

  return (
    <Container>
      <Title>Crear Ususario:</Title>
      <Section>
        <Label>Nombre</Label>
        <Value
          type="text"
          onChange={(event) => {
            setUser({ ...user, name: event.target.value });
          }}
        />
        {pulsed && invalidName && (
          <ErrorText>El nombre no puede estar vacío.</ErrorText>
        )}
      </Section>
      <Section>
        <Label>Email</Label>
        <Value
          type="text"
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
          }}
        />
        {pulsed && invalidEmail && (
          <ErrorText>Introduce una dirección de email válida.</ErrorText>
        )}
      </Section>
      <Section>
        <Label>Password</Label>
        <Value
          type="text"
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
        {pulsed && invalidPassword && (
          <ErrorText>La contraseña debe tener de 6 a 12 caracteres.</ErrorText>
        )}
      </Section>
      <Buttons>
        <Edit onClick={addUser}>
          <AddIcon />
        </Edit>
      </Buttons>
    </Container>
  );
};

export default Create;
