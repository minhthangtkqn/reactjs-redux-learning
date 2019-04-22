import React from 'react';
import TaskSort from './TaskSort';
import TaskSearch from './TaskSearch';

class TaskControl extends React.Component {

    onSubmitSearch = (keyword) => {
        this.props.onSubmitSearch(keyword)
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-body">
                    {/* Search */}
                    <TaskSearch
                        onSubmitSearch={this.onSubmitSearch} />

                    {/* Sort */}
                    <TaskSort />
                </div>
            </div>
        );
    }
}

export default TaskControl