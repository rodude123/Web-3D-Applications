<?php
//////////// Config file /////////////////////
/// Used for storing the db conn function  ///
//////////////////////////////////////////////

function dbConn()
{
    try
    {
        return new PDO("sqlite:../assets/cocaColaData.db", "","",array(
            PDO::ATTR_PERSISTENT => true
        )); 
    }
    catch (PDOException $e)
    {
        return $e->getMessage();
    }
}
