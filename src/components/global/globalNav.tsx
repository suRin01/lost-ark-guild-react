import React, { ReactElement } from 'react';
import { MenuList } from '../../types/types';
import GlobalNavBig from './globalNavBig';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

type GlobalNavProp = {
    menuListItem: MenuList[];
}





const GlobalNav: React.FC<GlobalNavProp> = ({ menuListItem }) => {
    const menuListReturn = (menuListItem: MenuList[]): ReactElement<any, any>[] => {
        return (
            menuListItem.map((menuListElement) => {
                return (
                    <GlobalNavBig key={menuListElement.menuName} menuName={menuListElement.menuName} menuList={menuListElement.childMenu} />
                )
            })
        );
    }


    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">길마님 레이드가요</Navbar.Brand>
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav>

                        {menuListReturn(menuListItem)}

                        <Button as="a" variant="dark" style={{position: 'absolute', right: 30}}>
                            로그인
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default GlobalNav;
