import { Col, FormGroup, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export function NoteForm() {
  return (
    <Form>
      <Stack gap={3}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control required />
            </FormGroup>
          </Col>
        </Row>
      </Stack>
    </Form>
  )
}
