<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\cell;


class MapController extends Controller
{
    // Função que exibe a view 'mapa' na route /mapa
    function show()
    {
        return view('planta');
    }

    // Função que retorna os dados referentes aos pontos na route /mapa/get_predios
    function get_data_cells()
    {   
        $data_cells = cell::all();
        echo $data_cells;
    }
}