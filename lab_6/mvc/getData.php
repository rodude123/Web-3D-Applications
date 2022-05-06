<?php
require_once "config.php";

function getHomeDrinksData ()
{
    $conn = dbConn();
    if (is_string($conn))
    {
        return "Connection Failed: $conn";
    }
    
    $sql = "SELECT * FROM homeDrinks";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getIndividualDrinkData ($drinkName)
{
    $conn = dbConn();
    if (is_string($conn))
    {
        return "Connection Failed: $conn";
    }

    $sql = "SELECT * FROM individualDrinks WHERE drinkName = :drinkName";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":drinkName", $drinkName);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}