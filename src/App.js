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
            isDisplayAddForm: false
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
        this.setState({
            isDisplayAddForm: !this.state.isDisplayAddForm
        })
    }

    onSubmitTaskForm = (data) => {
        var task = {
            id: this.generateRandomId(),
            name: data.name,
            status: data.status
        }
        var tasks = this.state.tasks;
        tasks.push(task);
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onCloseForm = () => {
        this.setState({
            isDisplayAddForm: false
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

    render() {
        const { tasks, isDisplayAddForm } = this.state;

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
                                <Control />
                            </div>
                        </div>

                        {/* list box */}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList
                                    onToggleStatus={this.onToggleStatus}
                                    onDeleteItem={this.onDeleteItem}
                                    tasks={tasks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {isDisplayAddForm
                            ? <TaskForm
                                onSubmitTaskForm={this.onSubmitTaskForm}
                                onCloseForm={this.onCloseForm} />
                            : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
