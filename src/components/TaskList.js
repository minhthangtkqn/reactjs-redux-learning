import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // all: -1  ||  active: 1  ||  inactive: 0
        };
    }

    onChangeFilterValue = (event) => {
        const name = event.target.name;
        var value = event.target.value;

        if (name === 'filterStatus') {
            value = Number(value)
        } else {
            value = value.toLowerCase();
        }

        this.setState({
            [name]: value
        });

        this.props.onChangeFilterValue({
            filterName: name === 'filterName' ? value : this.state.filterName,
            filterStatus: name === 'filterStatus' ? value : this.state.filterStatus
        })
    }

    render() {
        const { tasks } = this.props;
        const elementTasks = tasks.map((task, index) => {
            return <TaskItem
                key={index}
                index={index}
                task={task}
                onUpdateItem={this.props.onUpdateItem}
            />
        })

        const { filterName, filterStatus } = this.state;

        return (
            <div className="panel panel-warning">
                <table border="1" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="filterName"
                                    value={filterName}
                                    onChange={this.onChangeFilterValue} />
                            </td>
                            <td>
                                <select
                                    className="form-control"
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={this.onChangeFilterValue}>
                                    <option value={-1}>All</option>
                                    <option value={0}>Inactive</option>
                                    <option value={1}>Active</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>

                        {elementTasks}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(
    mapStateToProps,
    null
)(TaskList)