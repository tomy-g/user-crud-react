import React, { useEffect } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "react-modal";
import { useParams, useNavigate } from "react-router-dom";
import validator from "validator";
import modalStyle from "../styles/modal-style";

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
  transition: all 0.2s ease;
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
  background-color: #b49021;
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
    background-color: #dca910;
  }
`;

const Delete = styled.button`
  border: none;
  color: white;
  background-color: #a52727;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.2s ease;
  width: 100px;
  margin-left: 50px;
  margin-top: 50px;

  &:hover {
    cursor: pointer;
    background-color: #e61919;
  }
`;

const ConfirmTitle = styled.h3`
  margin-left: 10px;
  font-size: 22px;
`;

const ConfirmSubtitle = styled.p`
  margin-top: 20px;
  margin-left: 10px;
  font-size: 18px;
  font-weight: 400;
`;

const Botones = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 55px;
  margin-left: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #a52727;
  color: white;
  transition: all 0.2s ease;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 100px;
  padding: 10px;
  margin: 0;
  font-size: 16px;
  &:hover {
    cursor: pointer;
    background-color: #e61919;
  }
`;

const CancelButton = styled.button`
  background-color: #ededed;
  color: black;
  transition: all 0.2s ease;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 100px;
  padding: 10px;
  margin-left: 20px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

Modal.setAppElement(document.getElementById("root"));

const Update = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { id } = useParams();
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

  // Tries to load  the user, if not, navigates to Home
  useEffect(() => {
    let u = props.getUser(id);
    if (!u) {
      navigate("/");
    }
    setUser(u);
  }, []);

  // Shows error messages in the inputs
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

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  const processUser = () => {
    if (userOk) {
      props.updateUser(user);
      navigate("/users");
    }
  };

  const removeUser = () => {
    props.deleteUser(user._id);
    navigate("/users");
  };

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <ConfirmTitle>
          ¿Estás seguro de que quieres eliminar este usuario?
        </ConfirmTitle>
        <ConfirmSubtitle>Esta acción no se puede deshacer.</ConfirmSubtitle>
        <Botones>
          <ConfirmButton onClick={removeUser}>Eliminar</ConfirmButton>
          <CancelButton onClick={closeModal}>Cancelar</CancelButton>
        </Botones>
      </Modal>
      <Title>Actualizar Usuario:</Title>
      <Section>
        <Label>Nombre</Label>
        <Value
          type="text"
          value={user.name}
          onChange={(event) => {
            setUser({ ...user, name: event.target.value });
          }}
        />
        {invalidName && <ErrorText>El nombre no puede estar vacío.</ErrorText>}
      </Section>
      <Section>
        <Label>Email</Label>
        <Value
          type="text"
          value={user.email}
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
          }}
        />
        {invalidEmail && (
          <ErrorText>Introduce una dirección de email válida.</ErrorText>
        )}
      </Section>
      <Section>
        <Label>Password</Label>
        <Value
          type="text"
          value={user.password}
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
        {invalidPassword && (
          <ErrorText>La contraseña debe tener de 6 a 12 caracteres.</ErrorText>
        )}
      </Section>
      <Section>
        <Label>Creado en</Label>
        <Value
          type="datetime-local"
          value={user.registered}
          onChange={(event) => {
            setUser({ ...user, registered: event.target.value });
          }}
        />
      </Section>
      <Buttons>
        <Edit onClick={processUser}>
          <UpdateIcon />
        </Edit>
        <Delete onClick={openModal}>
          <DeleteIcon />
        </Delete>
      </Buttons>
    </Container>
  );
};

export default Update;
