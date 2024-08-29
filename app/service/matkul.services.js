const db = require ('../../db/models/index');
const mata_kuliah = db.mata_kuliah // model users

//service untuk dosen input nilai (khusus Dosen)
exports.inputScore = async (req) => {
    try {

        if(req.user.role != 2) {
            throw new Error("Anda tidak mempunyai akses untuk menginput data user tersebut");
        }

        const {dosen_id, mahasiswa_id, nama_matkul, score, status} = req.body;


         // verifikasi buat ngecek id yang masuk dengan id dosen yang ada di db
         if (req.user.id !== dosen_id) {
            throw new Error("Anda hanya bisa menginput nilai untuk mata kuliah Anda sendiri");
        }

        // buat pastiin lagi id dengan pelajaran yang diajar dosen
        const matkulDosen = {
            14: "Bahasa Inggris",
            15: "Sosiologi",
            16: "Matematika"
        };

        //kalau ga sama id sama matkul yang diajar, ga bisa edit
        if (matkulDosen[dosen_id] !== nama_matkul) {
            throw new Error("Anda tidak mempunyai akses untuk menginput nilai pada mata kuliah ini");
        }
        

        await mata_kuliah.create ({
            dosen_id,
            mahasiswa_id,
            nama_matkul,
            score,
            status
        });

        return {
            status: 200,
            message: "Berhasil menginput nilai"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menginput nilai",
            error: error.message
        }
    }
}

//service untuk menampilkan semua data nilai (buat Kajur sama Dosen doang)
exports.getScores = async (req) => {
    try {
        if(req.user.role == 3) {
            throw new Error("Anda tidak mempunyai akses untuk menginput data user tersebut");
        }

        const data = await mata_kuliah.findAll();

        return {
            status: 200,
            data
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menampilkan nilai",
            error: error.message
        };
    }
};

//service untuk menampilkan data nilai sesuai dengan id mahasiswa
exports.getScore = async (mahasiswaId, userIdLogin) => {
    try {

        if (userIdLogin !== mahasiswaId) {
            throw new Error("Anda tidak mempunyai akses untuk melihat data user tersebut");
        }

        const data = await mata_kuliah.findAll({
            where : {
                mahasiswa_id : mahasiswaId,
                status: 2
            }
        }); 

        return {
            status: 200,
            data
        }

    } catch (error) {
        return {
            status: 500,
            message: "Gagal menampilkan data nilai",
            error: error.message
        }
    }
}


//service untuk update nilai (khusus Dosen)
exports.updateNilai = async (req, matkulId) => {
    try {
        if(req.user.role != 2) {
            throw new Error("Anda tidak mempunyai akses untuk menginput data user tersebut");
        }

        const {dosen_id, mahasiswa_id, nama_matkul, score} = req.body;

        // verifikasi buat ngecek id yang masuk dengan id dosen yang ada di db
        if (req.user.id !== dosen_id) {
            throw new Error("Anda hanya bisa menginput nilai untuk mata kuliah Anda sendiri");
        }

        // buat pastiin lagi id dengan pelajaran yang diajar dosen
        const matkulDosen = {
            14: "Bahasa Inggris",
            15: "Sosiologi",
            16: "Matematika"
        };

        //kalau ga sama id sama matkul yang diajar, ga bisa edit
        if (matkulDosen[dosen_id] !== nama_matkul) {
            throw new Error("Anda tidak mempunyai akses untuk menginput nilai pada mata kuliah ini");
        }

        mata_kuliah.update(
            {
            dosen_id,
            mahasiswa_id,
            nama_matkul,
            score,
        },
        {
            where: {
                id: matkulId
            }
        }
    );

    return {
        status: 200,
        message: "Berhasil mengupdate nilai"
    }

    } catch (error) {
        return {
            status: 500,
            message: "Gagal approve nilai",
            error: error.message
        }
    }
}

//service untuk kajur approve nilai (khusus Kajur)
exports.approveNilai = async (req, matkulId) => {
    try {
        if(req.user.role != 1) {
            throw new Error("Anda tidak mempunyai akses untuk melakukan approval");``
        }

        const {status} = req.body;

        mata_kuliah.update(
            {
            status
        },
        {
            where: {
                id: matkulId
            }
        }
    );

    return {
        status: 200,
        message: "Berhasil approve nilai"
    }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal approve nilai",
            error: error.message
        }
    }
}

//service untuk menghapus data nilai (khusus Dosen)
exports.deleteNilai = async (req, matkulId) => {
    try {
        if(req.user.role != 2) {
            throw new Error("Anda tidak mempunyai akses untuk menghapus nilai");``
        }

        const data = await mata_kuliah.findOne({
            where:{
                id: matkulId
            }
        });

        if (data.status === 2) {
            throw new Error("Data yang sudah di Approve tidak dapat dihapus");
        }

        await mata_kuliah.destroy({
            where:{
                id: matkulId
            }
        });

        return {
            status: 200,
            message: "Berhasil menghapus nilai"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal mengahapus nilai",
            error: error.message
        }
    }
}