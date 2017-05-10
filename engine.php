<?php
	
echo $_GET['action']();

function getSaves()
{
	$files = scandir('./saves');
	unset($files[0]);
	unset($files[1]);
	return json_encode($files);
}

function applySave()
{
	return file_get_contents('./saves/' . $_GET['savefile']);
}

function makeMove()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	$move['teamname'] = $_GET['teamname'];
	$move['move'] = $_GET['move'];
	$move['countity'] = $_GET['countity'];
	$json['moves'][] = $move;
	file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
	return true;
}

function saveMove()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	$json['settings']['move']++;
	file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
	return true;
}

function savePosition()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	$json['positions'][$_GET['team']] = $_GET['place'];
	file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
	return true;
}

function payRante()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	$team = $json['cityown']["f_d".$_GET['place']];
	
	if ($_GET['team'] != $team)
	{
		$res = 0;
		foreach ($json['cityown'] as $key => $value)
		{
			if ($value === $team) $res += $json['citycost'][$key];
		}
		$rent = $res / 10 - (($res / 10) % 100);
		//var_dump($json['scores'][$_GET['team']]);
		if ($rent <= $json['scores'][$_GET['team']])
		{
			$json['scores'][$_GET['team']] = $json['scores'][$_GET['team']] - $rent;
			$json['scores'][$team] = $json['scores'][$team] + $rent;			
		}
		else return 0;
		//var_dump($rent);
		//var_dump($json);
		file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
	}
	return true;
}

function applyPrice()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	$json['citycost'] = $_GET['citycost'];
	$json['settings']["goal"] = $_GET['goal'];
	$json['settings']["players"] = $_GET['players'];
	file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
	return true;
}

function buyCity()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	if ($json['cityown']["f_d".$_GET['place']] === 0 && $json['positions'][$_GET['team']] === $_GET['place'] && $json['citycost']["f_d".$_GET['place']] <= $json['scores'][$_GET['team']])
	{
		$json['scores'][$_GET['team']] = $json['scores'][$_GET['team']] - $json['citycost']["f_d".$_GET['place']];
		$json['cityown']["f_d".$_GET['place']] = $_GET['team'];
		$res = 0;
		foreach ($json['cityown'] as $key => $value)
		{
			if ($value === $_GET['team']) $res += $json['citycost'][$key];
		}
		$rent = $res / 10 - (($res / 10) % 100);
		$json['rent'][$_GET['team']] = $rent;
		file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
		return true;
	}
	return 0;
}


function addMoney()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	$json['scores'][$_GET['team']] = $json['scores'][$_GET['team']] + $_GET['price'];
	file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
	return true;
}

function subMoney()
{
	$json = json_decode(file_get_contents('./saves/' . $_GET['savefile']), true);
	if ( $json['scores'][$_GET['team']] >= $_GET['price']) 
	{
		$json['scores'][$_GET['team']] = $json['scores'][$_GET['team']] - $_GET['price'];
		file_put_contents('./saves/' . $_GET['savefile'], json_encode($json));
	}
	return true;
}

function newGame()
{
	$json["citycost"]["f_d2"] = 0;
	$json["citycost"]["f_d3"] = 0;
	$json["citycost"]["f_d4"] = 0;
	$json["citycost"]["f_d6"] = 0;
	$json["citycost"]["f_d8"] = 0;
	$json["citycost"]["f_d9"] = 0;
	$json["citycost"]["f_d10"] = 0;
	$json["citycost"]["f_d12"] = 0;
	$json["citycost"]["f_d13"] = 0;
	$json["citycost"]["f_d15"] = 0;
	$json["citycost"]["f_d16"] = 0;
	$json["citycost"]["f_d18"] = 0;
	$json["citycost"]["f_d19"] = 0;
	$json["citycost"]["f_d21"] = 0;
	$json["citycost"]["f_d22"] = 0;
	$json["citycost"]["f_d23"] = 0;
	$json["citycost"]["f_d24"] = 0;
	$json["citycost"]["f_d26"] = 0;
	$json["citycost"]["f_d27"] = 0;
	$json["cityown"]["f_d2"] = 0;
	$json["cityown"]["f_d3"] = 0;
	$json["cityown"]["f_d4"] = 0;
	$json["cityown"]["f_d6"] = 0;
	$json["cityown"]["f_d8"] = 0;
	$json["cityown"]["f_d9"] = 0;
	$json["cityown"]["f_d10"] = 0;
	$json["cityown"]["f_d12"] = 0;
	$json["cityown"]["f_d13"] = 0;
	$json["cityown"]["f_d15"] = 0;
	$json["cityown"]["f_d16"] = 0;
	$json["cityown"]["f_d18"] = 0;
	$json["cityown"]["f_d19"] = 0;
	$json["cityown"]["f_d21"] = 0;
	$json["cityown"]["f_d22"] = 0;
	$json["cityown"]["f_d23"] = 0;
	$json["cityown"]["f_d24"] = 0;
	$json["cityown"]["f_d26"] = 0;
	$json["cityown"]["f_d27"] = 0;
	$json['scores']['red'] = 0;
	$json['scores']['gold'] = 0;
	$json['scores']['purple'] = 0;
	$json['scores']['blue'] = 0;
	$json['scores']['green'] = 0;
	$json['positions']['red'] = 1;
	$json['positions']['gold'] = 1;
	$json['positions']['purple'] = 1;
	$json['positions']['blue'] = 1;
	$json['positions']['green'] = 1;
	$json['rent']['red'] = 0;
	$json['rent']['gold'] = 0;
	$json['rent']['purple'] = 0;
	$json['rent']['blue'] = 0;
	$json['rent']['green'] = 0;
	$json["moves"] = array();
	$json["settings"]["move"] = 0;
	$json["settings"]["goal"] = 10000;
	$json["settings"]["players"] = 5;
	file_put_contents('./saves/' . date('Y_m_d_H_i_s') .".json", json_encode($json));
	return true;
}