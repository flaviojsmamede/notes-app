import { useState } from "react";
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select"
import { Tag } from "./App";

type NoteListProps = {
  availableTags: Tag[]
}

export function NoteList( availableTags: NoteListProps ) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")

  return <>
    <Row className="align-items-center mb-4">
      <Col>
        <h1>Notes</h1>
      </Col>
      <Col xs="auto">
        <Stack gap={2} direction="horizontal">
          <Button variant="outline-secondary">Edit Tags</Button>
          <Link to="/new">
            <Button variant="primary">Create</Button>
          </Link>
        </Stack>
       </Col>
    </Row>
    <Form>
      <Row className="mb-4">
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)} />
          </Form.Group>
        </Col>
        <Col>
          <FormGroup controlId="tags">
            <Form.Label>Tags</Form.Label>
            <ReactSelect
              value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id}
                })}
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                  return { id: tag.value, label: tag.label }
                }))
              }}
              isMulti
            />
          </FormGroup>
    </Col>
      </Row>
    </Form>
  </>
}
