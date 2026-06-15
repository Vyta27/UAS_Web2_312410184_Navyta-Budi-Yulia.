<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// Auth
$routes->post('api/login', 'Api\Auth::login');

// Kategori — GET bebas, POST/PUT/DELETE butuh token
$routes->get('api/kategori', 'Api\Kategori::index');
$routes->get('api/kategori/(:num)', 'Api\Kategori::show/$1');
$routes->post('api/kategori', 'Api\Kategori::create', ['filter' => 'apiauth']);
$routes->put('api/kategori/(:num)', 'Api\Kategori::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/kategori/(:num)', 'Api\Kategori::delete/$1', ['filter' => 'apiauth']);

// Supplier
$routes->get('api/supplier', 'Api\Supplier::index');
$routes->get('api/supplier/(:num)', 'Api\Supplier::show/$1');
$routes->post('api/supplier', 'Api\Supplier::create', ['filter' => 'apiauth']);
$routes->put('api/supplier/(:num)', 'Api\Supplier::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/supplier/(:num)', 'Api\Supplier::delete/$1', ['filter' => 'apiauth']);

// Barang
$routes->get('api/barang', 'Api\Barang::index');
$routes->get('api/barang/(:num)', 'Api\Barang::show/$1');
$routes->post('api/barang', 'Api\Barang::create', ['filter' => 'apiauth']);
$routes->put('api/barang/(:num)', 'Api\Barang::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/barang/(:num)', 'Api\Barang::delete/$1', ['filter' => 'apiauth']);

$routes->post('api/kategori/(:num)/edit', 'Api\Kategori::update/$1', ['filter' => 'apiauth']);
$routes->post('api/supplier/(:num)/edit', 'Api\Supplier::update/$1', ['filter' => 'apiauth']);
$routes->post('api/barang/(:num)/edit', 'Api\Barang::update/$1', ['filter' => 'apiauth']);

$routes->setAutoRoute(false);