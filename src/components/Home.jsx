import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import modalStyle from "../styles/modal-style";

const Container = styled.div`
  margin-top: 9.5vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const TitleText = styled.h1`
  color: #0c2846;
  font-size: max(1.7vw, 17px);
`;

const DataText = styled.h1`
  color: #db1b43;
  font-size: max(15vw, 150px);
`;

const UserText = styled.h1`
  color: #0c2846;
  font-size: max(3.5vw, 34px);
`;

const AddFile = styled.button`
  color: white;
  background-color: #db1b43;
  border: none;
  width: max(18vw, 175px);
  margin-top: 40px;
  padding-top: 25px;
  padding-bottom: 25px;
  font-size: max(1.7vw, 17px);
  border-radius: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: #e61919;
  }
`;

const ConfirmTitle = styled.h3`
  margin-top: 20px;
  margin-left: 10px;
  font-size: 22px;
`;

const ConfirmSubtitle = styled.p`
  margin-top: 20px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 400;
`;

const Botones = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: auto;
  margin-bottom: 15px;
  margin-left: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #db1b43;
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

const Home = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  //Loads data file in memory
  const loadFile = () => {
    props.loadFile();
    closeModal();
  };

  // Opens modal to confirm deletion
  function openModal(uid) {
    setIsOpen(true);
  }
  function afterOpenModal() {}

  // Closes modal
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <ConfirmTitle>Cargar datos desde .json</ConfirmTitle>
        <ConfirmSubtitle>
          Se cargarán en memoria 30 usuarios de ejemplo. Se borrarán los que ya
          hayan sido añadidos. Refresque la página para borrarlos.
        </ConfirmSubtitle>
        <Botones>
          <ConfirmButton onClick={loadFile}>Cargar</ConfirmButton>
          <CancelButton onClick={closeModal}>Cancelar</CancelButton>
        </Botones>
      </Modal>
      <TitleText>Actualmente tenemos:</TitleText>
      <DataText data-testid="size">{props.users.length}</DataText>
      <UserText>USUARIOS</UserText>
      <AddFile onClick={openModal}>Cargar Usuarios</AddFile>
    </Container>
  );
};

export default Home;
