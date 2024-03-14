import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export default async function Page() {
  return (
    <Row>
      <Col>
        <p>Posts go here</p>
        <ul>
          <li>
            <Link href="/posts/first-post">First Post</Link>
          </li>
          <li>
            <Link href="/posts/second-post">Second Post</Link>
          </li>
        </ul>
        <Link href="/">Home</Link>
      </Col>
    </Row>
  );
}
