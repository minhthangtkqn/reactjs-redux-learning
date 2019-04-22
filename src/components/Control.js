import React from 'react';
import Sort from './Sort';
import Search from './Search';

class Control extends React.Component {

    onSubmitSearch = (keyword) => {
        this.props.onSubmitSearch(keyword)
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-body">
                    {/* Search */}
                    <Search
                        onSubmitSearch={this.onSubmitSearch} />

                    {/* Sort */}
                    <Sort />
                </div>
            </div>
        );
    }
}

export default Control