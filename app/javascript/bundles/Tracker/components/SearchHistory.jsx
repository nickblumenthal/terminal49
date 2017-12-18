import PropTypes from 'prop-types'
import React, {Component} from 'react'

import {Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class SearchHistory extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.user.get('isLoggedIn') == false && this.props.user.get('isLoggedIn') == true) {
      this.props.fetchSearchHistory()
    }
  }

  renderSearches = () => {
    const searches = this.props.user.get('searchHistory');
    return searches.map((search) => {
      return(
          <Dropdown.Item>
            <Link to={`/bookings/${search.get('search')}`}>{search.get('search')}</Link>
          </Dropdown.Item>
      )
    })
  };

  render() {
    if(!this.props.user.get('isLoggedIn')) {
      return(
          <div></div>
      )
    }

    return(
        <Dropdown text="Search History">
          <Dropdown.Menu>
            <Dropdown.Item>
              <div onClick={this.props.sendClearSearchHistory}>Clear All</div>
            </Dropdown.Item>
            {this.renderSearches()}
          </Dropdown.Menu>
        </Dropdown>
    )
  }
}
