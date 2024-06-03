
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import "./SearchBox.css";
import { useState } from 'react';


export default function SearchBox({updateInfo}){
    let [city, setCity]=useState("");
    let [error, setError]=useState(false);

    let API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY= "2eb4c4a13beca4e9d362bf2fb4365845";

    let getWeatherInfo = async()=>{
        try{
            let response= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);

            let result = {
                city:city,
                temp:jsonResponse.main.temp,
                tempMin:jsonResponse.main.temp_min,
                tempMax:jsonResponse.main.temp_max,
                humidity:jsonResponse.main.humidity,
                feelsLike:jsonResponse.main.feels_like,
                weather:jsonResponse.weather[0].description,
            };

            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
    };

    let handleChange=(event)=>{
        let newVal= event.target.value;
        setCity(newVal);
    };


    let handleFormSubmit= async(event)=>{
       try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo= await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
    }
    return(
        <div className='SearchBox'> 
            <h2>Search for the weather!</h2>
            <form  onSubmit={handleFormSubmit}>
                <TextField id="city" value={city} onChange={handleChange} label="City name" variant="outlined" required/>
                <br /><br />
                <Button type='submit' variant="contained" endIcon={<SendIcon />}>Send</Button>
                 {error && <p style={{color:"red"}}>No such place found!</p>}
            </form>
        </div>
    );
};