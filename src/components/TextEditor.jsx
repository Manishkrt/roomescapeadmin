import React, { useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TextEditor({ value, onChange }) {
  const [quillEditor, setQuillEditor] = useState(null);
  const [activeFormats, setActiveFormats] = useState({});
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    if (quillEditor) {
      setModalContent(quillEditor.root.innerHTML);
    }
    setShow(true);
  };

  useEffect(() => {
    if (quillEditor && value !== quillEditor.root.innerHTML) {
      const selection = quillEditor.getSelection();
      quillEditor.clipboard.dangerouslyPasteHTML(value);
      if (selection) {
        quillEditor.setSelection(selection);
      }
    }
  }, [value, quillEditor]);

  const initializeQuill = (ref) => {
    if (ref && !quillEditor) {
      const editor = new Quill(ref, {
        theme: "snow",
        modules: {
          toolbar: false,
          clipboard: { matchVisual: false },
        },
      });

      editor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        delta.ops = delta.ops.map((op) => {
          if (op.attributes) {
            delete op.attributes.background;
            delete op.attributes.color;
          }
          return op;
        });
        return delta;
      });

      editor.on("text-change", () => {
        setActiveFormats(editor.getFormat());
        onChange(editor.root.innerHTML);
      });

      setQuillEditor(editor);
    }
  };

  const toggleFormat = (format, event) => {
    event.preventDefault();
    if (!quillEditor) return;
    const isActive = activeFormats[format];
    quillEditor.format(format, !isActive);
  };

  const handleListFormat = (listType, event) => {
    event.preventDefault();
    if (!quillEditor) return;
    const isActive = activeFormats.list === listType;
    quillEditor.format("list", isActive ? false : listType);
  };

  const handleHeading = (event) => {
    if (!quillEditor) return;
    const level = event.target.value;
    quillEditor.format("header", level === "normal" ? false : Number(level));
  };

  const handleFontFamily = (event) => {
    if (!quillEditor) return;
    const font = event.target.value;
    quillEditor.format("font", font === "normal" ? false : font);
  };

  const handleModalChange = (event) => {
    setModalContent(event.target.value);
  };

  const handleSaveChanges = () => {
    if (quillEditor) {
      quillEditor.root.innerHTML = modalContent;
      onChange(modalContent);
    }
    handleClose();
  };

  return (
    <div className="mb-3">
      {/* Custom Toolbar */}
      <div className="d-flex flex-wrap border bg-light rounded-top p-2 align-items-center gap-2">
        <button
          className={`btn btn-outline-secondary ${
            activeFormats.bold ? "active" : ""
          }`}
          onClick={(event) => toggleFormat("bold", event)}
        >
          <i className="fa-solid fa-bold"></i>
        </button>
        <button
          className={`btn btn-outline-secondary ${
            activeFormats.italic ? "active" : ""
          }`}
          onClick={(event) => toggleFormat("italic", event)}
        >
          <i className="fa-solid fa-italic"></i>
        </button>
        <button
          className={`btn btn-outline-secondary ${
            activeFormats.strike ? "active" : ""
          }`}
          onClick={(event) => toggleFormat("strike", event)}
        >
          <i className="fa-solid fa-strikethrough"></i>
        </button>
        <button
          className={`btn btn-outline-secondary ${
            activeFormats.underline ? "active" : ""
          }`}
          onClick={(event) => toggleFormat("underline", event)}
        >
          <i className="fa-solid fa-underline"></i>
        </button>
        <button
          className={`btn btn-outline-secondary ${
            activeFormats.list === "bullet" ? "active" : ""
          }`}
          onClick={(event) => handleListFormat("bullet", event)}
        >
          <i className="fa-solid fa-list"></i>
        </button>
        <button
          className={`btn btn-outline-secondary ${
            activeFormats.list === "ordered" ? "active" : ""
          }`}
          onClick={(event) => handleListFormat("ordered", event)}
        >
          <i className="fa-solid fa-list-ol"></i>
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={(e) => handleShow(e)}
        >
          <i className="fa-solid fa-code"></i>
        </button>

        <div className="d-flex gap-2">
          {/* Heading Dropdown */}
          <Form.Select onChange={handleHeading} aria-label="Heading">
            <option>Heading</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="normal">Normal</option>
          </Form.Select>
          {/* Font Family Dropdown */}
          <Form.Select onChange={handleFontFamily} aria-label="Font">
            <option>Font</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="normal">Normal</option>
          </Form.Select>
        </div>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Editor Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={10}
            value={modalContent}
            onChange={handleModalChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Quill Editor */}
      <div
        ref={initializeQuill}
        className="border p-2"
        style={{ height: "200px" }}
      />
    </div>
  );
}

export default TextEditor;
