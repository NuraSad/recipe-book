import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBarCustom() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Recipe Book</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/recipes/list">Recipes</Nav.Link>
          <Nav.Link href="/recipes/create">Add Recipe</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarCustom;
