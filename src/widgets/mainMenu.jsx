import React, { useState, useEffect } from "react";
import { Icon, Image, Menu } from "semantic-ui-react";
import clientService from "../services/clientService";
import { primaryColor, imageStyles } from "../utility/constants";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { Link } from "react-router-dom";
function MainMenu(props) {
  const [showNavColor, setShowNavColor] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  useEffect(async () => {
    const result = await clientService.institutionsLighter();

    setInstitutions(result.data.data);
  }, []);

  const menuItem = (name, icon) => {
    return (
      <table style={{ textAlign: "center", margin: 40 }}>
        <tr>
          <td>
            <Icon size="large" color="white" name={icon} />
          </td>
        </tr>
        <tr>
          <td>
            <h5>{name}</h5>
          </td>
        </tr>
      </table>
    );
  };
  const colorItem = { color: "white" };
  return (
    <>
      <MDBNavbar style={{ marginBottom: 0 }} expand="lg" dark bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            {" "}
            <Link to={`/`}>
              <Image size="small" src="/images/logo2.png" />
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
              <MDBNavbarItem className="active">
                <MDBNavbarLink aria-current="page" style={colorItem} href="/">
                  Home <MDBIcon icon="home" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">
                      {" "}
                      Institutions <MDBIcon icon="building" fas />
                    </span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href={`/institutions`}>
                      <h4>All Institutions</h4>
                    </MDBDropdownItem>
                    <hr></hr>
                    {institutions.map((item) => {
                      return (
                        <div>
                          <MDBDropdownItem href={`/institution/${item.id}`}>
                            <h4>{item.name}</h4>
                          </MDBDropdownItem>
                          <hr></hr>
                        </div>
                      );
                    })}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="/courses">
                  Courses <MDBIcon icon="graduation-cap" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  Compare <MDBIcon icon="balance-scale" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  Contact Us <MDBIcon icon="headset" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  About Us <MDBIcon icon="info-circle" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  Login <MDBIcon icon="sign-in-alt" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  e-Pay <MDBIcon icon="credit-card" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  Forum <MDBIcon icon="users" fas />
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      {/* <Menu stackable>
        <Menu.Item>
          <Image size="small" src="/images/logo.jpg" />
        </Menu.Item>
        <Menu.Menu position="right">
          {menuItem("Home", "home")}
          {menuItem("Institutions", "building")}
          {menuItem("Courses", "book")}
          {menuItem("Compare", "balance scale")}
          {menuItem("Contact Us", "call square")}
          {menuItem("About Us", "users")}
          {menuItem("Login", "user")}
          {menuItem("e-Pay", "payment")}
          {menuItem("Forum", "users")}
        </Menu.Menu>
      </Menu> */}
    </>
  );
}

export default MainMenu;
