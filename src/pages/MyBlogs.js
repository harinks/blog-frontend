import React from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BlogCard from '../components/BlogCard';
import { useGetUserBlogsQuery } from '../services/appApi'

function MyBlogs() {

  const { data: userBlogs, isLoading, isError } = useGetUserBlogsQuery();

  if (isError) {
    return (
      <div>
        <h1 className="d-flex justify-content-center py-5">An Error has Occured</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (userBlogs.length === 0) {
    return (
      <div className='py-5 text-center'>
        <h1 className="text-center mb-5">You Don't have Blogs yet.</h1>
        <LinkContainer to='/create-blog'>
          <Button>Create New Blog</Button>
        </LinkContainer>
      </div>
    );
  }

  return (
    <Container className="my-3">
      <div className="text-center">
        <h1 className="text-center mb-3">My Blogs</h1>
        <LinkContainer to='/create-blog'>
          <Button>Create New Blog</Button>
        </LinkContainer>
      </div>
      <Row>
        <Col md={12} className="d-flex justify-content-center flex-wrap gap-4 my-4">
          {userBlogs.map((blog, index) => (
            <BlogCard blog={blog} key={index} currentUserBlog={ true } />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default MyBlogs