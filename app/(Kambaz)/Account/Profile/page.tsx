'use client';

import React from 'react';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-5">
      <h1>Profile</h1>

      <Form>
        <Form.Group className="mb-3" controlId="wd-profile-username">
          <Form.Control type="text" defaultValue="aliceuser" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-profile-password">
          <Form.Control type="text" defaultValue="12345" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-profile-name">
          <Form.Control type="text" defaultValue="Alice" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-profile-lastname">
          <Form.Control type="text" defaultValue="Wonderland" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-profile-email">
          <Form.Control type="text" defaultValue="wonderland.a@northeastern.edu" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-profile-dob">
          <Form.Control type="date" defaultValue="08/01/2005" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-profile-type">
          <Form.Control type="text" defaultValue="User" />
        </Form.Group>

        <Link
          id="wd-sign-btn"
          href="/Account/Profile"
          className="btn btn-danger w-100 mb-2">
          Signout
        </Link>
      </Form>
    </div>
  );
}