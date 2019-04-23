import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            sort: {
                by: 'name',
                value: 1
            }
        };
    }

    // toggleAddWorkForm = () => {
    //     if (this.state.isDisplayAddForm && this.state.taskEditing !== null) {
    //         this.setState({
    //             taskEditing: null
    //         })
    //     } else {
    //         this.setState({
    //             isDisplayAddForm: !this.state.isDisplayAddForm,
    //             taskEditing: null,
    //         })
    //     }
    // }

    // onOpenForm = () => {
    //     this.setState({
    //         isDisplayAddForm: true
    //     });
    // }

    onUpdateItem = (taskId) => {
        var index = this.findIndexById(taskId, this.state.tasks);
        var taskEditing = this.state.tasks[index]
        this.setState({
            taskEditing: taskEditing
        });
        // this.onOpenForm();
    }

    onChangeFilterValue = (filterData) => {
        this.setState({
            filter: {
                name: filterData.filterName,
                status: filterData.filterStatus
            }
        })
    }

    findIndexById(id, list) {
        let result = -1;
        list.forEach((item, index) => {
            if (item.id === id) {
                result = index;
            }
        });
        return result;
    }

    onSubmitSearch = (keyword) => {
        this.setState({
            keyword: keyword
        });
    }

    render() {
        const {
            taskEditing,
            // filter, 
            // keyword 
        } = this.state;

        const {
            isDisplayForm
        } = this.props;

        /* START FILTER TASKS */
        // if (filter) {
        //     if (filter.name) {
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
        //     tasks = tasks.filter((task) => {
        //         if (filter.status === -1) {
        //             return true;
        //         } else {
        //             return task.status === (filter.status === 1);
        //         }
        //     });
        // }
        /* END FILTER TASKS */

        // if (keyword) {
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword) !== -1;
        //     });
        // }

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Work management</h1>
                </div>

                {/* add box */}
                <div className="row">
                    <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <button className="btn btn-primary"
                                            onClick={this.props.onToggleForm}>
                                            Add work
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search & sort */}
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskControl
                                    onSubmitSearch={this.onSubmitSearch} />
                            </div>
                        </div>

                        {/* list box */}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList
                                    // onUpdateItem={this.onUpdateItem}
                                    onChangeFilterValue={this.onChangeFilterValue} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {isDisplayForm === true
                            ? <TaskForm
                                taskEditing={taskEditing} />
                            : ''}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onToggleForm: () => {
            dispatch(actions.onToggleForm());
        },
        onOpenForm: () => {
            dispatch(actions.onOpenForm());
        },
        onCloseForm: () => {
            dispatch(actions.onCloseForm());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
