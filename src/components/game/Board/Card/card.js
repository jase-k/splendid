import React  from "react";

class Card extends React.Component {
    render(){
        var number = Math.floor((Math.random()*9) + 1) 
        return(
            <div className="cardContainer">
                <img src={process.env.PUBLIC_URL + "ruby/1.jpg"} />
            </div>
        )
    }
}
export default Card;