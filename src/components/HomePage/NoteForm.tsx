import { FormEvent, useRef, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./Home";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  textarea = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      textarea: textareaRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={titleRef}
            defaultValue={title}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <CreatableReactSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
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
          <Form.Control
            defaultValue={textarea}
            ref={textareaRef}
            required
            as="textarea"
            rows={10}
          />
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
