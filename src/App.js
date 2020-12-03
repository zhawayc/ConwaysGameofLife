import './App.css';
import React from "react";
import Board from "./Board";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      number: 0,
      interval: 10,
      submitted: false,
      paused: false,
      classic: true
    }
  }
  
  handleChangeNum(event){
    this.setState({
      number: event.target.value,
      submitted: false
    })
  }

  handleChangeTime(event){
    this.setState({
      interval:event.target.value*1000,
      submitted: false
    })
  }

  handleSubmit(event){
      event.preventDefault();
      this.setState({
        submitted: true
      })
  }

  pauseGame(){
    this.setState({
      paused: true
    })
  }

  continueGame(){
    this.setState({
      paused: false
    })
  }

  showHeat(){
    this.setState({
      classic: false
    })
  }

  showClassic(){
    this.setState({
      classic: true
    })
  }

  render(){
    var board=null;
    if(this.state.submitted){
      board=<Board number={this.state.number} interval={this.state.interval} paused={this.state.paused} classic={this.state.classic}/>
    }
    return (
      <div class="container">
        <form className="input-form" onSubmit={(e)=>this.handleSubmit(e)}>
          <div class="input-blank">
            <label for="number">Number of Rows: </label>
            <input id="number" type="text" onChange={e=>{this.handleChangeNum(e)}}/>
          </div>

          <div className="input-blank">
            <label for="interval">Time interval (sec): </label>
            <input id="interval" type="text" onChange={e=>{this.handleChangeTime(e)}}/>
          </div>

          <input type="submit" value="OK"/>
        </form>
        <button onClick={()=>{this.pauseGame()}}>Pause</button>
        <button onClick={()=>{this.continueGame()}}>Continue</button>
        <button onClick={()=>{this.showClassic()}}>Classic</button>
        <button onClick={()=>{this.showHeat()}}>Heatmap</button>
        {board}
      </div>
    );
  }
}

export default App;
