import { Col, FormGroup, Row, Stack, Form } from "react-bootstrap";
import CreatetableReactSelect from "react-select/creatable";

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
              <CreatetableReactSelect isMulti/>
            </FormGroup>
          </Col>
        </Row>
      </Stack>
    </Form>
  )
}
