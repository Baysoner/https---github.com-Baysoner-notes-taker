import { Col, Form, Row, Stack } from "react-bootstrap";

import CreatableReactSelect from "react-select/creatable";

export function NoteForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control required></Form.Control>
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Tags</Form.Label>
          <CreatableReactSelect isMulti />
        </Form.Group>
      </Stack>
    </Form>
  );
}
