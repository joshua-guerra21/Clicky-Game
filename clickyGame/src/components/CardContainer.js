import React, {Component} from 'react';
import Card from './Card';
import Chars from "../../../clickyGame/src/char.json"

class CardContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            score: 1,
            chars: Chars,
            selectedChars: []
        };
    }

    
    handleClick = (e) => {

        let id = e.target.id;

        let exists = false;

        this.state.selectedChars.forEach(char => {

            if (char.id === id) {
 
                exists = true;
            }
        })

        if (exists) {
            this.endGame();
        }

        else {
            this.state.chars.forEach(char => {
                if (char.id === id) {
                    this.setState({selectedChars: [...this.state.selectedChars, char]});
                    console.log(this.state.selectedChars);

                    this.updateScore();
                }
            })  
        }
        
        function shuffle(chars) {
            chars.sort(() => Math.random() - 0.5);
        }

        this.setState({ chars: shuffle(this.state.chars)});
        console.log("Shuffling Chars");

    }

    updateScore = () => {
        this.setState({score: this.state.score + 1});
        this.props.updateCurrentScore(this.state.score);
        console.log("Score: " + this.state.score);
    }

    endGame = () => {
        console.log("End!");
        this.props.updateTopScore(this.state.score);

        this.setState({score: 1, selectedChars: []});
        this.props.updateCurrentScore(0);
    }

    render() {
        return (
            <div className="container" id="card-container">
                <div className="row">
                    {Chars.map(char => <Card src={char.image} key={char.id} id={char.id} alt={char.name} endGame={this.endGame} handleClick={this.handleClick} score={this.state.score} />)}
                </div>
            </div>
        );
    }
}

export default CardContainer;