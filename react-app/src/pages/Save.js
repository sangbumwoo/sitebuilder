import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import api from '../api';
import Config from '../Config';

class Save extends Component {
  state = { title: '', content: '', message: '' };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      api.get(`/board/${match.params.id}`)
        .then((res) => {
          // console.log('save res.data', res.data);
          const { title, content } = res.data;
          this.setState({ title, content });
        });
    }
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { match } = this.props;
    const { post } = this.state;
    const data = Object.assign({ type: match.params.boardId }, this.state);
    data.author = 'admin';
    data.datetime = new Date();
    if (data.title === '' || data.content === '') {
      alert('input not completed');
      return;
    }
    if (match.params.id) {
      api.put(`/board/${match.params.id}`, data).then(() => {
        this.goBack();
      });
    } else {
      api.post('/board', data)
        .then(() => {
          this.goBack();
        });
    }
  }

  handleEditorChange = (content) => {
    console.log('Content was updated:', content);
    // console.log('Content was updated:', e.target.getContent());
    this.setState({ content });
  }

  handleChange(field, e) {
    console.log('handleChange');
    this.setState({ [field]: e.target.value });
  }

  render() {
    // const { match } = this.props;
    const {
      title, content, message
    } = this.state;
    return (
      <div>

        <form onSubmit={this.handleSubmit}>

          <input className="w3-section w3-input w3-border" type="text" name="title" placeholder="Title" value={title} onChange={e => this.handleChange('title', e)} />

          <Editor
            initialValue={content}
            value={content}

            init={{
              plugins: 'code print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
              height: 100,
              image_advtab: true,
              images_upload_handler(blobInfo, success, failure) {
                const fd = new FormData();
                fd.append('file', blobInfo.blob());
                api.post('files/', fd, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then((res) => {
                  const url = `${Config.apiUrl}/files/${res.data.filename}`;
                  success(url);
                }, (err) => {
                  console.log('error', err);
                  failure('File upload error');
                });
              }
            }}
            onEditorChange={this.handleEditorChange}
          />
          { message && (
          <div className="w3-panel w3-red w3-display-container">
            <span
              onClick={() => this.setState({ message: '' })}
              className="w3-button w3-red w3-large w3-display-topright"
              role="presentation"
            >
                &times;
            </span>
            <p>
              MMMM
              {message}
            </p>
          </div>
          )}
          <div className="w3-panel">
            <button className="w3-right w3-button" type="submit">
            Send
            </button>
            <button className="w3-right w3-button" type="button" onClick={this.goBack}>
            Back
            </button>
          </div>
        </form>

        {/* <button type="button" onClick={this.add}>
          Save
        </button> */}

      </div>
    );
  }
}

Save.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(Save);
