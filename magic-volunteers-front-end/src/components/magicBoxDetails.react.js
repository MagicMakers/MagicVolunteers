import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class MagicBoxDetails extends Component {
    constructor( props ) {
        super( props );
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <div className="mv-action">
                    <Button classes={ { root: "mv-btn mv-action-btn mv-btn-green" } } onClick={ () => this.setState( { open: true } ) }>Sterge</Button>
                    <Button classes={ { root: "mv-btn mv-action-btn mv-btn-primary" } } onClick={ () => this.setState( { open: true } ) }>Editeaza</Button>
                </div>
            </div>
        );
    }
}

export default MagicBoxDetails;
