<?php

require_once '../config/database.php';
require_once '../models/Evaluation.php';

class EvaluationController
{
    private $pdo;

    public function __construct(){
        $db = new Database();
        $this->pdo = $db->getConnection();
    }

    public function create(){
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['employeeId']) || !isset($data['date']) || !isset($data['note'])) {
                http_response_code(400);
                echo json_encode(['message' => 'Missing required fields: employeeId, date, note']);
                return;
            }

            $employeeId = (int)$data['employeeId'];
            $date = $data['date'];
            $note = (float)$data['note'];

            $evaluationModel = new Evaluation($this->pdo);

            if ($evaluationModel->create($employeeId, $date, $note)) {
                http_response_code(201);
                echo json_encode(['message' => 'Evaluation created successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to create evaluation']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function get($id){
        try {
            $evaluationModel = new Evaluation($this->pdo);
            $evaluation = $evaluationModel->get($id);

            if ($evaluation) {
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($evaluation);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Evaluation not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
    public function getAll(){
        try {
            $evaluationModel = new Evaluation($this->pdo);
            $evaluations = $evaluationModel->getAll();

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($evaluations);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function getByEmployeeId($employeeId){
        try {
            $evaluationModel = new Evaluation($this->pdo);
            $evaluations = $evaluationModel->getByEmployeeId($employeeId);

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($evaluations);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function update($id){
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['date']) || !isset($data['note'])) {
                http_response_code(400);
                echo json_encode(['message' => 'Missing required fields: date, note']);
                return;
            }

            $date = $data['date'];
            $note = (float)$data['note'];

            $evaluationModel = new Evaluation($this->pdo);

            if ($evaluationModel->update($id, $date, $note)) {
                http_response_code(200);
                echo json_encode(['message' => 'Evaluation updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to update evaluation']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function delete($id){
        try {
            $evaluationModel = new Evaluation($this->pdo);

            if ($evaluationModel->delete($id)) {
                http_response_code(200);
                echo json_encode(['message' => 'Evaluation deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to delete evaluation']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
}

?>