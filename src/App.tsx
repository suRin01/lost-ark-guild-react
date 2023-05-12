import React, { useState } from 'react';
import './App.css';
import { Carousel } from 'react-bootstrap';
import GlobalNav from './components/global/globalNav'
import { MenuList } from './types/types';

const App: React.FC = () => {
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

    const bannerList: {idx: number; src: string; title: string; subtitle: string;}[] = [
        {
            idx: 1,
            src: "http://localhost:3000/1.png",
            title:"first doggie",
            subtitle: "first doggie is small",
        },{
            idx: 2,
            src: "http://localhost:3000/2.png",
            title:"second doggie",
            subtitle: "second doggie is small",
        },{
            idx: 3,
            src: "http://localhost:3000/3.png",
            title:"third doggie",
            subtitle: "third doggie is small",
        },
    ]


    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    function bannerCarousel(bannerItem: {idx: number; src: string; title: string; subtitle: string;}) {
        return (
            <Carousel.Item key={bannerItem.idx}>
                <img
                    className="d-block w-100 h-100"
                    src= {bannerItem.src}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>{bannerItem.title}</h3>
                    <p>{bannerItem.subtitle}</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (
        <div className="App">
            <GlobalNav menuListItem={menuList} />
            <div className='Banner'>

                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {
                        bannerList.map((bannerItem)=>{
                            return bannerCarousel(bannerItem)
                        })
                    }
                </Carousel>
            </div>
        </div>
    );
}

export default App;
