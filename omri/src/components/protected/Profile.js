import React, { Component } from 'react'
import { storageRef } from '../../config/constants'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card>
        <CardImg top width="30%" src="https://preview.ibb.co/g2cqfw/20247542_10213635861200618_8015154878385438586_o_1.jpg" alt="" />
        <CardBody>
          <CardTitle>Omri Cohen</CardTitle>
          <CardSubtitle>Moments Ambassador</CardSubtitle>
          <CardText>Omri is a senior at Rochester majoring in Business.</CardText>
          <Button color="primary">Edit Profile</Button>
        </CardBody>
      </Card>
      </div>
    )
  }
}

module.exports = Profile;