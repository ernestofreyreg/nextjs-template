import { Button, Col, Row } from "react-bootstrap";

export function Jumbotron({ onClick }) {
  return (
    <Row>
      <Col>
        <h1>Here</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
          tenetur magni veniam eos provident commodi dolore molestias, molestiae
          nemo ab rem? Numquam, totam accusamus! Fugiat aspernatur id voluptas
          omnis facere!
        </p>
        <Button variant="primary" onClick={onClick}>
          CTA
        </Button>
      </Col>
    </Row>
  );
}
