"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaUserCircle, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../../Courses/client";
import type { User } from "../../../../Database";

export default function PeopleTable() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR" || currentUser?.role === "ADMIN";

  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "STUDENT",
    section: "",
    loginId: "",
  });

  const fetchUsers = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    try {
      const data = await client.findUsersForCourse(cid);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleShowModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        role: "STUDENT",
        section: "",
        loginId: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleSave = async () => {
    try {
      if (editingUser?.id) {
        await client.updateUser(editingUser.id, formData);
      } else {
        await client.createUser(formData);
      }
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await client.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div id="wd-people-table" className="p-5">
      {isFaculty && (
        <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
          <FaPlus className="me-2" /> Add User
        </Button>
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName} </span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
              {isFaculty && (
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(user)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.firstName || ""}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName || ""}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.username || ""}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                value={formData.loginId || ""}
                onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                value={formData.section || ""}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role || "STUDENT"}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as User["role"] })}
              >
                <option value="STUDENT">Student</option>
                <option value="INSTRUCTOR">Instructor</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingUser ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}