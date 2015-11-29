var React = require('react');

const Table = require('./components/table');

const TextField = require('material-ui/lib/text-field');

const RaisedButton = require('material-ui/lib/raised-button');


module.exports = React.createClass({
    getInitialState: function() {
        return {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            height: '300px'
        };
    },

    render: function () {
        var s = this.state;
        return (

            <div>
                <Table></Table>
                <RaisedButton label="load more" primary={true} fullWidth={true} />
            </div>
        );
    }
});