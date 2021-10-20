<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Response;

class ImageController extends Controller
{

    // Função que retorna os dados referentes aos pontos na route /mapa/get_predios
    protected function showImage()
    {
        //check image exist or not
        $exists = Storage::disk('public')->exists('images/plant.png');
        
        if($exists) {
           
           //get content of image
           $content = Storage::get('public/images/plant.png');
           
           //get mime type of image
           $mime = Storage::mimeType('public/images/plant.png');
           //prepare response with image content and response code
           $response = Response::make($content, 200);
           //set header 
           $response->header("Content-Type", $mime);
           // return response
           return $response;
        } else {
           abort(404);
        }
     }
}