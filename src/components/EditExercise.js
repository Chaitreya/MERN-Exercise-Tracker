import { useState,useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

export default function EditExercise(props)
{
    const [value,setValue] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    });

    const params = useParams();
    console.log(params.id);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/'+params.id)
            .then(response => {
                setValue((pervState)=>({
                    ...pervState,
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                }))
            })
            .catch(function(error){
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0 ){
                    setValue((pervState) => ({
                        ...pervState,
                        users: response.data.map(user => user.username),
                    }))
                }
            })

    },[])

    function onChangeUsername(e){
        setValue((pervState) => ({
            ...pervState,
            username: e.target.value
        }));
    };

    function onChangeDescription(e){
        setValue((pervState) => ({
            ...pervState,
            description: e.target.value,
        }));
    };

    function onChangeDuration(e){
        setValue((pervState)=>({
            ...pervState,
            duration: e.target.value,
        }));
    }; 

    function onChangeDate(e){
        setValue((pervState)=>({
            ...pervState,
            date: e.target.value,
        }));
    };
    
    function HandleSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: value.username,
            description: value.description,
            duration: value.duration,
            date: value.date
        };

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+params.id,exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    };

    return(
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={HandleSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                <select required className="form-control" value={value.username} onChange={onChangeUsername}>
                    {
                        value.users.map(function(user) {
                        return <option key={user} value={user}>{user} </option>;
                        })
                    }
                </select>
                </div>
                <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={value.description}
                    onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={value.duration}
                    onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    selected={value.date}
                    onChange={onChangeDate}
                    />
                </div>
                </div>

                <div className="form-group">
                <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}