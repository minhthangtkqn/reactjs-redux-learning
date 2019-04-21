import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
    render() {
        const { tasks } = this.props;
        const elementTasks = tasks.map((task, index) => {
            return <TaskItem
                key={index}
                index={index}
                task={task}
                onToggleStatus={this.props.onToggleStatus}
                onDeleteItem={this.props.onDeleteItem}
            />
        })

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
                                />
                            </td>
                            <td>
                                <select className="form-control">
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

export default TaskList