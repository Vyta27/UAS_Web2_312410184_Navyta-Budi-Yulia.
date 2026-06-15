<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;

class Barang extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new BarangModel();
        return $this->respond($model->getBarangDenganRelasi());
    }

    public function show($id = null)
    {
        $model = new BarangModel();
        $data  = $model->find($id);
        if ($data) return $this->respond($data);
        return $this->failNotFound('Data tidak ditemukan.');
    }

    public function create()
    {
        $model = new BarangModel();
        $model->insert([
            'nama_barang'  => $this->request->getVar('nama_barang'),
            'stok'         => $this->request->getVar('stok'),
            'harga'        => $this->request->getVar('harga'),
            'id_kategori'  => $this->request->getVar('id_kategori'),
            'id_supplier'  => $this->request->getVar('id_supplier'),
        ]);
        return $this->respondCreated(['status' => 201, 'messages' => 'Data berhasil ditambahkan.']);
    }

    public function update($id = null)
    {
        $model = new BarangModel();
        $model->update($id, [
            'nama_barang'  => $this->request->getVar('nama_barang'),
            'stok'         => $this->request->getVar('stok'),
            'harga'        => $this->request->getVar('harga'),
            'id_kategori'  => $this->request->getVar('id_kategori'),
            'id_supplier'  => $this->request->getVar('id_supplier'),
        ]);
        return $this->respond(['status' => 200, 'messages' => 'Data berhasil diubah.']);
    }

    public function delete($id = null)
    {
        $model = new BarangModel();
        if ($model->find($id)) {
            $model->delete($id);
            return $this->respondDeleted(['status' => 200, 'messages' => 'Data berhasil dihapus.']);
        }
        return $this->failNotFound('Data tidak ditemukan.');
    }
}