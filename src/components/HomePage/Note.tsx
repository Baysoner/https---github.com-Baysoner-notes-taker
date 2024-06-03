import { Badge, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

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
            <Link to={`/home/${note.id}/edit`}>
              <button type="submit" className="btn btn-dark">
                Edit
              </button>
            </Link>
            <button
              onClick={() => {
                onDelete(note.id);
                navigate("..");
              }}
              type="submit"
              className="btn btn-outline-danger"
            >
              Delete
            </button>
            <Link to="..">
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
