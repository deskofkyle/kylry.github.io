import React, {View} from 'react'

export default class Moment extends React.Component {
  render() {
    var moment = this.props.moment;
    return (
      <View>
        <Image uri={moment.author} />
        <Text>{moment.body}</Text>
      </View>
    );
  }
}

module.exports = Moment;