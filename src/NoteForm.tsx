import { Col, FormGroup, Row, Stack, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { FormEvent, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
  onSubmit: (note: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    })

    navigate("..")
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
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])

                }}
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
        <FormGroup controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" ref={markdownRef} rows={15}/>
        </FormGroup>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Link to="..">
            <Button type="button" variant="outline-danger">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary">Save</Button>
        </Stack>
      </Stack>
    </Form>
  )
}
