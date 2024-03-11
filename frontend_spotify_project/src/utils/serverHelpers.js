import { backendurl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route,body) =>{
    // route:/signup
    const response = await fetch(backendurl+route, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;

}

export const makeAuthenticatedPOSTRequest = async (route,body) =>{
    // route:/signup
    const token=getToken();
    const response = await fetch(backendurl+route, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;

}
export const makeAuthenticatedGETRequest = async (route) =>{
    // route:/signup
    const token=getToken();
    const response = await fetch(backendurl+route, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        }
    });
    const formattedResponse = await response.json();
    return formattedResponse;

}
const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};