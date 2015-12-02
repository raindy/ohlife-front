/**
 * Created by zhangyouce on 2015/11/28.
 */

var React = require('react');
const client = require('../client');

//Import statements:
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');


const Loading = React.createClass({
    propTypes: {
        loading: "loading"
    },
    getInitialState: function() {
        return {
            loading: "loading"
        };
    },
    render: function() {
        var divStyle = {
            backgroundColor: "gray",
            width: window.width,
            height: window.height

        };
        var innerStyle = {
            margin: "0 auto",
            width: 100,
            height: 100
        };
        return (
            <div style={divStyle}>
                <div style={innerStyle}>
                    <RefreshIndicator size={40} left={80} top={5} status="{this.props.loading}" />
                </div>
            </div>
        )
    }
});

//var base_url = "http://zhangyouce-ohlife-api.daoapp.io";
//var base_url = "http://localhost:8088";
var base_url = "";

module.exports = React.createClass({
    componentDidMount: function() {
        this.onChangePage(1);
    },
    getInitialState: function() {
        return {
            items: [],
            totalPages: 1,
            perPage: 10,
            loading: true
        };
    },
    onChangePage: function (page) {
        var href = base_url + '/api/boards?page=' + (page -1) + "&size=" + this.state.perPage;
        return client({method: 'GET', path: href}).then(noteCollection => {
            console.log(noteCollection);
            this.setState({
            	items: noteCollection.entity._embedded.boards
            });
            //this.setState({totalPages: noteCollection.entity.page.totalPages})
            //console.log(noteCollection);
            //return noteCollection.entity._embedded.boards;
        });
    },
    renderItem: function (item) {
        console.log(item);
        return (
            <TableRow>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.websiteInfo.name}</TableRowColumn>
                <TableRowColumn>{item.url}</TableRowColumn>
            </TableRow>
        );
    },
    render : function () {
        var s = this.state;
        return (
            <div>
                <h1>Paginator example</h1>
                <Table>
                <TableHeader enableSelectAll={this.state.enableSelectAll}>
                    <TableRow>
                        <TableHeaderColumn colSpan="3" tooltip='Super Header' style={{textAlign: 'center'}}>
                            Super Header
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
                        <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {s.items.map(this.renderItem)}
                </TableBody>
                    </Table>
            </div>
        );
    }
});
