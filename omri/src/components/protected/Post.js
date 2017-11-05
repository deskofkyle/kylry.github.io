import React, { Component } from 'react'
import { saveMoment } from '../../helpers/moments'
import { getUser } from '../../helpers/auth'
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js'

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};


export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }

  handleSubmit(event) {
    event.preventDefault();
    var blockArray = this.state.editorState.getCurrentContent().getBlocksAsArray();
    var text = "";
    for (var i = 0; i < blockArray.length; i++) {
      text += blockArray[i].getText();
    }
    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
    this.setState({editorState});
    saveMoment(getUser().uid, text);
  }

  render() {
    return (
      <div id="content">
        <h1>Write a post</h1>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <form onSubmit={this.handleSubmit}>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
          <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}