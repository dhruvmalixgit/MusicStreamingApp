import { Link } from "react-router-dom";

const TextWithHover=({iconName,displayText,active,targetLink})=>{
    return(
        <Link to={targetLink} >
        <div className="flex items-center justify-start cursor-pointer">
           
            <div className={`${active?"text-white":"text-gray-500"} font-semibold text-lg hover:text-white`}>
                {displayText}
            </div>
            
        </div>
        </Link>
    );
};
export default TextWithHover;