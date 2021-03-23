import React, {Component} from 'react';
import './game.css';
import CreateReactClass from 'create-react-class';

let values = []
let numberMoved;
const maxNumberMoved = 64;
let marioJump;
let maxMashroom;


const Start = () => {
	return (
		<div className="getting_started">
			<h2>Maze Game</h2>
			<p>Eat all mashrooms in 64 steps.</p>
			<p>Default maze size : 10 x 10, </p>
			<p>To change Maze size : reload change enter height and width in prompt.</p>
		</div>
		)
}

const GameProgress = () => {
	let scoreAchived  = document.getElementById('score__achived')
	let numberMovedScore = document.getElementById('moves__made')
	let stepsRemaining = document.getElementById('moves__remaining')
	let mashrooms_remaining = document.getElementById('mashrooms__remaining')
	stepsRemaining.innerHTML = maxNumberMoved -  numberMoved
	numberMovedScore.innerHTML = numberMoved
	mashrooms_remaining.innerHTML = document.getElementsByClassName('active').length
	scoreAchived.innerHTML = maxMashroom - document.getElementsByClassName('active').length
}

let Score = CreateReactClass({
	getInitialState: ()=> {
		return {score: 0}
	},

	render: ()=> {
		return (
		<div id="score" className="scoreGame">
			<div className="achived__scores">
				<p>Score</p>
				<p id="score__achived">0</p>
			</div>
			<div className="moves__used">
				<p>Moves Made</p>
				<p id="moves__made">0</p>
			</div>
			<div className="moves__remaining">
				<p>Move Remaining</p>
				<p id="moves__remaining">0</p>
			</div>
			<div className="mashrooms__remaining">
				<p>Mashroom Remaining</p>
				<p id="mashrooms__remaining">0</p>
			</div>
		</div>
		)
	}
})

let Cell = CreateReactClass({
	getInitialState : function() {
		return {selected: false}

	},
	render: function() {
		return (
		<div className={this.state.selected?"cell active":"cell"}
			id={this.props.id}>
		</div>
		)
	}
})

let GameBox = CreateReactClass({
	getInitialState : function() {
		let c = []  
		for(let i=1; i<=this.props.matrix; i++){ 
			c.push( <Cell key={i} id={i} cells={c} /> )
			values.push(i)
		}
		return {cells: c} 
	},
	render: function() {
		return (
		  <div className="gamebox"> { this.state.cells } </div>
		)    
	}
})

const gameFinished = () => {
	if(numberMoved === maxNumberMoved){
		let confirm = window.confirm("Oww!! game Over. Wish to restart?");
		if (confirm === true){
			window.location.reload();
		}
	}
	let check = document.getElementsByClassName('active')
	if(check.length === 0){
		let game_complete = window.confirm("hurray!!! you finished in "+ numberMoved + " moves.");
		if (game_complete === true){
			window.location.reload()
		}
	}
}

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array
	
}

const Movement = (event) => {
	if (event.keyCode === 37){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move = document.getElementById(marioid-1)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid-1
		}
		else{
			numberMoved = numberMoved-1
		}
		
	}
	if (event.keyCode === 38){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_up = parseInt(marioid,10) - parseInt(marioJump,10);
		let move = document.getElementById(move_up)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid-marioJump
		}
		else{
			numberMoved = numberMoved-1
		}
	}
	
	if (event.keyCode ===39){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_right = parseInt(marioid,10) + 1
		let move = document.getElementById(move_right)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML

			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid+1
		}
		else{
			numberMoved = numberMoved-1
		}
	}
	
	if (event.keyCode === 40){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_up = parseInt(marioid,10) + parseInt(marioJump,10)
		let move = document.getElementById(move_up)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid+marioJump
		}
		else{
			numberMoved = numberMoved-1
		}
	}

}






class Game extends Component {
  constructor(props){
		super(props);
		let width = prompt("Enter width of game: ", "e.g. 10,20,30");
		let height = prompt("Enter height of  game: ", "e.g. 10,20,30");

		if(height == null || width == null || isNaN(width) === true || isNaN(height) === true){
			height = 10
      		width =  10
		}
		let matrix_size = height * width
		marioJump = width
		this.state = {
			matrix_size : matrix_size,
			width : width,
      		height : height,
		}
  }
  
  componentDidMount() {
		window.addEventListener('load', this.handleLoad(this.state.width,this.state.height));
  }
  
  handleLoad(width,height){
		let matrix = document.getElementById('root')
		matrix.style.height = 40 * height + "px"
    	matrix.style.width = 10 * width + "%"
		let shuffled_data = shuffleArray(values)
		let truncated_data = shuffled_data.slice(0,parseInt(this.state.matrix_size/3,10))

		for (let i = 0; i < truncated_data.length; i++) {
			let elem_position = document.getElementById(truncated_data[i])
			elem_position.innerHTML="<img src='marioMashRoom.png' alt='mario' class='maze-image'/>";
			elem_position.classList.toggle('active')
		}

		let unique_data = shuffled_data.filter(function(obj) { return truncated_data.indexOf(obj) === -1; });
		let item = unique_data[Math.floor(Math.random()*unique_data.length)];
		let marioposition=document.getElementById(item)
		marioposition.classList.toggle('mario')
		marioposition.innerHTML="<img src='superMario.png' alt='mario' class='maze-image'/>";
		maxMashroom = document.getElementsByClassName('active').length
  }
  
  onKeyPress(event){
		if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
			if (numberMoved === undefined){
			  	numberMoved = 0
			}
			numberMoved = numberMoved + 1;

		}
		Movement(event) 
		gameFinished()
		GameProgress()
  }
  
  componentWillMount() {
		document.addEventListener("keydown", this.onKeyPress);
	}


render(){
  return (
    <div className="Game">
     <div className="starting__div">
        <Start />
     </div>
      <div className="game__box__div">
        <GameBox matrix={this.state.matrix_size}/>
      </div>
      <div className="score__board__div">
        <Score />
      </div>
    </div>
  )
}
}

export default Game;