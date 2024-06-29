import React, { useEffect,useState, useContext } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import songContext from '../context/songContext';
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
// const Home=()=>{
//     return(
//         <LoggedInContainer currentActiveScreen={"home"}>

//         <PlaylistView titleText={"Hip Hop Mix"} cardsData={hipHopCard}/>
//         <PlaylistView titleText={"Chill Mix"} cardsData={chillCard}/>

//         </LoggedInContainer>
//     )
// }
export default function Home(){
    
    const [songsData, setSongsData] = useState([]);// array of song objects 

    // we want whenever a user clicks on a single song card, data of that song which we get form 'info' prop, will be saved in the 'currSong' of context 'SongContext' for globally use
    // one this to note is that in App.js i have already made logged in /myMusic route to access songContext and this 'singleSongCard' is a children of 'mySongs' route so it can also access that songcontext
    const {currentSong, setCurrentSong} = useContext(songContext); // fetch these 2 values from songContext using hook 'useContext' make sure to use {} and not []

    
    // fetch all songs from backend
    useEffect(()=>{

        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/song/get/mysongs');
            setSongsData(response.data);
        }
        getData();
    },[])

    


    return(
        // this below is the repeatitive 'sidebar' 'navbar' 'songBar' code  and inside it is the 'children' prop, (reference : src/containers/LoggedInContainer)
        <LoggedInContainer curActiveScreen={"home"}>  {/* now why we passed this curActiveScreen = home, bacause now wheverever this component renderes, this value 'home'is passed to the Logged In container.js and there that screen becomes active */}
            
            {/* <PlaylistView titleText={"Focus"} cardsData={focusCardsData}/>
            <PlaylistView titleText={"More Playlists"} cardsData={spotifyCardsPlaylist}/>  */}
                        
            {/* updation : */}
            <div className='text-left font-semibold text-xl py-5'> 
                Top Songs 
            </div>
            <div className='w-full flex flex-wrap items-center justify-left'>
                {
                    songsData.map((songObject) => {
                        return (
                            <SongCard
                                songObject={songObject}
                                setCurrentSong={setCurrentSong}
                            />
                        )
                    })
                } 
            </div>

        </LoggedInContainer>
    );
}

const SongCard = ({songObject, setCurrentSong}) => {
    return(
        <div className='p-2 flex-col justify-center items-center w-1/6 cursor-pointer mx-4 my-4' onClick={()=>{
            setCurrentSong(songObject);
        }}>
           
        
            <div className='w-full'>
                <img 
                    src={songObject.thumbnail}
                    className='rounded-xl w-full'
                />
            </div>
            <div className='text-gray-300 text-left pt-2 pl-1 font-semibold text'> {songObject.name} </div>
            <div className='text-gray-500 text-sm text-left pl-1'> {songObject.artist.firstName + " " + songObject.artist.lastName}</div>
        </div>
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

