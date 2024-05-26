import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      textarea: textareaRef.current!.value,
      tags: [],
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control ref={titleRef} required></Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <CreatableReactSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
          />
        </Form.Group>
        <Form.Group controlId="textarea">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={textareaRef} required as="textarea" rows={10} />
        </Form.Group>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-center"
        >
          <button type="submit" className="btn btn-dark">
            Save
          </button>
          <Link to="..">
            <button type="button" className="btn btn-outline-secondary">
              Cancel
            </button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
