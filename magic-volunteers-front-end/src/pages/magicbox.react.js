import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import MagicBoxList from "../components/magicBoxList.react";
import AddMagicBoxForm from "../components/addMagicBoxForm.react";
import { getBoxes } from "../utils/apiServices";
import { fromLatLng } from "../utils/geocodeUtils";

const apiKey = "AIzaSyCH_tbMMOg_9dT6_rsO3TqXkJKQip2j0GM";

class MagicBox extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            authority: true,
            open: false,
            boxes: [],
            availableBoxes: [],
            pages: 0,
            availablePages: 0,
        };
    }
    componentDidMount() {
        if ( this.state.authority ) {
            this.getBoxes( 10, 0, null, "boxes", "pages" );
        } else {
            this.getBoxes( 5, 0, [ { key: "assignedVolunteer", value: "me" } ], "boxes", "pages" );
            this.getBoxes( 5, 0, [ { key: "status", value: "available" } ], "availableBoxes", "availablePages" );
        }
    }
    getBoxes = ( take, skip, params, boxesState, pagesState ) => {
        getBoxes( take, skip * take, params ).then( resp => {
            console.log(resp);
            if ( resp.success ) {
                resp.payload.results.forEach( data => {
                    if (data.address.lng) {
                        fromLatLng( data.address.lat, data.address.lng, apiKey ).then( response => {
                            console.log(response);
                            // const objData = response.results[ 0 ].geometry.location;
                            // objData.volunteer = data;
                            // this.setState( {
                            //     [ boxesState ]: [ ...this.state.volunteers, objData ],
                            // } );
                        } );
                    }
                } );
                this.setState( state => ( {
                    ...state,
                    [ boxesState ]: resp.payload.results,
                    [ pagesState ]: resp.payload.pagination.numberOfPages,
                } ) );
            }
        } );
    }
    render() {
        return (
            <div className="mv-content">
                <h1>Magic Box</h1>
                <AddMagicBoxForm
                    open={ this.state.open }
                    handleClose={ () => this.setState( { open: false } ) }
                />
                {this.state.authority ?
                    <div>
                        <Button classes={ { root: "mv-btn mv-btn-secondary" } } onClick={ () => this.setState( { open: true } ) }>Adauga</Button>
                        <MagicBoxList
                            boxes={ this.state.boxes }
                            pages={ this.state.pages }
                            params={ null }
                            take={ 10 }
                            boxesState="boxes"
                            pagesState="pages"
                            handlePageChange={ this.getBoxes }
                        />
                    </div>
                    :
                    <div>
                        <MagicBoxList
                            boxes={ this.state.boxes }
                            pages={ this.state.pages }
                            params={ [ { key: "assignedVolunteer", value: "me" } ] }
                            boxesState="boxes"
                            pagesState="pages"
                        />
                        <MagicBoxList
                            boxes={ this.state.availableBoxes }
                            pages={ this.state.availablePages }
                            params={ [ { key: "status", value: "available" } ] }
                            boxesState="availableBoxes"
                            pagesState="availablePages"
                        />
                    </div>

                }
            </div>
        );
    }
}

export default MagicBox;
