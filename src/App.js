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
                index: 1,
                id: uniqid()
            },
            educationArray: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitWork = this.onSubmitWork.bind(this);
        this.onSubmitEdu = this.onSubmitEdu.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleChange(e) {
        if(e.target.id === "firstName")
            this.setState({ firstName: e.target.value });
        else if(e.target.id === "lastName")
            this.setState({ lastName: e.target.value });
        else if(e.target.id === "email")
            this.setState({ email: e.target.value });
        else if(e.target.id === "phoneNumber") {
            if(!isNaN(+e.target.value)) {
                this.setState({ phoneNumber: e.target.value});
            }else {
                e.target.value = "";
                this.setState({ phoneNumber: "Phone Number"});
            }
        }
        else if(e.target.className === "jobTitle")
            this.setState({workExperience: { ...this.state.workExperience, jobTitle: e.target.value }});
        else if(e.target.className === "company")
            this.setState({workExperience: { ...this.state.workExperience, company: e.target.value }});
        else if(e.target.className === "from" ) {
            if(e.target.parentNode.parentNode.parentNode.className === "work")
                this.setState({workExperience: { ...this.state.workExperience, from: e.target.value }});
            else
                this.setState({education: {...this.state.education, from: e.target.value}});
        }
        else if(e.target.className === "to") {
            if(e.target.parentNode.parentNode.parentNode.className === "work")
                this.setState({workExperience: { ...this.state.workExperience, to: e.target.value }});
            else
                this.setState({education: {...this.state.education, to: e.target.value}});
        }
        else if(e.target.className === "description")
            this.setState({workExperience: { ...this.state.workExperience, description: e.target.value }});
        else if(e.target.className === "school")
            this.setState({education: {...this.state.education, school: e.target.value}});
        else if(e.target.className === "degree")
            this.setState({education: {...this.state.education, degree: e.target.value}});
        else if(e.target.className === "field")
            this.setState({education: {...this.state.education, field: e.target.value}});
        else if(e.target.className === "location")
            this.setState({education: {...this.state.education, location: e.target.value}});
    }

    onSubmitWork(e) {
        e.preventDefault();
        const form = e.target;
        this.setState({workExperiences: [...this.state.workExperiences,this.state.workExperience]});
        form.reset();
        this.setState({workExperience: {...this.state.workExperience, index: this.state.workExperience.index + 1, id: uniqid()}});
        form.setAttribute("style","display: none");
        form.previousSibling.setAttribute("style", "display: inline");
    }

    onSubmitEdu(e) {
        e.preventDefault();
        const form = e.target;
        this.setState({educationArray: [...this.state.educationArray, this.state.education]});
        form.reset();
        this.setState({education: {...this.state.workExperience, index: this.state.workExperience.index + 1, id: uniqid()}});
        form.setAttribute("style","display: none");
        form.previousSibling.setAttribute("style","display: inline");
    }

    addItem(e) {
        e.target.setAttribute("style","display: none");
        const form = e.target.nextSibling;
        form.setAttribute("style","display: inline");
    }

    render() {
        const { firstName, lastName, email, phoneNumber } = this.state;
        const { workID } = this.state.workExperience.id;
        const { eduID } = this.state.education.id;
        return(
            <div className="cv-form">
                <h1 className="title">CV Builder</h1>
                <div className="cv">
                    <GeneralComponent
                        firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} handleChange={this.handleChange}/>
                    <WorkComponent
                        handleChange={this.handleChange} id={workID} onSubmitWork={this.onSubmitWork} workExperiences={this.state.workExperiences} addItem={this.addItem}/>
                    <EducationComponent
                        handleChange={this.handleChange} id={eduID} onSubmitEdu={this.onSubmitEdu} educationArray={this.state.educationArray} addItem={this.addItem}/>
                </div>
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
            <div className = "formDiv">
                <label htmlFor={props.key}>{props.propertyString}</label>
                <div>
                    <textarea className={props.property} onChange={props.handleChange} type={props.inputType} placeholder={props.placeholder} id={props.id}></textarea>
                </div>
            </div>
        )
    }
    return(
        <div className="formDiv">
            <label htmlFor={props.key}>{props.propertyString}</label>
            <div>
                <input className={props.property} onChange={props.handleChange} type={props.inputType} placeholder={props.placeholder} id={props.id}></input>
            </div>
        </div>
    )
}

const GeneralComponent = (props) => {
    return(
        <div className="general">
            <div>
                <Input
                    name={props.firstName} handleChange={props.handleChange} property="firstName" propertyString="First Name"/>
                <Input
                    name={props.lastName} handleChange={props.handleChange} property="lastName" propertyString="Last Name"/>
            </div>
            <div>
                <Input
                    name={props.email} handleChange={props.handleChange} property="email" propertyString="Email"/>
                <Input
                    name={props.phoneNumber} handleChange={props.handleChange} property="phoneNumber" propertyString="Phone Number"/>
            </div>
        </div>
    )
}

const WorkComponent = (props) => {
    return(
        <div className="workExperience">
            <h1>Work Experience</h1>
            <hr></hr>
            <WorkOverview workExperiences={props.workExperiences}/>
            <button onClick={props.addItem}>Add Work Experience</button>
            <form onSubmit={props.onSubmitWork} className="workForm" style={{display:"none"}}>
                <OtherInput
                    handleChange={props.handleChange} inputType = "text" id={props.id} property="jobTitle" placeholder="Job Title" propertyString="Job Title"/>
                <OtherInput
                    handleChange={props.handleChange} inputType = "text" id={props.id} property="company" placeholder="Company" propertyString="Company"/>
                <div style={{display:"flex"}} className="work">
                    <OtherInput
                        handleChange={props.handleChange} inputType = "date" id={props.id} property="from" placeholder="From" propertyString="From"/>
                    <OtherInput
                        handleChange={props.handleChange} inputType = "date" id={props.id} property="to" placeholder="to" propertyString="To"/>
                </div>
                <OtherInput
                    handleChange={props.handleChange} inputType = "textArea" id={props.id} property="description" placeholder="Please write briefly about your job description" propertyString="Description"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const EducationComponent = (props) => {
    return (
        <div>
            <h1>Education</h1>
            <hr></hr>
            <EducationOverview educationArray={props.educationArray}/>
            <button onClick={props.addItem}>Add Education</button>
            <form onSubmit={props.onSubmitEdu} className="eduForm" style={{display:"none"}}>
                <OtherInput
                    handleChange={props.handleChange} inputType="text" id={props.id} property="school" placeholder="School" propertyString="School"/>
                <div style={{display:"flex"}} className="education">
                    <OtherInput
                        handleChange={props.handleChange} inputType="date" id={props.id} property="from" placeholder="From" propertyString="From"/>
                    <OtherInput
                        handleChange={props.handleChange} inputType="date" id={props.id} property="to" placeholder="To" propertyString="To"/>
                </div>
                <label htmlFor="degree">Degree</label>
                <select onChange={props.handleChange} className="degree" name="degree" id="degree" style={{display:"block"}}>
                    <option value="None">None</option>
                    <option value="High school or equivalent">High School or equivalent</option>
                    <option value="Associate">Associate's</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="Doctorate">Docatorate</option>
                    <option value="Other">Other</option>
                </select>
                <OtherInput
                    handleChange={props.handleChange} inputType="text" id={props.id} property="field" placeholder="Field of Study" propertyString="Field of Study"/>
                <OtherInput
                    handleChange={props.handleChange} inputType="text" id={props.id} property="location" placeholder="Location" propertyString="Location"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const WorkOverview = (props) => {
    const { workExperiences } = props;
    return (
        <ul style={{listStyleType: "none"}}>
            {workExperiences.map((workExperience) => {
                return (
                    <li key={workExperience.id} className="listItem">
                        <div>
                            <div className="itemHeader">
                                <span style={{fontWeight:"bold"}}>{workExperience.jobTitle} - {workExperience.company}</span>
                                <span>{workExperience.from} - {workExperience.to}</span>
                            </div>
                            <span>{workExperience.description}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )

}

const EducationOverview = (props) => {
    const { educationArray } = props;
    return (
        <ul style={{listStyleType: "none"}}>
            {educationArray.map((education) => {
                return (
                    <li key = {education.id} className="listItem">
                        <div className="itemHeader">
                            <span style={{fontWeight:"bold"}}>{education.degree} - {education.school}</span>
                            <span>{education.from} - {education.to}</span>
                        </div>
                        <div style={{fontWeight:"strong"}}>{education.field}</div>
                        <div> {education.location} </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default App;
