/**
 * Created by zhangyouce on 2015/11/28.
 */

var React = require('react');
var moment = require('moment');
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
    propTypes: {
        item: React.PropTypes.array
    },
    componentDidMount: function() {
        //this.onChangePage(1);
    },
    getInitialState: function() {
        return {
            rows: [],
            totalPages: 1,
            perPage: 10,
            loading: true
        };
    },
    onChangePage: function (page) {
        var href = base_url + '/api/articles?page=' + (page -1) + "&size=" + this.state.perPage;
        return client({method: 'GET', path: href}).then(noteCollection => {
            console.log(noteCollection);
            this.setState({
            	//items: noteCollection.entity._embedded.acq_bbs_board
                items: noteCollection.entity.articles
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
                <TableRowColumn>{item.content}</TableRowColumn>
                <TableRowColumn>{moment(item.intime).format('YYYY-DD-MM HH:mm:ss')}</TableRowColumn>
            </TableRow>
        );
    },
    render : function () {
        var s = this.state;
        //this.props.items.forEach(function(zone) {
        //    this.state.rows.push(<CustomRow Population={zone.population} Zone={zone.name} />);
        //}.bind(this));
        return (
            <div>
                <h1>Welcome to ohlife</h1>
                <Table>
                <TableHeader enableSelectAll={this.state.enableSelectAll}>
                    <TableRow>
                        <TableHeaderColumn colSpan="3" tooltip='list of your life' style={{textAlign: 'center'}}>
                            list of your life
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn tooltip='The Content'>Content</TableHeaderColumn>
                        <TableHeaderColumn tooltip='intime'>Intime</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.props.items.map(this.renderItem)}
                </TableBody>
                    </Table>
            </div>
        );
    }
});
