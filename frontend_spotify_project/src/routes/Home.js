import { Icon } from '@iconify/react';
import { isHtmlElement, Link } from 'react-router-dom';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/TextWithHover';
import harmonixLogo from "../assets/harmonixLogo.png"
const focusCardsData=[
    {
    title:"Yandhi",
    description:"Kanye West",
    imgUrl:"https://t2.genius.com/unsafe/533x0/https%3A%2F%2Fimages.genius.com%2F96257331e42fd82012b16e4312d68257.1000x1000x1.jpg"
    },
    {
        title:"Yandhi",
        description:"Kanye West",
        imgUrl:"https://t2.genius.com/unsafe/533x0/https%3A%2F%2Fimages.genius.com%2F96257331e42fd82012b16e4312d68257.1000x1000x1.jpg"
    },
    {
        title:"Yandhi",
        description:"Kanye West",
        imgUrl:"https://t2.genius.com/unsafe/533x0/https%3A%2F%2Fimages.genius.com%2F96257331e42fd82012b16e4312d68257.1000x1000x1.jpg"
    },
    {
        title:"Yandhi",
        description:"Kanye West",
        imgUrl:"https://t2.genius.com/unsafe/533x0/https%3A%2F%2Fimages.genius.com%2F96257331e42fd82012b16e4312d68257.1000x1000x1.jpg"
    },
    {
        title:"Yandhi",
        description:"Kanye West",
        imgUrl:"https://t2.genius.com/unsafe/533x0/https%3A%2F%2Fimages.genius.com%2F96257331e42fd82012b16e4312d68257.1000x1000x1.jpg"
    }
];
const Home = () =>{
    return (
        <div className="h-full w-full flex">
            {/*this div will be left pannel*/}
            <div className="h-full w-1/5 bg-black flex flex-col justify-between">
            <div>
            <div className="logoDiv p-5 ml-11">
            <img src={harmonixLogo} alt="Logo" width="125" />
            </div>
                <div className='py-5'>
                    <IconText 
                        iconName={"material-symbols:home"}
                        displayText={"Home"}
                        active
                    />
                    <IconText 
                        iconName={"material-symbols:search"}
                        displayText={"Search"}
                    />
                    <IconText 
                        iconName={"solar:library-linear"}
                        displayText={"Your Library"}
                    />
                </div>
                <div className='pt-7'>
                    <IconText 
                        iconName={"zondicons:add-outline"}
                        displayText={"Create Playlist"}
                    />
                    <IconText 
                        iconName={"icon-park-twotone:like"}
                        displayText={"Liked Songs"}
                    />
                </div>
            </div>
                <div className='px-5 pb-10'>
                    <div className='border border-gray-100 text-white w-2/5 px-2 py-1 flex rounded-full items-center justify-center hover:boder-white cursor-pointer'>
                        <Icon icon="ph:globe"/>
                        <div className='ml-2 text-sm font-semibold'>English</div>
                    </div>
                </div>
            </div>
            
            {/*this div will be the right pannel*/}
            <div className="h-full w-4/5 bg-neutral-800 overflow-auto">

                <div className='navbar w-full h-20 bg-black bg-opacity-30 flex items-center justify-end'>
                    <div className='w-1/2 flex h-full'>

                        <div className='w-3/5 flex justify-around items-center'>
                        <TextWithHover displayText={"Premium"}/>
                        <TextWithHover displayText={"Support"}/>
                        <TextWithHover displayText={"Download"}/>
                        <div className='h-1/2 border border-white'></div>
                        </div>
                        
                        <div className='w-2/5 flex justify-around h-full items-center'>
                        <Link to="/signup">
                        <TextWithHover displayText={"Sign Up"}/></Link>
                        <div className='bg-red-600 hover:bg-red-500 h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer'><Link to="/login">Log In</Link></div>
                        </div>
                        
                    </div>
                </div>

                <div className='content p-8 pt-0'>
                    <PlaylistView titleText={"Kanye West"} cardsData={focusCardsData}/>
                    <PlaylistView titleText={"Kanye West"} cardsData={focusCardsData}/>
                    <PlaylistView titleText={"Kanye West"} cardsData={focusCardsData}/>
                </div>
            </div>
        </div>
    );
};
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
