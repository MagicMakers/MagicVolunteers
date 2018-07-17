import React from "react";
import MyBoxes from "./components/MyBoxes";
import AvailableBoxes from "./components/AvailableBoxes";
import MagicNav from "./components/MagicNav";
import "./VolunteerPage.css";

const changeBoxStatus = ( id, status ) =>
    fetch( `/boxes/${ id }/changeStatus`, {
        method: "PUT",
        body: JSON.stringify( { status } ),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    } );
const assignBoxVolunteer = ( boxId, volunteerId ) =>
    fetch( `/boxes/${ boxId }/assignVolunteer/${ volunteerId }`, {
        method: "PUT",
    } );
export class VolunteerPage extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            myBoxes: [],
            availableBoxes: [],
            citiesList: [],
            countiesList: [],
        };

        this.handleBoxStatusChange = this.handleBoxStatusChange.bind( this );
        this.handleBoxAssign = this.handleBoxAssign.bind( this );
        this.handleCountyChange = this.handleCountyChange.bind( this );
    }

    componentDidMount() {
        fetch( "/boxes?status=available" )
            .then( response => response.json() )
            .then( data => this.setState( { availableBoxes: data.payload } ) );
        fetch( `/boxes?assignedVolunteer=${ this.props.match.params.id }` )
            .then( response => response.json() )
            .then( data => this.setState( { myBoxes: data.payload } ) );
        fetch( "/boxes/citiesList" )
            .then( response => response.json() )
            .then( data => this.setState( { citiesList: data.payload } ) );
        fetch( "/boxes/countiesList?boxStatus=available" )
            .then( response => response.json() )
            .then( data => this.setState( { countiesList: data.payload } ) );
    }

    handleBoxStatusChange( id, status ) {
        changeBoxStatus( id, status ).then( () => {
            this.setState( prevState => ( {
                myBoxes: prevState.myBoxes.map( box => {
                    if ( box._id === id ) {
                        box.status = status;
                        return box;
                    }
                    return box;
                } ),
            } ) );
        } );
    }

    handleBoxAssign = id => () => {
        assignBoxVolunteer( id, this.props.match.params.id ).then( () => {
            this.setState( prevState => {
                const boxToAssign = prevState.availableBoxes.find( box => box._id === id );
                boxToAssign.status = "assigned";
                return {
                    myBoxes: [ ...prevState.myBoxes, boxToAssign ],
                    availableBoxes: prevState.availableBoxes.filter( box => box._id != id ),
                };
            } );
        } );
    };

    handleCountyChange( e ) {
        const url = e.target.value
            ? `/boxes?status=available&county=${ e.target.value }`
            : "/boxes?status=available";
        fetch( url )
            .then( response => response.json() )
            .then( data => this.setState( { availableBoxes: data.payload } ) );
    }
    render() {
        return (
            <main>
                <MagicNav />
                <MyBoxes
                    boxes={this.state.myBoxes}
                    onBoxStatusChange={this.handleBoxStatusChange}
                />
                <AvailableBoxes
                    boxes={this.state.availableBoxes}
                    cities={this.state.citiesList}
                    counties={this.state.countiesList}
                    onAssignBox={this.handleBoxAssign}
                    onSelectCounty={this.handleCountyChange}
                />
            </main>
        );
    }
}
