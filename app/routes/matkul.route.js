const express = require('express');
const router = express.Router();
const matkulController = require('../controller/matkul.controller');
const {verifyToken} = require ('../utilities/auth');


router.post("/input", verifyToken, matkulController.inputScore);

router.get("/get_scores", verifyToken, matkulController.getScores);
router.get("/:mahasiswa_id", verifyToken, matkulController.getScore);
router.put("/update/:matkul_id", verifyToken, matkulController.updateNilai);
router.put("/approve/:matkul_id", verifyToken, matkulController.approveNilai);
router.delete("/delete/:matkul_id", verifyToken, matkulController.deleteNilai);

module.exports = router;
