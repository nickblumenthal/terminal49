import PropTypes from 'prop-types'
import React from 'react'
import {Card, Grid, Header} from 'semantic-ui-react'

const ContainerDetails = ({containers}) => {
  const renderContainers = (containers) => {
    return (
        <Card>
          <Card.Header>
            hi
          </Card.Header>
        </Card>
    )
  };

  return (
      <Card.Group>
        {renderContainers(containers)}
      </Card.Group>
  )
};

ContainerDetails.propTypes = {
  containers: PropTypes.array.isRequired
};

export default ContainerDetails
