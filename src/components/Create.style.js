import styled from "styled-components";

export const Container = styled.div`
  margin-top: 9.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 18.75vw;
  margin-right: 18.75vw;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-left: 200px;
`;

export const Label = styled.h4`
  font-size: 20px;
`;

export const Value = styled.input`
  margin-top: 5px;
  font-size: 20px;
  padding-left: 5px;
  width: 50%;
`;

export const Title = styled.h1`
  color: #0c2846;
  font-size: 40px;
  margin-bottom: 60px;
  margin-left: 200px;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Edit = styled.button`
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

export const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;