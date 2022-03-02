import { useFormik } from "formik";
import { useEffect, useContext } from "react";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  fetchCreatePost,
  fetchDownloadPostFile,
  fetchPostsByClassroom,
} from "../../api/postApi";
import { AuthContext } from "../../contexts/authContext";
import { GrDocumentDownload } from "react-icons/gr";
import moment from "moment";
import { saveAs } from "file-saver";

const PostTab = ({ classroom }) => {
  const { posts, setPosts, user } = useContext(AuthContext);
  console.log("user -> ", user);
  useEffect(() => {
    const getPostsByClassroom = async (classroomID) => {
      let { data } = await fetchPostsByClassroom(classroomID);
      const currentPost = data.posts.posts;
      console.log("postlar -> ", currentPost);
      setPosts([...currentPost]);
    };
    getPostsByClassroom(classroom._id);
  }, [classroom, setPosts]);

  const downloadFile = async (filename) => {
    saveAs(fetchDownloadPostFile(filename), "myPhoto");
  };

  return (
    <>
      <CreatePostInputs classroom={classroom} />
      {posts.length === 0 && (
        <p className="fw-bold mt-2 text-center">There are no posts.</p>
      )}
      {posts.reverse().map((post) => (
        <Card className="mt-2" key={post._id}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Row>
              <Col>
                {post.file && (
                  <>
                    <Button size="sm" onClick={() => downloadFile(post.file)}>
                      <GrDocumentDownload className="me-2" />
                      click to download document
                    </Button>
                  </>
                )}
              </Col>
              <Col className=" text-end">
                {post.author.name} {post.author.lastname}
                <span className="ms-2">|</span>
                <span className="ms-2">
                  {moment(post.createdAt).format("DD-MM-YYYY")}
                </span>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
};

export default PostTab;

const CreatePostInputs = ({ classroom }) => {
  const formData = new FormData();
  const { posts, setPosts } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      post_file: null,
    },
    onSubmit: async (values, bag) => {
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("post_file", values.post_file);

      await fetchCreatePost(classroom._id, formData);
      const { data } = await fetchPostsByClassroom(classroom._id);
      const currentPost = data.posts.posts;
      setPosts([...currentPost]);
    },
  });

  const handleChangeFile = (e) => {
    formik.setFieldValue("post_file", e.target.files[0]);
  };

  return (
    <Accordion defaultActiveKey={0} className="mt-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Create Post</Accordion.Header>
        <Accordion.Body>
          {/* Form */}
          <Form
            className="px-5"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            {/* Title */}
            <Form.Group className="mt-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                name="title"
              />
            </Form.Group>
            {/* Content */}
            <Form.Group className="mt-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                as="textarea"
                rows={2}
                type="text"
                name="content"
              />
            </Form.Group>
            {/* File */}
            <Form.Group controlId="post_file" className="mb-3 mt-2">
              <Form.Label>File Upload</Form.Label>
              <Form.Control
                onChange={handleChangeFile}
                type="file"
                name="post_file"
                aria-label="Upload"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button size="sm" type="submit">
                Send
              </Button>
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
