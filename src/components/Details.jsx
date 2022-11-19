import React, { useEffect } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate, Link } from "react-router-dom";
import modalStyle from "../styles/modal-style";
import Modal from "react-modal";
import {userTemplate} from "../constants";

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

const Value = styled.p`
  font-size: 20px;
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

const Edit = styled(Link)`
  text-decoration: none;
  border: none;
  color: white;
  background-color: #2764a5;
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
    background-color: #2587ef;
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

const Details = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState(userTemplate());

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    let u = props.getUser(id);
    if (!u) {
      navigate("/");
    }
    setUser(u);
  });

  const removeUser = () => {
    props.deleteUser(user._id);
    navigate("/users");
  };

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
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
      <Title>Detalles de Usuario:</Title>
      <Section>
        <Label>Nombre</Label>
        <Value>{user.name}</Value>
      </Section>
      <Section>
        <Label>Email</Label>
        <Value>{user.email}</Value>
      </Section>
      <Section>
        <Label>Password</Label>
        <Value>{user.password}</Value>
      </Section>
      <Section>
        <Label>Creado en</Label>
        <Value>{user.registered}</Value>
      </Section>
      <Section>
        <Label>Última actualización en</Label>
        <Value>{user.updated.toString()}</Value>
      </Section>
      <Buttons>
        <Edit to={`/edituser/${user._id}`}>
          <EditIcon />
        </Edit>
        <Delete onClick={openModal}>
          <DeleteIcon />
        </Delete>
      </Buttons>
    </Container>
  );
};

export default Details;
