import { Icon } from '@iconify/react';
import { isHtmlElement } from 'react-router-dom';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/TextWithHover';
import { useContext, useState,useRef} from 'react';
import {Howl, Howler} from 'howler';
import songContext from '../context/songContext';
import { useLayoutEffect } from 'react';

const LoggedInContainer = ({children,currentActiveScreen}) =>{

    const{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused}=useContext(songContext);

    const firstUpdate = useRef(true);
    useLayoutEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current=false;
            return;
        }
        if(!currentSong){
            return;
        }
        changeSong(currentSong.track)
    },[currentSong&&currentSong.track]);

    const playSound=()=>{
        if(!soundPlayed){
            return;
        }
        soundPlayed.play();
    }
    const changeSong=(songSrc)=>{
        if(soundPlayed){
            soundPlayed.stop();
        }
        let sound = new Howl({
        src: [songSrc],
        html5: true
      });  
      setSoundPlayed(sound);
      sound.play();
      setIsPaused(false);
    };
    const pauseSound=()=>{
        soundPlayed.pause();
    };
    const togglePlayPause =()=>{
        if(isPaused){
            playSound(currentSong.track);
            setIsPaused(false);
        }
        else{
            pauseSound();
            setIsPaused(true);
        }
    }
    return (
        <div className="h-full w-full bg-app-black ">
            {/*this div will be left pannel*/}
            <div className={`${currentSong?"h-9/10":"h-full"} w-full flex`}>
            <div className="h-full w-1/5 bg-black flex flex-col justify-between">
            <div>
                <div className="logoDiv p-5">
                    <Icon icon="logos:spotify" width="125"/>
                </div>
                <div className='py-5'>
                    <IconText 
                        iconName={"material-symbols:home"}
                        displayText={"Home"}
                        active={currentActiveScreen==="home"}
                        targetLink={"/home"}
                    />
                    <IconText 
                        iconName={"material-symbols:search"}
                        displayText={"Search"}
                        targetLink={"/search"}
                        active={currentActiveScreen==="search"}
                    />
                    <IconText 
                        iconName={"solar:library-linear"}
                        displayText={"Your Library"}
                        active={currentActiveScreen==="library"}
                    />
                    <IconText 
                        iconName={"material-symbols:library-music-sharp"}
                        displayText={"My music"}
                        targetLink={"/myMusic"}
                        active={currentActiveScreen==="myMusic"}
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
                        <TextWithHover targetLink={"/uploadSong"} displayText={"Upload Song"}/>
                        <div className='bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer'>DM</div>
                        </div>
                        
                    </div>
                </div>

                <div className='content p-8 pt-0'>
                    {children}
                </div>
            </div>
        </div>
        {/*this div is currently playing song*/}
        {
            currentSong&&
      
        <div className='w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4'>
        <div className='w-1/4 flex items-center'>
            <img src={currentSong.thumbnail} className='h-14 w-14 rounded'/>
            <div className='pl-4'>
            <div className='text-sm hover:underline cursor-pointer'>{currentSong.name}</div>
            <div className='text-xs text-gay-500 hover:underline cursor-pointer'>{currentSong.artist.firstName+" "+currentSong.artist.lastName}</div>
            </div>
        </div>
        <div className='h-full w-1/2 flex justify-center flex-col items-center'>
            <div className='flex w-1/3 justify-between items-center'>
            <Icon icon="ph:shuffle-bold" fontSize={25} className="cursor-pointer text-gray-500 hover:text-white"/>
            <Icon icon="icomoon-free:previous" fontSize={25} className="cursor-pointer text-gray-500 hover:text-white" />
            <Icon icon={
                isPaused?"gravity-ui:play"
                :"gravity-ui:pause"
            }
             fontSize={30} className="cursor-pointer text-gray-500 hover:text-white" onClick={togglePlayPause} />
            <Icon icon="icomoon-free:next" fontSize={25}  className="cursor-pointer text-gray-500 hover:text-white"/>
            <Icon icon="ph:repeat" fontSize={25}  className="cursor-pointer text-gray-500 hover:text-white"/>
            </div>
            
        </div>
   
        <div className='w-1/4 flex items-center justify-center'></div>
        </div>
     }
     </div>  
    );
};

export default LoggedInContainer;
