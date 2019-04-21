import React from 'react';

class TaskItem extends React.Component {
    onToggleStatus = () => {
        this.props.onToggleStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id);
    }

    render() {
        const { task, index } = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">

                    <span
                        className={`label ${task.status ? 'label-success' : 'label-default'}`}
                        onClick={this.onToggleStatus}>
                        {task.status ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td>
                    <button className="btn btn-warning" type="button">Edit</button>
                    &nbsp;&nbsp;

                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={this.onDeleteItem}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem