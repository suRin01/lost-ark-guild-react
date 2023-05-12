import '../../App.css';
import React, { ReactNode } from 'react';
import GlobalNav from './globalNav';
import { MenuList } from '../../types/types';
import { useLoaderData } from 'react-router';
type layoutProp = {
    children: ReactNode;
}
const Layout: React.FC<layoutProp> = ({children}) => {
    const menuList: MenuList[] = [
        {
            menuName: 'firstMenu',
            isHidden: false,
            menuOrder: 1,
            childMenu: [
                {
                    menuName: '1-1',
                    menuUrl: '#1',
                    isHidden: false,
                    menuOrder: 1
                }, {
                    menuName: '1-2',
                    menuUrl: '#2',
                    isHidden: false,
                    menuOrder: 2
                },
            ]
        },
        {
            menuName: 'secondMenu',
            isHidden: false,
            menuOrder: 2,
            childMenu: [
                {
                    menuName: '2-1',
                    menuUrl: '#1',
                    isHidden: false,
                    menuOrder: 1
                }, {
                    menuName: '2-2',
                    menuUrl: '#2',
                    isHidden: false,
                    menuOrder: 2
                },
            ]
        },
        {
            menuName: 'thirdMenu',
            isHidden: false,
            menuOrder: 2,
            childMenu: [
                {
                    menuName: '3-1',
                    menuUrl: '#1',
                    isHidden: false,
                    menuOrder: 1
                }, {
                    menuName: '3-2',
                    menuUrl: '#2',
                    isHidden: false,
                    menuOrder: 2
                }, {
                    menuName: '3-3',
                    isHidden: false,
                    menuOrder: 3
                },
            ]
        },
    ];

    const params:{param: string} = useLoaderData() as {param: string};

    return (
        <div className="App">
            <GlobalNav menuListItem={menuList} key={"globalNav"} />
            <div id='contents'>
                {children}
            </div>
            
        </div>
    );
}

export default Layout;
