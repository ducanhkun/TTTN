const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy tất cả lịch hẹn (bao gồm các thông tin liên quan)
router.get('/', (req, res) => {
    const query = `
        SELECT 
            a.appointmentId,
            a.customerId,
            c.fullName AS customerName,
            c.phone AS customerPhone,
            s.serviceName,
            s.price,
            a.carModel,
            a.carVersion,
            a.carPlateNumber,
            a.manufactureYear,
            t.timeSlot,
            a.scheduledDate,
            aps.statusName,
            a.notes,
            a.createdAt,
            a.updatedAt
        FROM appointments a
        INNER JOIN customers c ON a.customerId = c.customerId
        INNER JOIN time_slots t ON a.timeSlotId = t.timeSlotId
        INNER JOIN services s ON a.serviceId = s.serviceId
        INNER JOIN appointment_status aps ON a.statusId = aps.statusId
        ORDER BY a.scheduledDate DESC, t.timeSlot ASC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách lịch hẹn:', err.message);
            return res.status(500).send('Lỗi server');
        }
        res.json(results);
    });
});

// Thêm mới lịch hẹn
router.post('/', (req, res) => {
    const {
        customerId,
        serviceId,
        carModel,
        carVersion,
        carPlateNumber,
        manufactureYear,
        timeSlotId,
        scheduledDate,
        notes,
    } = req.body;

    const insertAppointmentQuery = `
        INSERT INTO appointments (
            customerId, serviceId, carModel, carVersion, 
            carPlateNumber, manufactureYear, timeSlotId, scheduledDate, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const updateTimeSlotQuery = `
        UPDATE time_slots
        SET isAvailable = FALSE
        WHERE timeSlotId = ?`;

    db.query(
        insertAppointmentQuery,
        [customerId, serviceId, carModel, carVersion, carPlateNumber, manufactureYear, timeSlotId, scheduledDate, notes],
        (err, result) => {
            if (err) {
                console.error('Lỗi khi thêm lịch hẹn:', err.message);
                return res.status(500).send('Lỗi server');
            }

            // Sau khi thêm lịch hẹn, cập nhật trạng thái của timeSlot
            db.query(updateTimeSlotQuery, [timeSlotId], (updateErr) => {
                if (updateErr) {
                    console.error('Lỗi khi cập nhật trạng thái khung giờ:', updateErr.message);
                    return res.status(500).send('Lỗi server khi cập nhật khung giờ');
                }

                res.status(201).send('Thêm lịch hẹn thành công và cập nhật trạng thái khung giờ');
            });
        }
    );
});

// Cập nhật lịch hẹn
router.put('/:appointmentId', (req, res) => {
    const { appointmentId } = req.params;
    const {
        serviceId,
        timeSlotId,
        scheduledDate,
        carModel,
        carVersion,
        carPlateNumber,
        manufactureYear,
        notes,
        statusId
    } = req.body;

    const query = `
        UPDATE appointments
        SET serviceId = ?, timeSlotId = ?, scheduledDate = ?, carModel = ?, carVersion = ?, carPlateNumber = ?, manufactureYear = ?, notes = ?, statusId = ?
        WHERE appointmentId = ?`;

    const values = [
        serviceId,
        timeSlotId,
        scheduledDate,
        carModel,
        carVersion || null,
        carPlateNumber,
        manufactureYear,
        notes || null,
        statusId || 1,
        appointmentId
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật lịch hẹn:', err.message);
            return res.status(500).send('Lỗi server');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Không tìm thấy lịch hẹn để cập nhật');
        }

        const updateTimeSlotQuery = `UPDATE time_slots SET isAvailable = FALSE WHERE timeSlotId = ?`;
        db.query(updateTimeSlotQuery, [timeSlotId], (updateErr) => {
            if (updateErr) {
                console.error('Lỗi khi cập nhật trạng thái khung giờ:', updateErr.message);
                return res.status(500).send('Lỗi server');
            }
            res.status(200).send('Cập nhật lịch hẹn thành công!');
        });
    });
});

// Xóa lịch hẹn
router.delete('/:appointmentId', (req, res) => {
    const { appointmentId } = req.params;

    const deleteQuery = 'DELETE FROM appointments WHERE appointmentId = ?';

    db.query(deleteQuery, [appointmentId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa lịch hẹn:', err.message);
            return res.status(500).send('Lỗi server');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Không tìm thấy lịch hẹn để xóa');
        }

        res.status(200).send('Xóa lịch hẹn thành công');
    });
});

module.exports = router;
