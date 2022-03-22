import React from 'react';
import { useGetSingleBlogQuery } from '../services/appApi';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

function SingleBlogPage() {

  const { id } = useParams();
  const { data: blog, isLoading, isError } = useGetSingleBlogQuery(id);

  if (isError) {
    return (
      <div>
        <h1 className="text-center">An Error has Occured</h1>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <Container>
      <Row>
        <Col md={11} style={{margin: "0 auto"}}>
          <img src={blog.image} style={{ width: "100%", maxHeight:"400px", objectFit: "cover" }} />
          <h1 className="my-2">{blog.title}</h1>
          <h4>By {blog.creater.name}</h4>
          <p>Category: {blog.category}</p>
          <div dangerouslySetInnerHTML={{__html: blog.content}}/>
        </Col>
      </Row>
    </Container>
  )
}

export default SingleBlogPage