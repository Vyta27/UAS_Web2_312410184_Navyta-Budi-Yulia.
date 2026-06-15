<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class Supplier extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new SupplierModel();
        return $this->respond($model->findAll());
    }

    public function show($id = null)
    {
        $model = new SupplierModel();
        $data  = $model->find($id);
        if ($data) return $this->respond($data);
        return $this->failNotFound('Data tidak ditemukan.');
    }

    public function create()
    {
        $model = new SupplierModel();
        $model->insert([
            'nama_supplier' => $this->request->getVar('nama_supplier'),
            'alamat'        => $this->request->getVar('alamat'),
            'telpon'        => $this->request->getVar('telpon'),
        ]);
        return $this->respondCreated(['status' => 201, 'messages' => 'Data berhasil ditambahkan.']);
    }

    public function update($id = null)
    {
        $model = new SupplierModel();
        $model->update($id, [
            'nama_supplier' => $this->request->getVar('nama_supplier'),
            'alamat'        => $this->request->getVar('alamat'),
            'telpon'        => $this->request->getVar('telpon'),
        ]);
        return $this->respond(['status' => 200, 'messages' => 'Data berhasil diubah.']);
    }

    public function delete($id = null)
    {
        $model = new SupplierModel();
        if ($model->find($id)) {
            $model->delete($id);
            return $this->respondDeleted(['status' => 200, 'messages' => 'Data berhasil dihapus.']);
        }
        return $this->failNotFound('Data tidak ditemukan.');
    }
}