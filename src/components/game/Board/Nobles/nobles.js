import React  from "react";
import './noble.css'

class NobleContainer extends React.Component {
    renderNobles(nobleArray){
        var nobles = []
        for(var i =0; i < nobleArray.length; i++){
            nobles.push(this.renderNoble(nobleArray[i]))
        }
        return nobles
    }
    renderNoble(noble){
        return (
            <img src={process.env.PUBLIC_URL + '/nobleImgs/'+noble.id+'.png'} className="nobleImg" />
        )
    }
    render(){
        return(
            <div className="nobleContainer">
                {this.renderNobles(this.props.nobles)}
            </div>
        )
    }
}
export default NobleContainer;