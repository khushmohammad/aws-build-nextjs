import React from "react";
import Default from "../../layouts/default";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

const comingsoon = () => {
  return (
    <Default>
      <div className="py-5 text-center flex-col h-screen overflow-hidden">
        <h1 className="mb-3">Coming Soon</h1>
        <p className="lead mb-4">
          We're working hard to bring you something amazing. Stay tuned for
          updates!
        </p>

        <Link
          className={`${location.pathname === "/" ? "active" : ""} nav-link `}
          aria-current="page"
          // href="/birthday"
          href="/"
        >
          <Button variant="primary" size="lg">
            Back to main page
          </Button>
        </Link>
      </div>
    </Default>
  );
};

export default comingsoon;
