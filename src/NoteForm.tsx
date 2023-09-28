import { Col, FormGroup, Row, Stack, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { FormEvent, useRef, useState } from "react";

type NoteFormProps = {
  onSubmit: (note: NoteData) => void
}

export function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: []
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatetableReactSelect
              value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id}
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
        <FormGroup controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" ref={markdownRef} rows={15}/>
        </FormGroup>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-danger">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
