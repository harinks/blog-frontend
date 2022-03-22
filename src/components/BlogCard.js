import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import upload from '../images/upload.jpg';
import { useDeleteBlogMutation } from '../services/appApi';

function BlogCard({ blog, currentUserBlog }) {

    const { title, image, content, _id } = blog;
    const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

    function handleDelete() {
        deleteBlog(_id);
    }

    return (
        <Card style={{ width: "16rem" }}>
            <Card.Img variant="top" src={image || upload} style={{ maxHeight: 200, objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: content?.substring(0, 100) + "..." }} />
                </Card.Text>
                <ButtonGroup>
                    <LinkContainer to={`/blogs/${_id}`}>
                        <Button variant="info">View</Button>
                    </LinkContainer>
                    {currentUserBlog && (
                        <>
                            <LinkContainer to={`/blogs/${_id}/edit`} >
                                <Button variant="outline-primary" >Edit</Button>
                            </LinkContainer>
                            <Button variant="outline-danger" onClick={handleDelete}>
                                {isLoading ? "Deleting...": "Delete"}
                            </Button>
                        </>
                    )}
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default BlogCard