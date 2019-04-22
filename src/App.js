import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            isDisplayAddForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: ''
        };
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks: tasks
            })
        }
    }

    generateRandomId() {
        return this.getRandomString() + this.getRandomString() + '-' + this.getRandomString() + this.getRandomString();
    }

    getRandomString() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }

    toggleAddWorkForm = () => {
        if (this.state.isDisplayAddForm && this.state.taskEditing !== null) {
            this.setState({
                taskEditing: null
            })
        } else {
            this.setState({
                isDisplayAddForm: !this.state.isDisplayAddForm,
                taskEditing: null,
            })
        }
    }

    onSubmitTaskForm = (data) => {
        var { tasks } = this.state;

        if (data.id === '') {
            // add new
            data.id = this.generateRandomId();
            tasks.push(data);
        } else {
            // edit
            var index = this.findIndexById(data.id, this.state.tasks);
            tasks[index] = data;
        }

        this.setState({
            tasks: tasks,
            taskEditing: null
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    onCloseForm = () => {
        this.setState({
            isDisplayAddForm: false
        });
    }

    onOpenForm = () => {
        this.setState({
            isDisplayAddForm: true
        });
    }

    onUpdateItem = (taskId) => {
        var index = this.findIndexById(taskId, this.state.tasks);
        var taskEditing = this.state.tasks[index]
        this.setState({
            taskEditing: taskEditing
        });
        this.onOpenForm();
    }

    onChangeFilterValue = (filterData) => {
        this.setState({
            filter: {
                name: filterData.filterName,
                status: filterData.filterStatus
            }
        })
    }

    onDeleteItem = (taskId) => {
        var index = this.findIndexById(taskId, this.state.tasks);
        var tasks = this.state.tasks;
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onToggleStatus = (taskId) => {
        var index = this.findIndexById(taskId, this.state.tasks);
        var tasks = this.state.tasks;
        if (index !== -1) {
            tasks[index] = {
                ...tasks[index],
                status: !tasks[index].status
            }
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
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
        const { isDisplayAddForm, taskEditing, filter, keyword } = this.state;
        var { tasks } = this.state;

        /* START FILTER TASKS */
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return true;
                } else {
                    return task.status === (filter.status === 1);
                }
            });
        }
        /* END FILTER TASKS */

        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Work management</h1>
                </div>

                {/* add box */}
                <div className="row">
                    <div className={isDisplayAddForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <button className="btn btn-primary"
                                            onClick={this.toggleAddWorkForm}>
                                            Add work
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search & sort */}
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Control
                                    onSubmitSearch={this.onSubmitSearch} />
                            </div>
                        </div>

                        {/* list box */}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList
                                    onUpdateItem={this.onUpdateItem}
                                    onToggleStatus={this.onToggleStatus}
                                    onDeleteItem={this.onDeleteItem}
                                    tasks={tasks}
                                    onChangeFilterValue={this.onChangeFilterValue} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {isDisplayAddForm
                            ? <TaskForm
                                onSubmitTaskForm={this.onSubmitTaskForm}
                                onCloseForm={this.onCloseForm}
                                taskEditing={taskEditing} />
                            : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
