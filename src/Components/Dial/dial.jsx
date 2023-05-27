import React, { Component } from "react";
import cross from "../Images/cross.png"
import call from "../Images/call.png"
import './dial.css';
import { Link } from "react-router-dom";

class Dial extends Component{

    constructor() {
        super();
        this.inpref = React.createRef();  
        this.state = {
            showerror:false,
            showcall:false,
            input: ''
        };
      }
    render(){

        const handleSubmit=(event)=>{
            const value=event.target.value;
            this.setState({input:(this.state.input+=value)});
            this.inpref.current.focus();
        }
        const handleCross=()=>{
            const value=this.state.input;
            const str=value.substring(0,value.length-1);
            this.setState({input:(str)});
            this.inpref.current.focus();

        }
        const handleInput=(event)=>{
            console.log("inp : ",this.state.input)
            const value=event.target.value;
            this.setState({input:value});
            console.log("inp : ",this.state.input)
            this.inpref.current.focus();

        }





        const errorMessage = () => {
            console.log("in error")
            
            console.log(this.state.showerror)
            const checkerror=this.state.showerror;
            return (
                
              <div className="error" style={{
                display: checkerror?'':'none'                
              }}>
                <h4>Please enter Correct Phone number</h4>
              </div>
            );
        };
        const callMessage = () => {
            console.log("in call")
            
            console.log(this.state.showcall)
            const checkcall=this.state.showcall;
            return (
                
                <div className="calling" style={{
                display: checkcall?'':'none'                
              }}>
                <h4>Calling....</h4>
                </div>
            );
        };
        const handleCall=()=>{
            // event.preventDefault()
            const inp=this.state.input;
            console.log(inp.length);
            console.log(inp);
            if(inp.length<10)
            {
                console.log("Error inf ");
                this.setState({showerror:true})
                this.setState({showcall:false})
                errorMessage();
            }
            else{
                console.log("called");
                this.setState({showcall:true})
                this.setState({showerror:false})
                callMessage();
                
            }
            this.inpref.current.focus();
        }

        const handleKeypress = (e) => {
          if (e.keyCode === 13) {
            handleCall();
          }
        };
         
    return(
        <div className="dialpad">
            <div className="messages">
                {errorMessage()}
                {callMessage()}
            </div>
        <div className="container1">
            <div><h1 className="dialtxt">Dial Pad</h1>
            <div className="userdata">
                <div className="usertxt">User : </div>
                <div className="usertxt"><Link to='/login'>Log out</Link></div>
            </div>
            </div>
                   <div className="container2">
                        <input type="tel" placeholder="Enter number to dial" className="input" onChange={handleInput} value={this.state.input} maxLength={20} autoFocus ref={this.inpref} onKeyDownCapture={handleKeypress}/>
                        
                                  <div className="butt" onClick={handleCross}><img src={cross} alt="" /></div>
                    
                    </div>
            <div className="container3">
                <div className="pad">
                    <button type="button" onClick={handleSubmit}  value="1">1</button>
                    <button type="button" onClick={handleSubmit} value="2">2</button>
                    <button type="button" onClick={handleSubmit} value="3">3</button>
                </div>
                <div className="pad">
                    <button type="button" onClick={handleSubmit} value="4">4</button>
                    <button type="button" onClick={handleSubmit} value="5">5</button>
                    <button type="button" onClick={handleSubmit} value="6">6</button>
                </div>
                <div className="pad">
                    <button type="button" onClick={handleSubmit} value="7">7</button>
                    <button type="button" onClick={handleSubmit} value="8">8</button>
                    <button type="button" onClick={handleSubmit} value="9">9</button>
                </div>
                <div className="pad">
                    <button type="button" onClick={handleSubmit} value="*">*</button>
                    <button type="button" onClick={handleSubmit} value="0">0</button>
                    <button type="button" onClick={handleSubmit} value="#">#</button>

                </div>
            </div>
            <div className="dial">
                <button className="dial2" onClick={handleCall}>
                    <img src={call} alt="" />
                </button>
            </div>
                
        </div>
            
    </div>
            
        
    )
    }
    
}
export default Dial;