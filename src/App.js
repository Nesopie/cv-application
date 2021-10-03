import React, {Component} from 'react';

class App extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "First Name",
            lastName: "last Name",
            email: "Email",
            phoneNumber: "Phone Number"
        }
    }

    handleChange() {
        console.log("hi");
    }

    onEdit() {
        console.log("hi");
    }

    render() {
        const { firstName, lastName, email, phoneNumber} = this.state;
        return(
            <InputDiv name={firstName} onEdit={this.onEdit} handleChange={this.handleChange}/>
        )
    }
}

const InputDiv = (props) => {
    return(
        <div>
            <input onChange={props.handleChange} value={props.name} type ="text" style={{display:"none"}}></input>
            <span>{props.name}</span>
            <button type="submit" onClick={props.onEdit}>Edit</button>
            <button type="submit" onClick={props.onSave} style={{display:"none"}}>Save</button>
        </div>
    )
}
