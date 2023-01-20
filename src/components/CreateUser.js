import {useState,useEffect} from 'react'
import axios from 'axios';

export default function CreateUser(){

    const [userValue,setUserValue] = useState({
        username: '',
    })

    function onChangeUsername(e){
        setUserValue({
            username: e.target.value,
        });
    };
    
    function HandleSubmit(e) {
        e.preventDefault();
        const user = {
            username: userValue.username,
        };

        console.log(user);
        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));

        setUserValue({username:''});
    };

    return(
        <div>
        <h3>Create New User</h3>
        <form onSubmit={HandleSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={userValue.username}
                onChange={onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}