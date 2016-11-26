'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class TodoSearch extends React.Component {
    render () {
        const { dispatch, showCompleted, searchText } = this.props;
        
        const newSearch = () => {
            const newSearchText = this.refs.searchText.value;
            dispatch(actions.setSearchText(newSearchText));
        };

        return (
            <div className="container__header">
                <div>
                    <input type="search" ref="searchText" placeholder="Search todos" value={ searchText } onChange={ newSearch } />
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" checked={ showCompleted } onChange={ () => dispatch(actions.toggleShowCompleted()) } />
                        Show completed todos
                    </label>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            showCompleted: state.showCompleted,
            searchText: state.searchText
        };
    }
)(TodoSearch);