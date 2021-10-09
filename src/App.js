import React, {Component} from 'react';
import uniqid from 'uniqid'

class App extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",

            workExperience: {
                jobTitle: "",
                company: "",
                from: "",
                to: "",
                description: "",
                index: 1,
                id: uniqid(),
            },
            workExperiences: [],

            education: {
                school: "",
                degree: "",
                from: "",
                to: "",
                field: "",
                location: "",
            },
            educationArray: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitWork = this.onSubmitWork.bind(this);
    }

    handleChange(e) {
        console.log(e.target.parentNode.parentNode.parentNode);
        if(e.target.id === "firstName") this.setState({ firstName: e.target.value });
        else if(e.target.id === "lastName") this.setState({ lastName: e.target.value });
        else if(e.target.id === "email") this.setState({ email: e.target.value });
        else if(e.target.id === "phoneNumber") {
            if(!isNaN(+e.target.value)) {
                this.setState({ phoneNumber: e.target.value});
            }else {
                e.target.value = "";
                this.setState({ phoneNumber: "Phone Number"});
            }
        }
        else if(e.target.className === "jobTitle") this.setState({workExperience: { ...this.state.workExperience, jobTitle: e.target.value }});
        else if(e.target.className === "company") this.setState({workExperience: { ...this.state.workExperience, company: e.target.value }});
        else if(e.target.className === "from" ) {
            if(e.target.parentNode.parentNode.parentNode.className === "work")
                this.setState({workExperience: { ...this.state.workExperience, from: e.target.value }});
            else
                this.seetState({educationArray: {...this.state.educationArray, from: e.target.value}});
        }
        else if(e.target.className === "to") {
            if(e.target.parentNode.parentNode.parentNode.className === "education")
                this.setState({workExperience: { ...this.state.workExperience, to: e.target.value }});
            else
                this.setState({educationArray: {...this.state.educationArray, to: e.target.value}});
        }
        else if(e.target.className === "description") this.setState({workExperience: { ...this.state.workExperience, description: e.target.value }});
    }

    onSubmitWork(e) {
        e.preventDefault();
        this.setState({workExperiences: [...this.state.workExperiences,this.state.workExperience]});
        e.target.reset();
    }

    onSubmitEdu(e) {
        e.preventDefault();
        this.setState({educationArray: [...this.state.educationArray, this.state.education]});
        e.target.reset();
    }

    render() {
        const { firstName, lastName, email, phoneNumber, } = this.state;
        const { jobTitle, company, id } = this.state.workExperience;
        return(
            <div>
                <GeneralComponent firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} handleChange={this.handleChange}/>
                <WorkComponent handleChange={this.handleChange} id={id} onSubmitWork={this.onSubmitWork}/>
                <EducationComponent handleChange={this.handleChange} id={id} onSubmitEdu={this.onSubmitEdu}/>
            </div>
        )
    }
}

const Input = (props) => {
    return(
        <div>
            <label htmlFor={props.property}></label>
            <div>
                <input onChange={props.handleChange} type ="text" id={props.property} placeholder={props.propertyString}></input>
            </div>
        </div>
    )
}

const OtherInput = (props) => {
    if(props.inputType === "textArea") {
        return(
            <div>
                <label htmlFor={props.key}>{props.propertyString}</label>
                <div>
                    <textarea className={props.property} onChange={props.handleChange} type={props.inputType} placeholder={props.placeholder} id={props.id}></textarea>
                </div>
            </div>
        )
    }
    return(
        <div>
            <label htmlFor={props.key}>{props.propertyString}</label>
            <div>
                <input className={props.property} onChange={props.handleChange} type={props.inputType} placeholder={props.placeholder} id={props.id}></input>
            </div>
        </div>
    )
}

const GeneralComponent = (props) => {
    return(
        <div>
            <Input
                name={props.firstName} handleChange={props.handleChange} property="firstName" propertyString="First Name"/>
            <Input
                name={props.lastName} handleChange={props.handleChange} property="lastName" propertyString="Last Name"/>
            <Input
                name={props.email} handleChange={props.handleChange} property="email" propertyString="Email"/>
            <Input
                name={props.phoneNumber} handleChange={props.handleChange} property="phoneNumber" propertyString="Phone Number"/>
        </div>
    )
}

const WorkComponent = (props) => {
    return(
        <div>
            <p>Work Experience</p>
            <hr></hr>
            <form onSubmit={props.onSubmitWork}>
                <OtherInput handleChange={props.handleChange} inputType = "text" id={props.id} property="jobTitle" placeholder="Job Title" propertyString="Job Title"/>
                <OtherInput handleChange={props.handleChange} inputType = "text" id={props.id} property="company" placeholder="Company" propertyString="Company"/>
                <div style={{display:"flex"}} className="work">
                    <OtherInput handleChange={props.handleChange} inputType = "date" id={props.id} property="from" placeholder="From" propertyString="From"/>
                    <OtherInput handleChange={props.handleChange} inputType = "date" id={props.id} property="to" placeholder="to" propertyString="To"/>
                </div>
                <OtherInput handleChange={props.handleChange} inputType = "textArea" id={props.id} property="description" placeholder="Please write briefly about your job description" propertyString="Description"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const EducationComponent = (props) => {
    return (
        <div>
            <p>Education</p>
            <hr></hr>
            <form onSubmit={props.onSubmitEdu}>
                <OtherInput
                    handleChange={props.handleChange} inputType="text" id={props.id} property="school" placeholder="School" propertyString="School"/>
                <div style={{display:"flex"}} className="education">
                    <OtherInput
                        handleChange={props.handleChange} inputType="date" id={props.id} property="from" placeholder="From" propertyString="From"/>
                    <OtherInput
                        handleChange={props.handleChange} inputType="date" id={props.id} property="to" placeholder="To" propertyString="To"/>
                </div>
                <label htmlFor="degree">Degree</label>
                <select name="degree" id="degree" style={{display:"block"}}>
                    <option value="None">None</option>
                    <option value="High school or equivalent">High School or equivalent</option>
                    <option value="Associate">Associate's</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="Doctorate">Docatorate</option>
                    <option value="Other">Other</option>
                </select>
                <OtherInput handleChange={props.handleChange} inputType="text" id={props.id} property="field" placeholder="Field of Study" propertyString="Field of Study"/>
                <OtherInput handleChange={props.handleChange} inputType="text" id={props.id} property="location" placeholder="Location" propertyString="Location"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default App;
