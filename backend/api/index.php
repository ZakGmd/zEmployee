<?php

declare(strict_types=1);

require_once '../config/database.php';
require_once '../models/Tasks.php';
require_once '../models/Evaluation.php';
require_once '../models/Employe.php';
require_once '../controllers/TaskController.php';
require_once '../controllers/EvaluationController.php';
require_once '../controllers/EmployeeController.php';

$database = new Database();
$pdo = $database->getConnection();

$taskController = new TaskController($pdo);
$evaluationController = new EvaluationController($pdo);
$employeeController = new EmployeeController($pdo); 

function isRoute(string $method, string $route, array ...$handlers): int
{
    global $params;
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
    $route_rgx = preg_replace('#:(\w+)#', '(?<$1>(\S+))', $route);
    return preg_match("#^$route_rgx$#", $uri, $params);
}

function json(mixed $data): void
{
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

$result = match (true) {
    isRoute('GET', '/tasks', [$taskController, 'getAll']) => $taskController->getAll(),
    isRoute('GET', '/tasks/:id', [$taskController, 'get']) => $taskController->get($params['id']),
    isRoute('POST', '/tasks', [$taskController, 'create']) => $taskController->create(),
    isRoute('PUT', '/tasks/:id', [$taskController, 'update']) => $taskController->update($params['id']),
    isRoute('DELETE', '/tasks/:id', [$taskController, 'delete']) => $taskController->delete($params['id']),
    isRoute('GET', '/tasks/employee/:employeeId', [$taskController, 'getByEmployeeId']) => $taskController->getByEmployeeId($params['employeeId']),

    isRoute('GET', '/evaluations', [$evaluationController, 'getAll']) => $evaluationController->getAll(),
    isRoute('GET', '/evaluations/:id', [$evaluationController, 'get']) => $evaluationController->get($params['id']),
    isRoute('POST', '/evaluations', [$evaluationController, 'create']) => $evaluationController->create(),
    isRoute('PUT', '/evaluations/:id', [$evaluationController, 'update']) => $evaluationController->update($params['id']),
    isRoute('DELETE', '/evaluations/:id', [$evaluationController, 'delete']) => $evaluationController->delete($params['id']),
    isRoute('GET', '/evaluations/employee/:employeeId', [$evaluationController, 'getByEmployeeId']) => $evaluationController->getByEmployeeId($params['employeeId']),

    isRoute('GET', '/employees', [$employeeController, 'getAll']) => $employeeController->getAll(),
    isRoute('POST', '/employees', [$employeeController, 'create']) => $employeeController->create(),
    isRoute('GET', '/employees/:id', [$employeeController, 'get']) => $employeeController->get($params['id']),
    isRoute('PUT', '/employees/:id', [$employeeController, 'update']) => $employeeController->update($params['id']),
    isRoute('DELETE', '/employees/:id', [$employeeController, 'delete']) => $employeeController->delete($params['id']),

    default => json(['err' => 'Route not found!']),
};

if ($result !== null) {
    $result(); 
}