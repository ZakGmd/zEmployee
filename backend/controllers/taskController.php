<?php

require_once '../config/database.php';
require_once '../models/Tasks.php';

class TaskController
{
    private $pdo;

    public function __construct(){
        $db = new Database();
        $this->pdo = $db->getConnection();
    }

    public function create(){
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['employeeId']) || !isset($data['title']) || !isset($data['status'])) {
                http_response_code(400);
                echo json_encode(['message' => 'Missing required fields: employeeId, title, status']);
                return;
            }

            $employeeId = (int)$data['employeeId'];
            $title = $data['title'];
            $description = isset($data['description']) ? $data['description'] : null;
            $status = $data['status'];

            $taskModel = new Task($this->pdo); 
            if ($taskModel->create($employeeId, $title, $description, $status)) {
                http_response_code(201);
                echo json_encode(['message' => 'Task created successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to create task']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function get($id){
        try {
            $taskModel = new Task($this->pdo);
            $task = $taskModel->getTaskById($id);

            if ($task) {
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($task);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Task not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
    public function getAll(){
        try {
            $taskModel = new Task($this->pdo);
            $tasks = $taskModel->getAll();

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($tasks);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
    public function getByEmployeeId($employeeId){
        try {
            $taskModel = new Task($this->pdo);
            $tasks = $taskModel->findByEmployeeId($employeeId);

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($tasks);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function update($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['title']) || !isset($data['status'])) {
                http_response_code(400);
                echo json_encode(['message' => 'Missing required fields: title, status']);
                return;
            }

            $title = $data['title'];
            $description = isset($data['description']) ? $data['description'] : null;
            $status = $data['status'];

            $taskModel = new Task($this->pdo);
            if ($taskModel->update($id, $title, $description, $status)) {
                http_response_code(200);
                echo json_encode(['message' => 'Task updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to update task']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function delete($id){
        try {
            $taskModel = new Task($this->pdo);
            if ($taskModel->delete($id)) {
                http_response_code(200);
                echo json_encode(['message' => 'Task deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to delete task']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
    public function getEmployeeTaskCompletion($employeeId){
        try {
            $taskModel = new Task($this->pdo); 

            $totalTasks = $taskModel->findByEmployeeId($employeeId);
            $totalTasksCount = count($totalTasks);

            $completedTasks = $taskModel->findByEmployeeId($employeeId);
            $completedTasks = array_filter($completedTasks, function($task) { 
                return $task['status'] === 'done'; 
            });
            $completedTasksCount = count($completedTasks);

            if ($totalTasksCount === 0) {
                http_response_code(400);
                echo json_encode(['message' => 'No tasks assigned to the employee.']);
                return;
            }

            $completionPercentage = ($completedTasksCount / $totalTasksCount) * 100;

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode([
                'employeeId' => $employeeId,
                'totalTasks' => $totalTasksCount,
                'completedTasks' => $completedTasksCount,
                'completionPercentage' => $completionPercentage,
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
}

?>