import React from 'react'

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            status: false
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
        })
    }

    render() {
        const { name, status } = this.state;

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Add work
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
                                onClick={this.onClearForm}
                                >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default TaskForm