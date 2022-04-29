<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../../vendor/autoload.php';

require_once "getData.php";

$app = new \Slim\App;
$app->get('/homeDrinks', function (Request $request, Response $response, array $args)
{
    $result = getHomeDrinksData();
    if (!is_array($result))
    {
        $response->getBody()->write($result);
        return $response->withStatus(500);
    }
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

