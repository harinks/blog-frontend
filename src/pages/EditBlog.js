import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useUpdateBlogMutation } from '../services/appApi';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBlog.css';
import { useSelector } from 'react-redux';
import { ContentState } from 'draft-js';
import { convertFromHTML } from 'draft-js';
import { convertToRaw } from 'draft-js';
import draftjsToHtml from 'draftjs-to-html';

function EditBlog() {

  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const blogToEdit = blogs.find((blog) => blog._id == id);
  const [updateBlog, { isLoading, isSuccess }] = useUpdateBlogMutation();


  const [title, setTitle] = useState(blogToEdit.title);
  const [category, setCategory] = useState(blogToEdit.category);
  const [url] = useState(blogToEdit.image);
  const navigate = useNavigate();

  const contentDataState = ContentState.createFromBlockArray(convertFromHTML(blogToEdit.content));
  const editorDataState = EditorState.createWithContent(contentDataState)
  const [editorState, setEditorState] = useState(editorDataState);


  function handleEdit(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftjsToHtml(rawContentState);

    if(!title || !content || !category){
      return alert("Title and Content is Required");
    }
    updateBlog({ id, title, content, category })

  }

  function handleEditorChange(state) {
    setEditorState(state);
  }

  if (isLoading) {
    return (
      <div className='py-4'>
        <h1 className='text-center'>Editing your Blog...</h1>
      </div>
    )
  }
  if (isSuccess) {
    setTimeout(() => {
      navigate('/');
    }, 1000);

    return (
      <div className='py-4'>
        <h1 className='text-center'>Blog Edit is Success</h1>
      </div>
    )
  }


  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handleEdit}>
            <h2 className="my-4 text-center">Edit Blog</h2>
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
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category of blog"
                value={category}
                onChange={(e) => setCategory(e.target.value)}/>
            </Form.Group>

            <Button className="mb-4"
              variant="primary"
              type="submit">
              Edit Blog
            </Button>
          </Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center">
          {url && <img src={url} style={{ width: "100%", minHeight: "120vh", objectFit: "cover" }} />}
        </Col>
      </Row>
    </Container>
  )
}

export default EditBlog