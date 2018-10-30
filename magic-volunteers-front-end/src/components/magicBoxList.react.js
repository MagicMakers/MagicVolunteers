import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./magicBoxList.css";
import MaigcBoxDetails from "./magicBoxDetails.react";

class MagicBoxList extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            take: this.props.take || 5,
            skip: 0,
        };
    }
    handlePageChange = ( page ) => {
        this.setState( { skip: page }, () => {
            this.props.handlePageChange( this.state.take, this.state.skip, this.props.params, this.props.boxesState, this.props.pagesState );
        } );
    }
    handlePageSizeChange = ( pageSize, page ) => {
        this.setState( {
            skip: page,
            take: pageSize,
        }, () => {
            this.props.handlePageChange( this.state.take, this.state.skip, this.props.params, this.props.boxesState, this.props.pagesState );
        } );
    }
    render() {
        const columns = [ {
            Header: "Nume",
            accessor: "name",
        }, {
            id: "address",
            Header: "Adresa",
            accessor: d => `${ d.address.city } , ${ d.address.county } `,
        }, {
            Header: "Activ",
            accessor: "isActive",
        }, {
            Header: "Status",
            accessor: "status",
        } ];
        return (
            <ReactTable
                manual
                sortable={ false }
                data={ this.props.boxes }
                columns={ columns }
                pages={ this.props.pages }
                page={ this.state.skip }
                pageSize={ this.state.take }
                onPageChange={ this.handlePageChange }
                onPageSizeChange={ this.handlePageSizeChange }
                SubComponent={ () => (
                    <MaigcBoxDetails />
                ) }
            />
        );
    }
}

export default MagicBoxList;
