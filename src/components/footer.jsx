import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBBox} from 'cdbreact';
import logo from "../logo.png"

const Footer = () => {
    return (
      <CDBFooter className="shadow">
        <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
          <CDBBox display="flex" justifyContent="between" className="flex-wrap">
            <CDBBox alignSelf="center">
              <a href="/" className="d-flex align-items-center p-0 text-dark text-decoration-none">
                <img alt="logo" src={logo} width="30px" />
                <span className="ml-3 h5 font-weight-bold">Englishour</span>
              </a>
              <CDBBox className="mt-5" display="flex">
                <CDBBtn flat color="dark" className="p-2">
                  <CDBIcon fab icon="facebook-f" />
                </CDBBtn>
                <CDBBtn flat color="dark" className="mx-3 p-2">
                  <CDBIcon fab icon="twitter" />
                </CDBBtn>
                <CDBBtn flat color="dark" className="p-2">
                  <CDBIcon fab icon="instagram" />
                </CDBBtn>
              </CDBBox>
            </CDBBox>
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                Englishour
              </p>
              <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
                <CDBFooterLink href="/">Resources</CDBFooterLink>
                <CDBFooterLink href="/">About Us</CDBFooterLink>
                <CDBFooterLink href="/">Contact</CDBFooterLink>
                <CDBFooterLink href="/">Blog</CDBFooterLink>
              </CDBBox>
            </CDBBox>
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                Services
              </p>
              <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
                <CDBFooterLink href="/">Lessons</CDBFooterLink>
                <CDBFooterLink href="/">Exercise</CDBFooterLink>
                <CDBFooterLink href="/">Tests</CDBFooterLink>
              </CDBBox>
            </CDBBox>
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                Help
              </p>
              <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
                <CDBFooterLink href="/">Support</CDBFooterLink>
                <CDBFooterLink href="/">Sign Up</CDBFooterLink>
                <CDBFooterLink href="/">Sign In</CDBFooterLink>
              </CDBBox>
            </CDBBox>
          </CDBBox>
          <small className="text-center mt-5">&copy; Englishour, 2022. All rights reserved.</small>
        </CDBBox>
      </CDBFooter>
    );
  };

  export default Footer;