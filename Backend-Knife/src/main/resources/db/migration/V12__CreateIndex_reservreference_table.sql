CREATE INDEX idx_reserv_reference_date_status_closedbron ON knfc.reserv_reference(date, status, closedbron);
CREATE INDEX idx_reserv_reference_phone_fio ON knfc.reserv_reference(phone, fio_client);
CREATE INDEX idx_reserv_reference_idreference ON knfc.reserv_reference(id_reference);