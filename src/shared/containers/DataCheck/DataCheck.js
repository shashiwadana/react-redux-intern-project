import React, { Component } from 'react'
let skillList = [];
export class DataCheck extends Component {
   
    constructor(props) {
        super(props)
    
        this.state = {
            skill: "",
            skillId: "",
        }
       this. handleSkillChange=this. handleSkillChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this); 
    }
    componentDidMount() {
        // worker skill selection
    
        fetch("http://localhost:3001/dataservices/getallskills")
        .then (res=>res.json())
          .then(res => {
              console.log(res);
            let temArray = {};
            for (let i = 0; i < res.recordsets[0].length; i++) {
              temArray["value"] = res.recordsets[0][i].SkillId;
              temArray["label"] = res.recordsets[0][i].SkillTitle;
              skillList.push(temArray);
              console.log(skillList);
              temArray = {};
            }
          })
          .catch(function(error) {
             console.log(error);
          });
      }
    
      handleSkillChange(skill) {
        this.setState({
          skill: skill,
          skillId: skill.value
        });
      }
      handleSubmit(event) {
        alert('A skill was submitted: ' + this.state.skill);
        event.preventDefault();
      }
    render() {
        return (
            <div>
                <h6>skills :{skillList}</h6>
                 <form onSubmit={this.handleSubmit}>
                 <select
                      value={this.state.skill}
                      onChange={this.handleSkillChange}
                      options={skillList}
                      placeholder="Skills"
                    />
                    <input type="submit" value="Submit" />
                 </form>
            </div>
        )
    }
}

export default DataCheck
