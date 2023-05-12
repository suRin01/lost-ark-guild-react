import React, { ReactElement, useState } from 'react';
import { MenuListItem } from '../../types/types';
import { NavDropdown } from 'react-bootstrap';

type GlobalNavBigProp = {
    menuName: string;
    menuList: MenuListItem[] | undefined;
}




const GlobalNavBig: React.FC<GlobalNavBigProp> = ({ menuName, menuList }) => {
    const [dropdownState, setDropdownState] = useState(false);

    const rendenrDropdownItem = (menuItem: MenuListItem):ReactElement<any, any> => {
        return (
            <NavDropdown.Item key={menuItem.menuOrder} href={menuItem.menuUrl}>{menuItem.menuName}</NavDropdown.Item>
        )
    }

    return (
        <NavDropdown
            onMouseOver={() => { setDropdownState(true) }}
            onMouseLeave={() => { setDropdownState(false) }}
            show={dropdownState}
            title={menuName}
            key={menuName}
        >
            {
                menuList !== undefined && menuList.map(rendenrDropdownItem)
            }
        </NavDropdown>

    );
}

export default GlobalNavBig;
