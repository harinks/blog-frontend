import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

function MainBlog({blog}) {

    const {title, image, content, _id} = blog;
  return (
    <Row className="pb-4">
        <Col md={6} className="mainBlog__image">
            <img src={image} style={{width: "100%", maxHeight: 300, objectFit: "cover" }} />
        </Col>
        <Col md={6}>
            <h2 className="my-2">{title}</h2>
            <div className="my-2" dangerouslySetInnerHTML={{__html: content?.substring(0, 500) + "..." }} />
            <LinkContainer to={`/blogs/${_id}`}>
                <Button variant="info">Read More</Button>
            </LinkContainer>
        </Col>
    </Row>
  )
}

export default MainBlog