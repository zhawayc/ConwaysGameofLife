import React from "react";
import "./Square.css"

class Square extends React.Component{
    constructor(props){
        super(props);
    }

    getHeat(life){
        const colors=["#00FF00","#CCFF33","#FFFF33","#FFCC22","#FFAA33",
        "#FFBB66","#FFA488","#FFC8B4","#FFCCCC","#FFB7DD","#FFFFFF"];
        if(life==1){
            return colors[0];
        }
        let index=Math.abs(life)+1;
        return colors[index>10?10:index];
    }

    render(){
        const color = this.props.classic?(this.props.life == 1 ? "black":"white"):
        this.getHeat(this.props.life);
        return(
            <div className="square" style={{backgroundColor:color}} onClick={this.props.onClick}></div>
        )
    }
}

export default Square;