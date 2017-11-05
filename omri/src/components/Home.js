import React, { Component } from 'react'
import { storageRef } from '../config/constants'
import { Jumbotron, Button } from 'reactstrap';

export default class Home extends Component {

  constructor(props) {
    super(props);

    storageRef.child('HomepageImages').child('SantaCruzHouse.jpg').getDownloadURL().then(function(url) {
      document.getElementById("Jumbotron").src = url;
    }).catch(function(error) {
      switch (error.code) {
        case 'storage/object_not_found':
          console.log('File doesn\'t exist');
          break;

        case 'storage/unauthorized':
          console.log('User doesn\'t have permission to access the object');
          break;

        case 'storage/canceled':
          console.log('User canceled the upload');
          break;

        case 'storage/unknown':
          console.log('User canceled the upload');
          break;
        default:
          console.log('Succeeded loading image');
          break;
      }
    });
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Moments</h1>
          <p className="lead">Connecting people through the meaningful moments in our lives.</p>
          <hr className="my-2" />
          <p>Sign up today to start sharing.</p>
          <p className="lead">
            <Button href="/Register" color="primary">Sign Up</Button>
          </p>
      </Jumbotron>
      </div>
    )
  }
}