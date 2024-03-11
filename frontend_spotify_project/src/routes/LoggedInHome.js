import { Icon } from '@iconify/react';
import { isHtmlElement } from 'react-router-dom';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/TextWithHover';
import { useState } from 'react';
import {Howl, Howler} from 'howler';
import LoggedInContainer from '../containers/LoggedInContainer';
const hipHopCard=[
    {
    title:"Graduation",
    description:"Kanye West",
    imgUrl:"https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg"
    },
    {
        title:"Yandhi",
        description:"Kanye West",
        imgUrl:"https://t2.genius.com/unsafe/533x0/https%3A%2F%2Fimages.genius.com%2F96257331e42fd82012b16e4312d68257.1000x1000x1.jpg"
    },
    {
        title:"Heartbreak",
        description:"Kanye West",
        imgUrl:"https://upload.wikimedia.org/wikipedia/en/f/f1/808s_%26_Heartbreak.png"
    },
    {
        title:"All Eyez On Me",
        description:"Tupac Shakur",
        imgUrl:"https://upload.wikimedia.org/wikipedia/en/1/16/Alleyezonme.jpg"
    },
    {
        title:"Astroworld",
        description:"Travis Scott",
        imgUrl:"https://upload.wikimedia.org/wikipedia/en/0/0b/Astroworld_by_Travis_Scott.jpg"
    }
];
const chillCard=[
    {
    title:"Channel Orange",
    description:"Frank Ocean",
    imgUrl:"https://cdns-images.dzcdn.net/images/cover/519400e29d268f449cf00af879e71af6/500x500.jpg"
    },
    {
        title:"The Color Violet",
        description:"Tory Lanez",
        imgUrl:"https://e.snmc.io/i/1200/s/1ed9f93844dfce5369806fbe97dae90e/9541581"
    },
    {
        title:"Starboy",
        description:"Weeknd",
        imgUrl:"https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
    },
    {
        title:"Heroes and Villains",
        description:"Metro Boomin",
        imgUrl:"https://i.scdn.co/image/ab67616d00001e02c4fee55d7b51479627c31f89"
    },
    {
        title:"AM",
        description:"Arctic Monkeys",
        imgUrl:"https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg"
    }
];
const Home=()=>{
    return(
        <LoggedInContainer currentActiveScreen={"home"}>

        <PlaylistView titleText={"Hip Hop Mix"} cardsData={hipHopCard}/>
        <PlaylistView titleText={"Chill Mix"} cardsData={chillCard}/>

        </LoggedInContainer>
    )
}

const PlaylistView = ({titleText,cardsData}) => {
    return (
        <div className='text-white mt-8'>
            <div className='text-2xl font-semibold mb-5'>{titleText}</div>
            <div className='w-full flex justify-between space-x-4'>
                {
                cardsData.map((item)=>{
                    return(
                        <Card
                            title={item.title}
                            description={item.description}
                            imageUrl={item.imgUrl}
                        />
                    );
                })
                }
               
            </div>
        </div>
    );
};

const Card = ({ title, description,imageUrl }) => {
    return (
        <div className='bg-black bg-opacity-40 w-1/5 px-4 py-2 rounded-md overflow-auto'>
        <div className='pb-4 pt-2'>
            <img className='w-full rounded-md' src={imageUrl} />
        </div>
            <div className='text-white py-3'>{title}</div>
            <div className='text-gray-500 text-sm'>{description}</div>
        </div>
    );
};
export default Home;
