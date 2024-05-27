import { Badge, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export function Note() {
  const note = useNote();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <button type="submit" className="btn btn-dark">
                Edit
              </button>
            </Link>
            <button type="submit" className="btn btn-outline-danger">
              Delete
            </button>
            <Link to="/">
              <button type="submit" className="btn btn-outline-secondary">
                Back
              </button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.textarea}</ReactMarkdown>
    </>
  );
}
