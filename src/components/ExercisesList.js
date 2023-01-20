import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Exercise from './Exercise'

export default function ExercisesList(){

    const [value,setValue] = useState({exercises: []})

    useEffect(() => {
        axios.get('http://localhost:5000/exercises')
            .then(response=>{
                setValue({ exercises: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    },[value]);

    function deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));
        setValue({
            exercises: value.exercises.filter(el => el._id !==id)
        })
    } 

    function exerciseList() {
        return value.exercises.map(currentexercise => {
            
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
        })
      }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {exerciseList()}
            </tbody>
            </table>
        </div>
    )
}