import React from "react";
import Square from "./Square";
import "./Board.css";

class Board extends React.Component{
    constructor(props){
        super(props);
        this.init(props.number);
    }

    init(n){
        let board=[];
        let aliveCell=0;
        for(let i=0;i<n;i++){
            let tmp=[];
            for(let j=0;j<n;j++){
                let rand=Math.random()*100;
                if(rand<5){
                    tmp.push(1);
                    aliveCell++;
                }
                else{
                    tmp.push(0);
                }
            }
            board.push(tmp);
        }
        this.state={
            board: board,
            aliveCell: aliveCell
        };
    }

    onClick(i,j){
        let board=this.state.board;
        if(board[i][j]!==0){
            board[i][j]=0;
            this.setState({
                board:board,
                aliveCell: this.state.aliveCell-1
            });
        }
        else{
            board[i][j]=1;;
            this.setState({
                board:board,
                aliveCell:this.state.aliveCell+1
            });
        }
    }

    updateBoard(){
        if(this.props.paused){
            return;
        }
        let aliveCell=0;
        let newBoard=this.state.board;
        for(let i=0;i<this.props.number;i++){
            for(let j=0;j<this.props.number;j++){
                let dx=[-1,0,1,-1,1,-1,0,1];
                let dy=[-1,-1,-1,0,0,1,1,1];
                let countLife=0;
                for(let k=0;k<8;k++){
                    let newx=i+dx[k];
                    let newy=j+dy[k];
                    if(newx>=0&&newx<this.props.number&&newy>=0&&newy<this.props.number){
                        if(this.state.board[newx][newy]==1){
                            countLife++;
                        }
                    }
                }
                if(countLife<2||countLife>3){
                    newBoard[i][j]--;
                }
                else if(this.state.board[i][j]==1&&countLife==2||countLife==3){
                    newBoard[i][j]=1;
                }
                else{
                    newBoard[i][j]--;
                }
                if(newBoard[i][j]==1){
                    aliveCell++;
                }
            }
        }
        this.setState({
            board:newBoard,
            aliveCell:aliveCell
        });
    }

    componentDidMount(){
        setInterval(()=>{this.updateBoard()},this.props.interval);
    }

    render(){
        var boardUI = this.state.board.map((row,x)=>{
            return (
                <div className="board-row">
                    {row.map((cell,y)=>{
                        return <Square life={cell} onClick={()=>{this.onClick(x,y)}} classic={this.props.classic}/>
                    })}
                </div>
            )
        })

        return(
            <div>
                <div>Alive: {this.state.aliveCell}</div>
                {boardUI}
            </div>
        )
    }
}

export default Board;