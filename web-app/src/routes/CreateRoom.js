import React, {useState} from "react";
import {v4 as uuid} from "uuid"
import RaisedButton from 'material-ui/RaisedButton';

const CreateRoom = (props) => {
    const [path, setPath] = useState('');

    function join() {
        console.log(path);
        props.history.push('/room/' + path);
    }

    const handleChangePath = (e) => {
        console.log(e)
        setPath(e.target.value)
    }

    function create() {
        const id = uuid();
        console.log(id);
        props.history.push('/room/' + id);
    }

    return (
        <div>
            {console.log("PATH: ", path)}
            <label> Input a URL </label>
            <input 
                placeholder="Path to another meeting"
                type="text"
                value={path}
                onChange = {handleChangePath}
            />
            
            <RaisedButton onClick = {join}> 
                JOIN 
            </RaisedButton>

            <RaisedButton onClick = {create}> CREATE </RaisedButton>
        </div>
        
    )
}

export default CreateRoom;