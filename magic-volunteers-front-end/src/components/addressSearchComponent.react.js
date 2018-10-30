import React, { Component } from "react";
import PlacesAutocomplete,
{
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AdressSearchComponent extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            address: this.props.address || null,
        };
    }
    onError = ( status, clearSuggestions ) => {
        clearSuggestions();
    }
    handleChange = address => {
        this.setState( { address } );
        this.props.updateAddress( "address", null );
    };
    handleSelect = address => {
        geocodeByAddress( address )
            .then( results => {
                return getLatLng( results[ 0 ] );
            } )
            .then( geometryAddress => {
                this.setState( { address } );
                this.props.updateAddress( "address", geometryAddress );
            } )
            .catch( error => console.error( "Error", error ) );
    };
    render() {
        return (
            <div className="mv-form-group">
                <PlacesAutocomplete
                    value={ this.state.address || "" }
                    onChange={ this.handleChange }
                    onSelect={ this.handleSelect }
                    onError={ this.onError }
                >
                    {( { getInputProps, suggestions, getSuggestionItemProps } ) => (
                        <div className="autocomplete">
                            <div>
                                <label htmlFor="address">Adresa</label>
                                { <FontAwesomeIcon className="search-icon" icon="search-location" /> }
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    { ...getInputProps( {
                                        placeholder: "Cauta adresa",
                                        className: "search-input",
                                    } ) }
                                />
                            </div>
                            <div className={ `autocomplete-dropdown-container ${ suggestions.length ? "" : "hide" }` }>
                                {suggestions.map( suggestion => {
                                    return (
                                        <div
                                            { ...getSuggestionItemProps( suggestion ) }
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                } )}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
        );
    }
}

export default AdressSearchComponent;
