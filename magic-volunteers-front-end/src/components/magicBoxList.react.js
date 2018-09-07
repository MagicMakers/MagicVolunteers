import React, { Component } from "react";
import { getBoxes } from "../utils/apiServices";
import "./magicBoxList.css";

class MagicBoxList extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            boxListArray: [],
        };
    }
    componentDidMount() {
        getBoxes().then( resp => {
            if ( resp.success ) {
                this.setState( {
                    boxListArray: resp.payload.results,
                } );
            }
        } );
    }
    addBox = () => {
        console.log( "Add box" );
    }

    render() {
        return (
            <div className="box-list">
                <ul>
                    {this.state.boxListArray.map( data => (
                        <li key={ data._id }>
                            <div>
                                <div> {data.name}</div>

                                <div> {data.assignedVolunteer} </div>
                                <div> {data.isActive ? "Activ" : "Inactiv"} </div>
                                <div>
                                    {data.address.city + data.address.county + data.address.details}
                                </div>
                                <div> {data.status} </div>
                                <div className="hide"> {data.details} </div>
                                <div className="hide"> {data.createdAt} </div>
                                <div className="hide"> {data.updatedAt} </div>

                                {console.log( data )}
                            </div>
                        </li>
                    ) )}
                </ul>
                <div className="add-button">
                    <button onClick={ this.addBox }>Add Box</button>
                </div>
            </div>
        );
    }
}

export default MagicBoxList;
