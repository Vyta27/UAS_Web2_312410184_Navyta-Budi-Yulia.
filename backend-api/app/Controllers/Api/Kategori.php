<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class Kategori extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new KategoriModel();
        return $this->respond($model->findAll());
    }

    public function show($id = null)
    {
        $model = new KategoriModel();
        $data  = $model->find($id);
        if ($data) return $this->respond($data);
        return $this->failNotFound('Data tidak ditemukan.');
    }

    public function create()
    {
        $model = new KategoriModel();
        $model->insert([
            'nama_kategori' => $this->request->getVar('nama_kategori'),
            'deskripsi'     => $this->request->getVar('deskripsi'),
        ]);
        return $this->respondCreated(['status' => 201, 'messages' => 'Data berhasil ditambahkan.']);
    }

    public function update($id = null)
    {
        $model = new KategoriModel();
        $model->update($id, [
            'nama_kategori' => $this->request->getVar('nama_kategori'),
            'deskripsi'     => $this->request->getVar('deskripsi'),
        ]);
        return $this->respond(['status' => 200, 'messages' => 'Data berhasil diubah.']);
    }

    public function delete($id = null)
    {
        $model = new KategoriModel();
        if ($model->find($id)) {
            $model->delete($id);
            return $this->respondDeleted(['status' => 200, 'messages' => 'Data berhasil dihapus.']);
        }
        return $this->failNotFound('Data tidak ditemukan.');
    }
}