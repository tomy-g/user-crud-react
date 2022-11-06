import React from "react";
import styled from "styled-components";
import LogoPic from "../assets/Logotipo_Wipay_WEB_small-e1664358863849.png";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  display: flex;
  height: 71px;
  justify-content: center;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.055);
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 520px;
  margin-left: max(18.75vw, 250px);
  margin-right: 18.75vw;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  width: 66.666666%;
  justify-content: flex-end;
`;

const PageTitle = styled(Link)`
  font-size: large;
  margin-left: 8rem;
  font-weight: 600;
  text-decoration: none;
  color: #0c2846;
`;
const PageTitleSelected = styled(Link)`
  font-size: large;
  margin-left: 8rem;
  font-weight: 600;
  text-decoration: none;
  color: #db1b43;
`;

const Logo = styled.img`
  height: 50%;
`;

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Container>
      <Items>
        <Link style={{ textDecoration: "none", height: "100%" }} to="/">
          <LogoContainer>
            <Logo src={LogoPic} />
          </LogoContainer>
        </Link>
        <PagesContainer>
          {location.pathname == "/" ? (
            <PageTitleSelected to="/">Home</PageTitleSelected>
          ) : (
            <PageTitle to="/">Home</PageTitle>
          )}
          {location.pathname == "/users" ? (
            <PageTitleSelected to="/users">User List</PageTitleSelected>
          ) : (
            <PageTitle to="/users">User List</PageTitle>
          )}

          {location.pathname == "/adduser" ? (
            <PageTitleSelected to="/adduser">Add User</PageTitleSelected>
          ) : (
            <PageTitle to="/adduser">Add User</PageTitle>
          )}
        </PagesContainer>
      </Items>
    </Container>
  );
};

export default Navbar;
