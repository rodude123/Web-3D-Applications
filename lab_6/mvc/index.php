<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\App;

require '../../vendor/autoload.php';

require_once "getData.php";

$app = new App;

// middleware for setting content type globally to json
$app->add(function($request, $response, $next) 
{
    $response = $next($request, $response);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/homeDrinks', function (Request $request, Response $response, array $args)
{
    $result = getHomeDrinksData();
    if (!is_array($result))
    {
        $response->getBody()->write($result);
        return $response->withStatus(500);
    }

    $response->getBody()->write(json_encode($result));
    return $response;
});

$app->get('/individualDrink/{drinkName}', function (Request $request, Response $response, array $args)
{
    $drinkName = $args['drinkName'];
    $result = getIndividualDrinkData($drinkName);
    if (!is_array($result))
    {
        $response->getBody()->write($result);
        return $response->withStatus(500);
    }
    
    $response->getBody()->write(json_encode($result));
    return $response;
});


$app->run();

