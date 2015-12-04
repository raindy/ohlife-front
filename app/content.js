define(function(require, exports, module) {
    'use strict';
    var React = require('react');

    const Table = require('./components/table');

    const TextField = require('material-ui/lib/text-field');

    const RaisedButton = require('material-ui/lib/raised-button');

    const Dialog = require('material-ui/lib/dialog');
    const FlatButton = require('material-ui/lib/flat-button');

    var injectTapEventPlugin = require("react-tap-event-plugin");
    injectTapEventPlugin();


    var dataApi = require('./data');

    //var RestKit = require('react-native-rest-kit');
    //
    //var Article = RestKit.Model.extend({
    //    rootUrl : "/api/articles"
    //    //More options to be added
    //});
    module.exports = React.createClass({
        componentDidMount: function() {
            this.getData();
        },
        getInitialState: function () {
            return {
                fixedHeader: true,
                fixedFooter: false,
                stripedRows: false,
                showRowHover: false,
                selectable: true,
                multiSelectable: false,
                enableSelectAll: false,
                deselectOnClickaway: true,
                height: '300px',
                showDialogScrollable: false,


                page: 0,
                items: []
            };
        },
        _handleCustomDialogCancel: function (e) {
            e.preventDefault();
            console.log(2);
            this.setState({
                showDialogScrollable: false
            });
        },
        _handleCustomDialogSubmit: function (e) {
            e.preventDefault();
            console.log(this.refs.note.getValue());

            //Article.set('content', this.refs.note.getValue());




            //return client({method: 'POST', path: href, entity:{"content":this.refs.note.getValue()}}).then(noteCollection => {
            //    console.log(noteCollection.entity);
            //});
            //Article.save({}, function(error){
            //    if(error) console.log(error);
            //    console.log(people);
            //});

            var self = this;
            var data1234 = {
                "title": "",
                "slug": "",
                "content": this.refs.note.getValue(),
                "author": ""
            };

            dataApi.article.post(data1234, function (article) {
                self.setState({
                    showDialogScrollable: false
                });
                self.addToList(article);

            })

        },

        openDialog: function (e) {
            e.preventDefault();
            console.log(1);
            this.setState({
                showDialogScrollable: true
            });
        },
        loadMore: function (e) {
            e.preventDefault();
            //this.setState({"page" : this.state.page + 1});
            this.page ++;
            this.getData()

        },

        addToList: function (data) {
            var newComments = [data].concat(this.state.items);
            console.log(data);
            this.setState(
                {
                    items : newComments
                }
            );
        },

        getData: function () {
            var self = this;
            console.log(this.state.page);
            this.page = this.page || 0;
            dataApi.article.search(this.page, function (data) {
                var comments = self.state.items;
                // Optimistically set an id on the new comment. It will be replaced by an
                // id generated by the server. In a production application you would likely
                // not use Date.now() for this and would have a more robust system in place.
                //comment.id = Date.now();
                var newComments = comments.concat(data.articles);
                console.log(data);
                self.setState(
                    {
                        items : newComments
                    }
                );
            })
        },

        render: function () {
            var s = this.state;
            let customActions = [
                <FlatButton
                    label="Cancel"
                    secondary={true}
                    onTouchTap={this._handleCustomDialogCancel}/>,
                <FlatButton
                    label="Submit"
                    primary={true}
                    onTouchTap={this._handleCustomDialogSubmit}/>
            ];
            return (

                <div>
                    <Dialog
                        title="write whatever"
                        actions={customActions}
                        autoDetectWindowHeight={true}
                        autoScrollBodyContent={true}
                        open={this.state.showDialogScrollable}
                        onRequestClose={this._handleRequestClose}>
                        <div style={{height: '500px'}}>
                            <TextField ref="note"
                                hintText="Styled Hint Text"
                                hintStyle={{color: 'red'}}
                                fullWidth={true}
                                multiLine={true}/>
                        </div>
                    </Dialog>
                    <RaisedButton label="to record your memory" primary={true} onTouchTap={this.openDialog} />
                    <Table items={this.state.items}></Table>
                    <RaisedButton label="load more" primary={true} fullWidth={true} onTouchTap={this.loadMore} />
                </div>
            );
        }
    });
});