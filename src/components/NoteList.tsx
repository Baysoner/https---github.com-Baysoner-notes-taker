import { useMemo, useState } from "react";
import { Badge, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect, { components } from "react-select";
import { Note, Tag } from "../App";
import styles from "../styles/NoteList.module.css";

type NoteListProps = {
  avaliableTags: Tag[];
  notes: Note[];
};

type SimpleNote = {
  tags: Tag[];
  title: string;
  id: string;
};

export function NoteList({ avaliableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<Tag[]>(avaliableTags);

  // Function to delete tag from localStorage
  const deleteTagFromLocalStorage = (tagToDelete: Tag) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagToDelete.id);
    setTags(updatedTags);
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagToDelete.id));
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  const handleTagDelete = (tagToDelete: Tag) => {
    deleteTagFromLocalStorage(tagToDelete);
  };

  const CustomMultiValue = (props: any) => {
    return (
      <components.MultiValue {...props}>
        {props.children}
        <button
          type="button"
          onClick={() =>
            handleTagDelete({ label: props.data.label, id: props.data.value })
          }
          style={{
            marginLeft: "8px",
            cursor: "pointer",
            border: "none",
            background: "transparent",
          }}
        >
          &times;
        </button>
      </components.MultiValue>
    );
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <button type="submit" className="btn btn-dark">
                Create
              </button>
            </Link>
            <button type="submit" className="btn btn-outline-secondary">
              Edit Tags
            </button>
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={tags.map((tag) => {
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
                components={{ MultiValue: CustomMultiValue }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function NoteCard({ id, title, tags }: SimpleNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
