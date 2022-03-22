import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftjsToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useCreateBlogMutation } from '../services/appApi';
import upload from '../images/upload.jpg';
import './CreateBlog.css';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const navigate = useNavigate();

  const [createBlog, { isLoading, isSuccess }] = useCreateBlogMutation();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  function handlePublish(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftjsToHtml(rawContentState);
    if (!title || !image || !content) {
      return alert("Title, Content and Image required");
    }

    //create blog
    createBlog({ title, content, image: url, category })
  }

  function handleEditorChange(state) {
    setEditorState(state);
  }

  function uploadImage(e) {
    e.preventDefault();
    if (!image) return;
    setUrl("");
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'uy8h4hgz');
    setUploadingImg(true);
    fetch(
      'https://api.cloudinary.com/v1_1/dbhomeqpf/image/upload', {
      method: 'post',
      body: data
    }).then((res) => res.json())
      .then((data) => {
        setUploadingImg(false);
        setUrl(data.url);
      }).catch(err => {
        setUploadingImg(false);
        console.log(err);
      })
  }

  function handleImageValidation(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      setImage(null);
      return alert("File is too big, Please upload images 1MB or less");
    } else {
      setImage(file);
    }
  }

  if (isLoading) {
    return (
      <div className='py-4'>
        <h1 className='text-center'>Creating your Blog...</h1>
      </div>
    )
  }
  if (isSuccess) {
    setTimeout(() => {
      navigate('/');
    }, 1000);

    return (
      <div className='py-4'>
        <h1 className='text-center'>Blog Created Success</h1>
      </div>
    )
  }


  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handlePublish}>
            <h2 className="my-4 text-center">Create Blog</h2>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title of Blog"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Editor
              stripPastedStyles={true}
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper mb-4"
              editorClassName="editor"
              toolbarClassName="toolbar" />

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Category of blog"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}/>
            </Form.Group>

            <div>
              {!url && <p className="alert alert-info">Please upload an image and size of image should be less than 1MB</p>}
            </div>
            <div className="my-4">
              <input
                type="file"
                onChange={handleImageValidation}
                accept="image/png, image/jpeg" />

              <Button
                onClick={uploadImage}
                disabled={uploadingImg || !image}>Upload Image</Button>
            </div>

            <Button className="mb-4"
              variant="primary"
              type="submit" disabled={uploadingImg || !url}>
              Create Blog
            </Button>
          </Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center">
          {uploadingImg && (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <br />
              <p className="py-2">Uploading Image</p>
            </div>
          )}
          <div>
            {!url && !uploadingImg && <img src={upload} style={{ width: "100%", minHeight: "120vh", objectFit: "cover" }} />}
          </div>
          {url && <img src={url} style={{ width: "100%", minHeight: "120vh", objectFit: "cover" }} />}
        </Col>
      </Row>
    </Container>
  )
}

export default CreateBlog