import React from 'react'
import { Col, Container, Row, Spinner, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BlogCard from '../components/BlogCard';
import MainBlog from '../components/MainBlog';
import { useGetAllBlogsQuery } from '../services/appApi'

function Home() {

  const { data: blogs, isLoading, isError } = useGetAllBlogsQuery();
  const sidebarArticles = blogs?.slice(0, 4) || [];

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
    <Container className="my-5 justify-content-center">
      <div className="banner">
        <h1 className="banner__title text-center">The MERN Blog</h1>
      </div>
      <Row className="my-5">

        <MainBlog blog={blogs[blogs.length - 1]} />
        <Col md={9} className="blog_main d-flex pb-4 flex-wrap gap-4 my-5">
          {blogs.map((blog, index) => (
             <BlogCard blog={blog} key={index} />
          ))}
        </Col>

        <Col md={3} className="blog_sidebar py-3 my-5">
          <ListGroup variant="flush">
            <h2>Latest Blogs</h2>
            {sidebarArticles.map((blog, index) => (
              <LinkContainer to={`/blogs/${blog._id}`} key={index}>
                <ListGroup.Item>{blog.title}</ListGroup.Item>
              </LinkContainer>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Home