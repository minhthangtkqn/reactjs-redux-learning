import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

/**
 * INPUT: props.taskEditing
 * OUTPUT: state
 */

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentWillMount() {
        if (this.props.taskEditing && this.props.taskEditing.id !== '') {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
        } else {
            this.onClearForm();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.taskEditing) {
                this.setState({
                    id: nextProps.taskEditing.id,
                    name: nextProps.taskEditing.name,
                    status: nextProps.taskEditing.status
                });
            } else {
                this.onClearForm();
            }
        }
    }

    onInputChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        if (name === 'status') {
            value = value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onSubmitTaskForm = (event) => {
        event.preventDefault();
        this.props.onSubmitTaskForm(this.state);
        this.onClearForm();
        this.onCloseForm();
    }

    onClearForm = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        const { name, status, id } = this.state;

        if (!this.props.isDisplayForm)
            return '';

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== '' ? 'Update work' : 'Add work'}
                        <span onClick={this.props.onCloseForm} className="fa fa-times-circle text-right" />
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmitTaskForm}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status: </label>
                            <select
                                name="status"
                                className="form-control"
                                value={status}
                                onChange={this.onInputChange}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>
                        <div>
                            <button className="btn btn-warning" type="submit">Save</button>
                            &nbsp;&nbsp;
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={this.onClearForm}>
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskEditing: state.taskEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmitTaskForm: (task) => {
            if (task.id === '') {
                dispatch(actions.addTask(task));
            } else {
                dispatch(actions.updateTask(task));
            }
            dispatch(actions.updateEditingTask(null));
        },
        updateEditingTask: (task) => {
            dispatch(actions.updateEditingTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.onCloseForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)