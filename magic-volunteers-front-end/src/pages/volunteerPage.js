import React from "react";
import MyBoxes from "../components/myBoxes";
import AvailableBoxes from "../components/availableBoxes";
import "./volunteerPage.css";

import {
    changeBoxStatus,
    getBoxesByStatus,
    getBoxesByAssignedVolunteer,
    assignBoxVolunteer,
    getCitiesList,
    getCountiesListByStatus,
} from "../utils/apiServices";

class VolunteerPage extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            myBoxes: [],
            availableBoxes: [],
            citiesList: [],
            countiesList: [],
        };

        this.handleBoxAssign = this.handleBoxAssign.bind( this );
    }

    componentDidMount() {
        getBoxesByStatus( "available" ).then( data => data.payload && this.setState( { availableBoxes: data.payload } ) );
        getBoxesByAssignedVolunteer().then( data => data.payload && this.setState( { myBoxes: data.payload } ) );
        getCitiesList().then( data => data.payload && this.setState( { citiesList: data.payload } ) );
        getCountiesListByStatus( "available" ).then( data => data.payload && this.setState( { countiesList: data.payload } ) );
    }

    handleBoxStatusChange( id, status ) {
        changeBoxStatus( id, status ).then( () => {
            this.setState( prevState => ( {
                myBoxes: prevState.myBoxes.map( box => {
                    if ( box._id === id ) {
                        return Object.assign( {}, box, { status } );
                    }
                    return box;
                } ),
            } ) );
        } );
    }

    handleBoxAssign = id => () => {
        // eslint-disable-next-line react/prop-types
        assignBoxVolunteer( id, this.props.match.params.id ).then( () => {
            this.setState( prevState => {
                const boxToAssign = prevState.availableBoxes.find( box => box._id === id );
                boxToAssign.status = "assigned";
                return {
                    myBoxes: [ ...prevState.myBoxes, boxToAssign ],
                    availableBoxes: prevState.availableBoxes.filter( box => box._id !== id ),
                };
            } );
        } );
    };

    handleCountyChange = e => {
        // TODO: move to apiServices util
        const url = e.target.value
            ? `/boxes?status=available&county=${ e.target.value }`
            : "/boxes?status=available";
        fetch( url )
            .then( response => response.json() )
            .then( data => this.setState( { availableBoxes: data.payload } ) );
    };

    render() {
        const {
            myBoxes, availableBoxes, citiesList, countiesList,
        } = this.state;

        return (
            <main>
                <MyBoxes boxes={ myBoxes } onBoxStatusChange={ this.handleBoxStatusChange } />
                <AvailableBoxes
                    boxes={ availableBoxes }
                    cities={ citiesList }
                    counties={ countiesList }
                    onAssignBox={ this.handleBoxAssign }
                    onSelectCounty={ this.handleCountyChange }
                />
            </main>
        );
    }
}

export default VolunteerPage;
