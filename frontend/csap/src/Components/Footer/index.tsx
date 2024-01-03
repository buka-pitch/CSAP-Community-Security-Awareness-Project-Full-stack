import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterContents>
          <Text>Services</Text>
          <NavLinks to="/scan">File & Url Report</NavLinks>
          <NavLinks to="/scan">Scan for Malisious url & file</NavLinks>
          <NavLinks to="/scan">Scan for Malisious</NavLinks>
          <NavLinks to="/scan">Scan for Malisious</NavLinks>
        </FooterContents>
      </FooterWrapper>
      <FooterWrapper>
        <FooterContents>
          <Text>Knowladge Base</Text>
          <NavLinks to="/scan">Fundamental Security Course</NavLinks>
          <NavLinks to="/scan">
            Steps to follow for Social Media Security
          </NavLinks>
          <NavLinks to="/scan">
            Challenge Yourself with Security Questions
          </NavLinks>
          <NavLinks to="/scan">Scan for Malisious</NavLinks>
        </FooterContents>
      </FooterWrapper>
      <FooterWrapper>
        <FooterContents>
          <Text>usfull links</Text>
          <NavLinks to="/scan">Scan for Malisious</NavLinks>
          <NavLinks to="/scan">Scan for Malisious</NavLinks>
          <NavLinks to="/scan">Scan for Malisious</NavLinks>
          <NavLinks to="/scan">Scan for Malisious</NavLinks>
        </FooterContents>
      </FooterWrapper>
    </FooterContainer>
  );
}

const NavLinks = styled(NavLink)`
  padding-left: 10px;
  text-decoration: none;
  text-align: justify;
  color: whitesmoke;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const FooterContents = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* align-items: center; */

  justify-content: center;
  /* background-color: #ff0; */
`;

const FooterWrapper = styled.div`
  width: inherit;
`;
const Text = styled.p`
  top: 40px;
  padding: 10px;
  position: absolute;
  text-align: justify;
  color: white;
`;
const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
  gap: 20px;
  z-index: 1;

  background: linear-gradient(90deg, #032942 0%, #000002 100%);
`;

export default Footer;
