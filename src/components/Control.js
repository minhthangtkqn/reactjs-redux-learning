import React from 'react';
import Sort from './Sort';
import Search from './Search';

class Control extends React.Component {
    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-body">
                    {/* Search */}
                    <Search/>

                    {/* Sort */}
                    <Sort/>
                </div>
            </div>
        );
    }
}

export default Control