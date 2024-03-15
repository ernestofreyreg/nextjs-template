"use client";

import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import gravatar from "gravatar";

export function Navigation({ session }) {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    queryClient.removeQueries();
    await supabase.auth.signOut();
    router.refresh();
  };

  const gravatarUrl = gravatar.url(session?.user?.email);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" as={Link}>
          Supademo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/companies" as={Link}>
              Companies
            </Nav.Link>
          </Nav>
          {session && (
            <Nav>
              <NavDropdown
                title={
                  <Image
                    src={gravatarUrl}
                    roundedCircle
                    width={30}
                    height={30}
                    alt="User profile picture"
                  />
                }
                drop="down"
                align="end"
              >
                <NavDropdown.Item href="/notifications">
                  Notifications
                </NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
