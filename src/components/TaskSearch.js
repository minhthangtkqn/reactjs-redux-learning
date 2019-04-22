import React from 'react';

class TaskSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChangeKeyword = (event) => {
        this.setState({
            keyword: event.target.value
        });
    }

    onSubmitSearch = (event) => {
        event.preventDefault();
        const keyword = this.state.keyword.toLowerCase();
        this.props.onSubmitSearch(keyword);
    }

    render() {
        const { keyword } = this.state;

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                    <form
                        className="input-group"
                        onSubmit={this.onSubmitSearch}>
                        <input
                            className="form-control"
                            name="keyword"
                            type="text"
                            value={keyword}
                            onChange={this.onChangeKeyword}
                            placeholder="Input keyword ..."
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Search</button>
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskSearch