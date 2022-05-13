<?php
require_once "config.php";

function getHomeDrinksData()
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

function getIndividualDrinkData($drinkName)
{
    $conn = dbConn();
    if (is_string($conn))
    {
        return "Connection Failed: $conn";
    }

    $drinkSQL = "SELECT individualDrinks.title, individualDrinks.subtitle, individualDrinks.info, individualDrinks.linkToCocaCola, individualDrinks.modelLink, slideShowLinks.imgLoc, slideShowLinks.subText
FROM individualDrinks LEFT JOIN slideShowLinks on individualDrinks.drinkName = slideShowLinks.drinkName where individualDrinks.drinkName = :drinkName";
    $stmt = $conn->prepare($drinkSQL);
    $stmt->bindParam(":drinkName", $drinkName);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}
