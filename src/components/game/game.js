import React  from "react";
import PlayerPanel from "./PlayerPanel/playerpanel"
import Board from "./Board/board";
import './playTurn.css'


class Game extends React.Component {
    constructor(props){
        super(props);
        this.renderCards = this.renderCards.bind(this)
        this.reserveCanPlay = this.reserveCanPlay.bind(this)
    }
    renderCards(deckArray){
        var cards = []
        for(var i = 0; i < 4 && i < deckArray.length; i++){
            cards.push(this.renderCard(deckArray[i]))
        }
        return cards
    }
    renderCard(card){
        var clickFunction = this.props.selectCard
        var hover = " hover"
        var tokenPool = this.props.loggedInPlayer.tokenPool
        // console.log("CARD", card, tokenPool)
        var tokenList = ["diamond", "ruby", "sapphire", "onyx", "emerald"]
        var goldCount = tokenPool.gold

        
        for(var i = 0; i < 5; i++){

            var numOfCards = 0;
            for(var j = 0; j < this.props.loggedInPlayer.cards.length; j++){
                if(this.props.loggedInPlayer.cards[j].tokenName == tokenList[i]){
                    if(this.props.loggedInPlayer.ownedCards[j] === 1){
                        numOfCards++
                    }
                }
            }
            var num = card.tokenCost[tokenList[i]] - tokenPool[tokenList[i]] - numOfCards
            if(num > 0){
                goldCount -= num
            }
        }
        if(goldCount < 0 && this.props.currentTurn.reserveCard == false){
            clickFunction = () =>{}
            hover = ""
        }
        
        
        return (
            <img src={process.env.PUBLIC_URL +"cardImgs/"+card.id+".png"}
            className = {"card "+card.id+" "+card.tokenName+hover}
            onClick={clickFunction}
            />
        )
    }
    renderCanPlay(){
        if(this.props.currentTurn.canPlay){
            return(
                <div className="playTurn">
                    <div className='playingObjects'>
                        {this.takeObjects()}
                    </div>
                    <button 
                    className="playButton"
                    onClick={this.props.playTurn}
                    value="play"
                    >Play!</button>
                    <button 
                    className="cancelButton"
                    onClick={this.props.cancelPlay}
                    value="cancel"
                    >Cancel.</button>
                </div>
            )
        }
    }
    takeObjects(){
        if(this.props.currentTurn.cardSelected.id){
            return(
                <img src={process.env.PUBLIC_URL +"cardImgs/"+this.props.currentTurn.cardSelected.id+".png"}
                className = {"card"}
                />
            )
        }
        else{
            var tokenDict = {
                6: "gold", 
                5: "emerald", 
                4: "diamond",
                3: "ruby",
                2: "sapphire",
                1: "onyx"
            }
            var tokens = []
            for(var i =0; i < this.props.currentTurn.tokensSelected.length; i++){
                tokens.push(
                    <img 
                    src={process.env.PUBLIC_URL + '/tokenImgs/'+tokenDict[this.props.currentTurn.tokensSelected[i]]+'.svg'} 
                    className={"tokenImg a"+i} 
                    />
                )
            }
            return tokens
        }
    }
    renderCanNoble(){
        console.log(this.props)
        if(this.props.availableNobles.length > 0){
            return(
                <div className="championOverlay">
                    <div className="playTurn buyNoble">
                        <h3>Nobles Available for {this.props.loggedInPlayer.user.username}</h3>
                        <div className="nobleContainer">
                            {this.renderNobles()}
                        </div>
                    </div>
                </div>
            )
        }
    }
    renderNobles(){
        var nobles = []
        for(var i =0 ; i < this.props.availableNobles.length; i++){
            nobles.push(
            <img 
            src={process.env.PUBLIC_URL + '/nobleImgs/'+this.props.availableNobles[i].id+'.png'} 
            className={"nobleImg "+this.props.availableNobles[i].id}
            alt=''
            onClick={this.props.getNoble}
            />
            )
        }
        return nobles
    }
    endgame(){
        if(this.props.game.champion.length > 0){
            return(
                <div className="championOverlay">
                    <h1>This game was won by <strong>{this.props.game.champion.user.username}</strong></h1>
                </div>
            )
        }
    }
    holdTurn(){
        console.log("Players", this.props.game.players)
        var player = this.props.game.players.filter(player => player.user.id === this.props.loggedInPlayer.user.id)[0]
        var position = player.turn
        if(this.props.game.turn%this.props.game.players.length === position){
            return
        }
        else{
            return(
                <div className="championOverlay">
                    <h1>Please Get Ready for you're next turn</h1>
                </div>
            )
        }
    }
    reservedCardList(){
        var loggedInPlayer = this.props.loggedInPlayer
        var reservedCardList = []
        var renderList =[]
        //Sets Card List
        for(var i = 0 ; i <  loggedInPlayer.cards.length; i++){
            if(loggedInPlayer.ownedCards[i] === "0"){
                reservedCardList.push(loggedInPlayer.cards[i])
            }
        }

        for(var i = 0; i < reservedCardList.length; i++){ //Creates DOM objects
            renderList.push(this.renderCard(reservedCardList[i]))
        }

        return renderList
    }
    reserveCanPlay(){
        var activeClass = ""
        var elemList = this.reservedCardList()
        var regex = new RegExp('hover')
        
        
        for(var i =0; i < elemList.length; i++){
            if(regex.test(elemList[i].props.className)){
                activeClass = " active"
            }
        }
        return activeClass
    }

    render(){
        var hidden = " hidden"
        if(this.props.currentTurn.openReserve){
            hidden = ""
        }
        return(
            <div className="container">
                <img src={process.env.PUBLIC_URL +"background.jpg"} className="background" alt=""/>
                < PlayerPanel players={this.props.game.players} 
                turn={this.props.game.turn}
                openReservedCardPanel = {this.props.openReservedCardPanel}
                closeReservedCardPanel = {this.props.closeReservedCardPanel}
                loggedInPlayer = {this.props.loggedInPlayer}
                side="left"
                reserveCanPlay = {this.reserveCanPlay()}
                />
                < Board 
                game={this.props.game}
                currentTurn = {this.props.currentTurn}
                selectToken = {this.props.selectToken}
                selectCard = {this.props.selectCard}
                loggedInPlayer = {this.props.loggedInPlayer}
                renderCards = {this.renderCards}
                />
                < PlayerPanel players={this.props.game.players} 
                reserveCanPlay = {this.reserveCanPlay()}
                turn={this.props.game.turn}
                side="right" 
                loggedInPlayer = {this.props.loggedInPlayer}
                openReservedCardPanel = {this.props.openReservedCardPanel}
                closeReservedCardPanel = {this.props.closeReservedCardPanel}
                />
                <div className={"championOverlay"+hidden} id="reservedCardContainer">
                    <div className="playTurn">
                        <button 
                        className="exit"
                        onClick={this.props.closeReservedCardPanel}
                        >X</button>
                        {this.reservedCardList()}
                    </div>
                </div>
                {this.renderCanPlay()}
                {this.holdTurn()}
                {this.renderCanNoble()}
                {this.endgame()}
            </div>
        )
    }
}
export default Game;