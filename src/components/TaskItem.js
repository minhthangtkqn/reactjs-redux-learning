import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TaskItem extends React.Component {
    onToggleTaskStatus = () => {
        this.props.onToggleTaskStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id);
        this.props.onCloseForm();
    }

    onUpdateItem = () => {
        this.props.onUpdateItem(this.props.task.id);
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
                        onClick={this.onToggleTaskStatus}>
                        {task.status ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td>
                    <button
                        className="btn btn-warning"
                        onClick={this.onUpdateItem}
                        type="button">
                        Edit
                    </button>
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

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleTaskStatus: (id) => {
            dispatch(actions.onToggleTaskStatus(id));
        },
        onDeleteItem: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.onCloseForm());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskItem)