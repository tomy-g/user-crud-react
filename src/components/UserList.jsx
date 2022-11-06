import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import modalStyle from "../styles/modal-style";
import Modal from "react-modal";

const Container = styled.div`
  margin-top: 5.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 18.75vw;
  margin-right: 18.75vw;
`;

const Lista = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Item = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;
  margin-bottom: 15px;
  background-color: #eeeeee;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: black;
  min-width: 550px;
  z-index: 1;
  &:hover {
    cursor: pointer;
    background-color: #e9edff;
  }
`;

const Name = styled.p`
  flex: 5;
  font-weight: 00;
  font-size: 18px;
`;

const Email = styled.p`
  flex: 5;
  font-weight: 400;
  font-size: 18px;
`;

const Icon = styled.div`
  margin-left: 10px;
  flex: 3;
`;

const Edit = styled.button`
  border: none;
  color: white;
  background-color: #2764a5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 5px;
  margin-right: 30px;

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

  margin-right: 20px;

  z-index: 200;

  &:hover {
    cursor: pointer;
    background-color: #e61919;
  }
`;

const PagesSelector = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PageButton = styled.button`
  width: 50px;
  margin-right: 15px;
  padding: 15px;
  border: 0;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600px;
  font-size: 16px;
  background-color: #eeeeee;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e9edff;
    cursor: pointer;
  }
`;

const PageButtonDisabled = styled.button`
  width: 50px;
  margin-right: 15px;
  padding: 15px;
  border: 0;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600px;
  font-size: 16px;
  background-color: #0c2846;
  color: white;
`;

const ConfirmTitle = styled.h3`
  margin-top: 30px;
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

const Vacia = styled.h1`
  color: #0c2846;
  font-size: max(1.7vw, 17px);
  margin-top: 9.5vh;
  font-size: 4pc;
`;

const UserList = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let navigate = useNavigate();
  const [id, setId] = useState("");
  //Manages pagination system
  const [currentPage, setCurrentPage] = useState(1);
  const currentPages = props.users.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.users.length / 10); i++) {
    pageNumbers.push(i);
  }

  function openModal(uid) {
    setId(uid);
    setIsOpen(true);
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  const removeUser = () => {
    props.deleteUser(id);
    closeModal();
    navigate("/users");
  };

  return (
    <div>
      <Container>
        {props.users.length < 1 && <Vacia>Nada que mostrar 😞</Vacia>}
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
          <ConfirmSubtitle>Esta acción no se puede deshacer</ConfirmSubtitle>
          <Botones>
            <ConfirmButton onClick={removeUser}>Eliminar</ConfirmButton>
            <CancelButton onClick={closeModal}>Cancelar</CancelButton>
          </Botones>
        </Modal>
        <Lista>
          {currentPages.map((user) => (
            <Item key={user._id} to={`/readuser/${user._id}`}>
              <Icon>
                <Avatar sx={{ bgcolor: "#989ca0" }}>
                  {Array.from(user.name)[0].toUpperCase()}
                </Avatar>
              </Icon>
              <Name>{user.name}</Name>
              <Email>{user.email}</Email>
              <Link to={`/edituser/${user._id}`}>
                <Edit>
                  <EditIcon></EditIcon>
                </Edit>
              </Link>
              <Link>
                <Delete onClick={() => openModal(user._id)}>
                  <DeleteIcon></DeleteIcon>
                </Delete>
              </Link>
            </Item>
          ))}
        </Lista>
      </Container>
      <PagesSelector>
        {pageNumbers.map((number) =>
          number === currentPage ? (
            <PageButtonDisabled>{number}</PageButtonDisabled>
          ) : (
            <PageButton key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </PageButton>
          )
        )}
      </PagesSelector>
    </div>
  );
};

export default UserList;
