import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { FaRobot, FaCheck, FaTimes, FaClock, FaInfoCircle, FaChartLine } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const AgentReviewQueue = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviewQueue();
    fetchStats();
  }, []);

  const fetchReviewQueue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/v1/agent/review-queue`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: 'pending' }
      });
      setReviewItems(response.data.items || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching review queue:', err);
      setError('Failed to load review queue');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/v1/agent/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleReview = (item, decision) => {
    setSelectedItem({ ...item, decision });
    setShowModal(true);
  };

  const submitReview = async () => {
    if (!selectedItem) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/v1/agent/review-queue/${selectedItem.id}/review`,
        {
          decision: selectedItem.decision,
          feedback: feedback || undefined
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Remove reviewed item from list
      setReviewItems(items => items.filter(i => i.id !== selectedItem.id));

      // Refresh stats
      fetchStats();

      // Close modal
      setShowModal(false);
      setFeedback('');
      setSelectedItem(null);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'info'
    };
    return <Badge bg={variants[priority] || 'secondary'}>{priority || 'medium'}</Badge>;
  };

  const getConfidenceBadge = (score) => {
    if (score >= 0.9) return <Badge bg="success">High Confidence</Badge>;
    if (score >= 0.7) return <Badge bg="warning">Medium Confidence</Badge>;
    return <Badge bg="danger">Low Confidence</Badge>;
  };

  const getAgentTypeBadge = (agentType) => {
    const labels = {
      receptionist: 'AI Receptionist',
      pipeline_ops: 'Pipeline Ops',
      data_reconciliation: 'Data Reconciliation',
      portfolio: 'Portfolio Agent',
      coach: 'Coach Agent'
    };
    return <Badge bg="primary"><FaRobot /> {labels[agentType] || agentType}</Badge>;
  };

  if (loading && reviewItems.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading review queue...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2><FaRobot /> Agent Review Queue</h2>
          <p className="text-muted">Review and approve AI agent actions</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      {stats && (
        <Row className="mb-4">
          <Col md={3}>
            <Card bg="light">
              <Card.Body>
                <Card.Title className="h6">Pending Reviews</Card.Title>
                <h3>{stats.reviews?.pending || 0}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="light">
              <Card.Body>
                <Card.Title className="h6">Active Workflows</Card.Title>
                <h3>{stats.workflows?.active || 0}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="light">
              <Card.Body>
                <Card.Title className="h6">Completed Today</Card.Title>
                <h3>{stats.workflows?.completed || 0}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="light">
              <Card.Body>
                <Card.Title className="h6">Total Actions</Card.Title>
                <h3>{stats.actions?.total || 0}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Review Items */}
      {reviewItems.length === 0 ? (
        <Card>
          <Card.Body className="text-center text-muted py-5">
            <FaCheck size={48} className="mb-3" />
            <h4>All Caught Up!</h4>
            <p>No pending agent actions to review</p>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {reviewItems.map(item => (
            <Col md={12} key={item.id} className="mb-3">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    {getAgentTypeBadge(item.agent_type)}
                    {' '}
                    {getPriorityBadge(item.priority)}
                    {' '}
                    {getConfidenceBadge(item.confidence_score)}
                  </div>
                  <small className="text-muted">
                    <FaClock /> {new Date(item.created_at).toLocaleString()}
                  </small>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>

                  {/* Proposed Action */}
                  <div className="mb-3">
                    <strong><FaInfoCircle /> Proposed Action:</strong>
                    <pre className="bg-light p-2 mt-2 rounded" style={{ fontSize: '0.9em' }}>
                      {JSON.stringify(item.proposed_action, null, 2)}
                    </pre>
                  </div>

                  {/* Context */}
                  {item.context && Object.keys(item.context).length > 0 && (
                    <div className="mb-3">
                      <strong>Context:</strong>
                      <pre className="bg-light p-2 mt-2 rounded" style={{ fontSize: '0.9em' }}>
                        {JSON.stringify(item.context, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      onClick={() => handleReview(item, 'approve')}
                    >
                      <FaCheck /> Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleReview(item, 'reject')}
                    >
                      <FaTimes /> Reject
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted small">
                  Workflow ID: {item.workflow_id} | Item ID: {item.id}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem?.decision === 'approve' ? (
              <><FaCheck className="text-success" /> Approve Action</>
            ) : (
              <><FaTimes className="text-danger" /> Reject Action</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{selectedItem?.title}</strong></p>
          <p className="text-muted">{selectedItem?.description}</p>

          <Form.Group className="mb-3">
            <Form.Label>Feedback (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add any notes or feedback for the AI system..."
            />
            <Form.Text className="text-muted">
              Your feedback helps improve agent performance
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant={selectedItem?.decision === 'approve' ? 'success' : 'danger'}
            onClick={submitReview}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" /> Processing...
              </>
            ) : (
              <>
                {selectedItem?.decision === 'approve' ? (
                  <><FaCheck /> Confirm Approval</>
                ) : (
                  <><FaTimes /> Confirm Rejection</>
                )}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AgentReviewQueue;
