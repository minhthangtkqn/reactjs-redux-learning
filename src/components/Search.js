import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                    <div className="input-group">
                        <input
                            className="form-control"
                            name="keyword"
                            type="text"
                            placeholder="Input keyword ..."
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button">Search</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search