package com.zar.JavaServer.Service;

import com.zar.JavaServer.Entity.*;
import com.zar.JavaServer.Repository.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReferenceServiceImpl implements ReferenceService{

    private static final ZoneId BUSINESS_TIME_ZONE = ZoneId.of("Europe/Moscow");

    private final ReservBlockRepository reservBlockRepository;
    private final ReferenceRepository referenceRepository;
    private final ReservReferenceRepository reservReferenceRepository;
    private final ImgReferenceRepository imgReferenceRepository;
    private final BirthdayRepository birthdayRepository;
    private final AuthorizationService authService;
    @Autowired
    private Environment env;

    @Override
    public boolean AddReservBlock(ReservBlock reservBlock, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                reservBlock.setDateConfirm(new Date());
                reservBlockRepository.save(reservBlock);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        else return false;
    }

    @Override
    public boolean DelReservBlock(ReservBlock reservBlock, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                reservBlockRepository.delete(reservBlock);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        else return false;
    }

    @Override
    public void AddReference(Reference reference, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                reference.setUpdated(new Date());
                referenceRepository.save(reference);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    @Override
    public boolean DelReference(Reference reference, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                referenceRepository.delete(reference);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        else return false;
    }

    @Override
    public void AddImgReference(ImgReference imgReference, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                imgReferenceRepository.save(imgReference);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    @Override
    public boolean DelImgReference(ImgReference imgReference, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                imgReferenceRepository.delete(imgReference);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        else return false;
    }

    @Override
    public void AddBirthday(Birthday birthday, String token) {
        if (authService.findTokenAdmin(token)) {
            birthdayRepository.save(birthday);
        }
    }

    @Override
    public boolean DelBirthday(Birthday birthday, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                birthdayRepository.delete(birthday);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        else return false;
    }

    @Override
    public Map<String, Object> getByReference_Id(short id) { // Метод получения услуги по id
        Reference reference = referenceRepository.findByReference_Id(id);
        Map<String, Object> reservationInfo = new HashMap<>();
        reservationInfo.put("reference", reference);
        reservationInfo.put("timeslots", reference.getTimeslots().stream().map(LocalTime::toString).collect(Collectors.toList()));
        reservationInfo.put("timeslotsHoliday", reference.getTimeslotsHoliday().stream().map(LocalTime::toString).collect(Collectors.toList()));

        reservationInfo.put("date", LocalDate.now(BUSINESS_TIME_ZONE));
        reservationInfo.put("days_count", env.getProperty("application.days_count"));
        return reservationInfo;
    }

    @Override
    public List<Reference> getAllReferences() {
        return referenceRepository.findAllByOrderByUpdatedAsc();
    }

    @Override
    public List<Map<String, Object>> getAllReferencesReservation(String date, String token) { // Метод получения услуг и таймслотов для сотрудников
        if (authService.findTokenTrenerAdmin(token)) {
            List<Map<String, Object>> newList = new ArrayList<>();
            List<ReservReference> reservReferences = getAllReservReferencesByDateActive(date); // Все активные брони (красные, рыжие, зеленые) по дате
            List<Reference> allReferences = referenceRepository.findAll();
            allReferences.sort(Comparator.comparing(Reference::getStatus).reversed());
            for (Reference reference : allReferences) {
                Map<String, Object> reservationInfo = new HashMap<>();
                reservationInfo.put("reference", reference); // Услуга с полем 'reference'
                LocalDate current_date = LocalDate.parse(date);
                if (current_date.getDayOfWeek() == DayOfWeek.SUNDAY || current_date.getDayOfWeek() == DayOfWeek.SATURDAY) // Проверка на выходные ни возврат без timeslots и добавление доп. времени в конец таймслотов
                {
                    List<LocalTime> time_slots_holiday = reference.getTimeslotsHoliday();
                    time_slots_holiday.add(time_slots_holiday.get(time_slots_holiday.size()-1).plusMinutes(reference.getReservDuration())); // Добавление доп. времени
                    reservReferences.stream()
                            .filter(reservReference -> Objects.equals(reservReference.getReference().getId(), reference.getId()))
                            .forEach(reservReference -> {
                                LocalTime time_reservReference = LocalTime.of(Integer.parseInt(reservReference.getTime().split(":")[0]), Integer.parseInt(reservReference.getTime().split(":")[1]));
                                if (!time_slots_holiday.contains(time_reservReference))
                                    time_slots_holiday.add(time_reservReference);
                            });
                    reservationInfo.put("timeslotsHoliday", time_slots_holiday.stream().map(LocalTime::toString).sorted().collect(Collectors.toList()));
                    reservationInfo.put("timeslots", null);
                }
                else { // Будние дни возврат без timeslotsHoliday и добавление доп. времени в конец таймслотов
                    List<LocalTime> time_slots = reference.getTimeslots();
                    time_slots.add(time_slots.get(time_slots.size()-1).plusMinutes(reference.getReservDuration())); // Добавление доп времени
                    reservReferences.stream()
                            .filter(reservReference -> Objects.equals(reservReference.getReference().getId(), reference.getId()))
                            .forEach(reservReference -> {
                                LocalTime time_reservReference = LocalTime.of(Integer.parseInt(reservReference.getTime().split(":")[0]), Integer.parseInt(reservReference.getTime().split(":")[1]));
                                if (!time_slots.contains(time_reservReference))
                                    time_slots.add(time_reservReference);
                            });
                    reservationInfo.put("timeslots", time_slots.stream().map(LocalTime::toString).sorted().collect(Collectors.toList()));
                    reservationInfo.put("timeslotsHoliday", null);
                }
                newList.add(reservationInfo);
            }
            return newList;
        }
        else return null;
    }

    @Override
    public ResponseEntity<List<Reference>> getAllReferencesForClient() {
        try {
            List<Reference> references = referenceRepository.findByStatusTrueOrderByUpdatedAsc();
            return new ResponseEntity<>(references, HttpStatus.OK);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
    }

    @Override
    public List<ReservReference> getAllReservReferencesByDate(String date, String token) { // Метод получения броней для сотрудников
        if (authService.findTokenTrenerAdmin(token)) {
            List<ReservReference> reservReferences = getAllReservReferencesByDateActive(date);
            List<ReservReference> reservRefernces_itog = new ArrayList<>(reservReferences);
            LocalDate current_date = LocalDate.parse(date);
            List<Reference> references = referenceRepository.findAll();
            searchReservBlocks(reservRefernces_itog, current_date, references);
            for (ReservReference resRef: reservReferences
                    .stream()
                    .filter(reservReference ->
                            (reservReference.getStatus() == null && !reservReference.getClosedbron()) ||
                                    (reservReference.getStatus() != null && reservReference.getStatus() && !reservReference.getClosedbron()) ||
                                    (reservReference.getStatus() != null && reservReference.getStatus() && reservReference.getClosedbron()))
                    .toList())
            { // ЦИКЛ ДЛЯ КРАСНЫХ, РЫЖИХ И ЗЕЛЕНЫХ БРОНЕЙ
                for (Reference reference : references) {
                    List<LocalTime> timeslots;
                    if (current_date.getDayOfWeek() == DayOfWeek.SUNDAY || current_date.getDayOfWeek() == DayOfWeek.SATURDAY)
                        timeslots = reference.getTimeslotsHoliday();
                    else timeslots = reference.getTimeslots();
                    LocalTime time_resRef = LocalTime.of(Integer.parseInt(resRef.getTime().split(":")[0]), Integer.parseInt(resRef.getTime().split(":")[1]));
                    if (!timeslots.contains(time_resRef)) {
                        if (time_resRef.plusMinutes(resRef.getReference().getDuration()).isBefore(timeslots.get(0)) || time_resRef.minusMinutes(resRef.getReference().getDuration()).isAfter(timeslots.get(timeslots.size()-1)))
                        {

                        }
                        else timeslots.add(time_resRef);
                    }
                    Collections.sort(timeslots);
                    if (timeslots.indexOf(time_resRef) > 0 && timeslots.indexOf(time_resRef) < timeslots.size()-1) {
                        searchCurrent(reservRefernces_itog, time_resRef, resRef, current_date, new Reference(reference));
                        searchRight(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                        searchLeft(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                    }
                    else if (timeslots.indexOf(time_resRef) == 0) {
                        searchCurrent(reservRefernces_itog, time_resRef, resRef, current_date, new Reference(reference));
                        searchRight(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                    }
                    else if (timeslots.indexOf(time_resRef) == timeslots.size()-1) {
                        searchCurrent(reservRefernces_itog, time_resRef, resRef, current_date, new Reference(reference));
                        searchLeft(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                    }
                }
            }
            return reservRefernces_itog;
        }
        else return null;
    }

    //ПОИСК ВПРАВО У ЗАБРОНИРОВАННОЙ УСЛУГИ
    private void searchRight(List<ReservReference> reservRefernces_itog, List<LocalTime> timeslots, LocalTime time_resRef, ReservReference resRefSearch, Reference referenceSearch) {
        for (int i = timeslots.indexOf(time_resRef)+1; i < timeslots.size(); i++) { // ЦИКЛ В ПРАВУЮ СТОРОНУ
            LocalTime time = timeslots.get(i);
            if (time.isBefore(time_resRef.plusMinutes(resRefSearch.getReference().getDuration()))) {
                if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(time.toString()) && Objects.equals(reservReference.getReference().getId(), referenceSearch.getId()))) {
                    continue;
                }
                else {
                    ReservReference newreservRef = new ReservReference();
                    newreservRef.setReference(referenceSearch);
                    newreservRef.setDate(resRefSearch.getDate());
                    newreservRef.setTime(time.toString());
                    newreservRef.setStatus(false);
                    newreservRef.setClosedbron(true);
                    reservRefernces_itog.add(newreservRef);
                }
            }
        }
    }

    private void searchRightForClient(List<ReservReference> reservRefernces_itog, List<LocalTime> timeslots, LocalTime time_resRef, ReservReference resRefSearch, Reference currentReference) {
        for (int i = timeslots.indexOf(time_resRef)+1; i < timeslots.size(); i++) { // ЦИКЛ В ПРАВУЮ СТОРОНУ
            LocalTime time = timeslots.get(i);
            if (time.isBefore(time_resRef.plusMinutes(resRefSearch.getReference().getDuration()))) {
                if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(time.toString()) && reservReference.getDate().equals(resRefSearch.getDate()))) {
                    continue;
                }
                else {
                    ReservReference newreservRef = new ReservReference();
                    newreservRef.setReference(currentReference);
                    newreservRef.setDate(resRefSearch.getDate());
                    newreservRef.setTime(time.toString());
                    newreservRef.setStatus(false);
                    newreservRef.setClosedbron(true);
                    reservRefernces_itog.add(newreservRef);
                }
            }
        }
    }

    //ПОИСК ВЛЕВО У ЗАБРОНИРОВАННОЙ УСЛУГИ
    private void searchLeft(List<ReservReference> reservRefernces_itog, List<LocalTime> timeslots, LocalTime time_resRef, ReservReference resRefSearch, Reference referenceSearch) {
        for (int i = timeslots.indexOf(time_resRef) - 1; i >= 0; i--) { // ЦИКЛ В ЛЕВУЮ СТОРОНУ
            LocalTime time = timeslots.get(i);
            if (time.isAfter(time_resRef.minusMinutes(referenceSearch.getDuration()))) {
                //System.out.println("ВРЕМЯ: " + time + " УСЛУГА: " + referenceSearch.getName());
                if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(time.toString()) && Objects.equals(reservReference.getReference().getId(), referenceSearch.getId()))) {
                    continue;
                }
                else {
                    ReservReference newreservRef = new ReservReference();
                    newreservRef.setReference(referenceSearch);
                    newreservRef.setDate(resRefSearch.getDate());
                    newreservRef.setTime(time.toString());
                    newreservRef.setStatus(false);
                    newreservRef.setClosedbron(true);
                    reservRefernces_itog.add(newreservRef);
                }
            }
        }
    }

    private void searchLeftForClient(List<ReservReference> reservRefernces_itog, List<LocalTime> timeslots, LocalTime time_resRef, ReservReference resRefSearch, Reference currentReference) {
        for (int i = timeslots.indexOf(time_resRef) - 1; i >= 0; i--) { // ЦИКЛ В ЛЕВУЮ СТОРОНУ
            LocalTime time = timeslots.get(i);
            if (time.isAfter(time_resRef.minusMinutes(currentReference.getDuration()))) {
                if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(time.toString()) && reservReference.getDate().equals(resRefSearch.getDate()))) {
                    continue;
                }
                else {
                    ReservReference newreservRef = new ReservReference();
                    newreservRef.setReference(currentReference);
                    newreservRef.setDate(resRefSearch.getDate());
                    newreservRef.setTime(time.toString());
                    newreservRef.setStatus(false);
                    newreservRef.setClosedbron(true);
                    reservRefernces_itog.add(newreservRef);
                }
            }
        }
    }

    // ПОИСК ТЕКУЩЕЙ БРОНИ ПО ВРЕМЕНИ У ВСЕХ УСЛУГ
    private void searchCurrent(List<ReservReference> reservRefernces_itog, LocalTime time_resRef, ReservReference resRefSearch, LocalDate current_date, Reference referenceSearch) {
        List<LocalTime> timeslots_new;
        if (current_date.getDayOfWeek() == DayOfWeek.SUNDAY || current_date.getDayOfWeek() == DayOfWeek.SATURDAY) {
            timeslots_new = referenceSearch.getTimeslotsHoliday();
        }
        else timeslots_new = referenceSearch.getTimeslots();
        if (timeslots_new.contains(time_resRef)) {
            if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(time_resRef.toString()) && Objects.equals(reservReference.getReference().getId(), referenceSearch.getId()))) {

            }
            else {
                ReservReference newreservRef = new ReservReference();
                newreservRef.setReference(referenceSearch);
                newreservRef.setDate(resRefSearch.getDate());
                newreservRef.setTime(time_resRef.toString());
                newreservRef.setStatus(false);
                newreservRef.setClosedbron(true);
                reservRefernces_itog.add(newreservRef);
            }
        }
    }

    private void searchCurrentForClient(List<ReservReference> reservRefernces_itog, List<LocalTime> timeslots, LocalTime time_resRef, ReservReference resRefSearch,  LocalDate current_date, Reference currentReference) {
        List<LocalTime> timeslots_new;
        if (current_date.getDayOfWeek() == DayOfWeek.SUNDAY || current_date.getDayOfWeek() == DayOfWeek.SATURDAY) {
            timeslots_new = currentReference.getTimeslotsHoliday();
        }
        else timeslots_new = currentReference.getTimeslots();
        if (timeslots_new.contains(time_resRef)) {
            if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(time_resRef.toString()) && reservReference.getDate().equals(resRefSearch.getDate()))) {

            }
            else {
                ReservReference newreservRef = new ReservReference();
                newreservRef.setReference(currentReference);
                newreservRef.setDate(resRefSearch.getDate());
                newreservRef.setTime(time_resRef.toString());
                newreservRef.setStatus(false);
                newreservRef.setClosedbron(true);
                reservRefernces_itog.add(newreservRef);
            }
        }
    }

    private void searchReservBlocks(List<ReservReference> reservRefernces_itog, LocalDate current_date, List<Reference> references) { // Метод поиска броней закрытого клуба для сотрудников в опреденную дату
        List<ReservBlock> reservBlocks = reservBlockRepository.findByDate(current_date); // поиск записей закрытия клуба
        for (ReservBlock rb: reservBlocks) { // проходим по всем записям
            for (Reference reference: references) { // по каждой услуге
                List<LocalTime> timeslots; // берем нужный там тайм слот
                if (current_date.getDayOfWeek() == DayOfWeek.SUNDAY || current_date.getDayOfWeek() == DayOfWeek.SATURDAY)
                    timeslots = reference.getTimeslotsHoliday();
                else timeslots = reference.getTimeslots();
                for (LocalTime timeslot: timeslots) { // в каждом тайм слоте каждой услуги выполняем действия
                    if (rb.isTimeSlotInRange(timeslot)) { // проверка если тайм слот находится в интервале закрытия клуба
                        if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(timeslot.toString()) && Objects.equals(reservReference.getReference().getId(), reference.getId()))) {
                            // проверка существует ли уже данная запись в бронировании по времени и услуге
                        }
                        else { // если не существует, то создаем ее
                            ReservReference newreservRef = new ReservReference();
                            newreservRef.setReference(reference);
                            newreservRef.setDate(current_date);
                            newreservRef.setTime(timeslot.toString());
                            newreservRef.setStatus(false);
                            newreservRef.setClosedbron(true);
                            reservRefernces_itog.add(newreservRef);
                        }
                    }
                }
            }
        }
    }

    private void searchReservBlocksClient(List<ReservReference> reservRefernces_itog, List<ReservBlock> foundReservBlocks, LocalDate current_date, Reference reference) { // тоже самое для клиентов как и выше
        for (ReservBlock rb : foundReservBlocks) { // ищем записи закрытого клуба в определенную дату
            List<LocalTime> timeslots; // тайм слоты у выбранной услуги
            if (current_date.getDayOfWeek() == DayOfWeek.SUNDAY || current_date.getDayOfWeek() == DayOfWeek.SATURDAY)
                timeslots = reference.getTimeslotsHoliday();
            else timeslots = reference.getTimeslots();
            for (LocalTime timeslot : timeslots) { // проходим по каждому тайм слоту в услуге
                if (rb.isTimeSlotInRange(timeslot)) {
                    if (reservRefernces_itog.stream().anyMatch(reservReference -> reservReference.getTime().equals(timeslot.toString()) && reservReference.getDate().equals(current_date))) {
                        // проверка существует ли уже данная запись в бронировании по дате и времени
                    } else { // если не существует, то создаем ее
                        ReservReference newreservRef = new ReservReference();
                        newreservRef.setReference(reference);
                        newreservRef.setDate(current_date);
                        newreservRef.setTime(timeslot.toString());
                        newreservRef.setStatus(false);
                        newreservRef.setClosedbron(true);
                        reservRefernces_itog.add(newreservRef);
                    }
                }
            }
        }
    }

    @Override
    public List<ReservReference> getAllReservReferences(String token) {
        if (authService.findTokenTrenerAdmin(token)) {
            return reservReferenceRepository.findAllNotNull();
        }
        else return null;
    }

    @Override
    public List<ReservReference> getAllReservReferencesByDateActive(String date) {
        return reservReferenceRepository.findByDateAndStatusTrueAndStatusNull(LocalDate.parse(date));
    }

    @Override
    public List<ReservReference> getAllReservReferencesByDateActiveFalse(String date, String token) {
        if (authService.findTokenTrenerAdmin(token)) {
            return reservReferenceRepository.findByDate(LocalDate.parse(date));
        }
        else return null;
    }

    @Override
    public List<ReservReference> getAllReservReferencesByStartDateAndEndDate(Short idReference) { // Отображение забронированных услуг для клиента
        int days_count = Integer.parseInt(Objects.requireNonNull(env.getProperty("application.days_count")));
        LocalDate datestart = LocalDate.now(BUSINESS_TIME_ZONE);
        LocalDate datefinish = datestart.plusDays(days_count+1);
        List<ReservReference> reservReferences = reservReferenceRepository.findByDateBetween(datestart, datefinish); // Забронированные услуги по интервалу даты
        List<ReservReference> reservReferences_itog = new ArrayList<>(reservReferences.stream()
                .filter(reservReference -> reservReference.getReference().getId().equals(idReference))
                .toList()); // Дополнительный список забронированных услуг для нашей услуги (idReference)
        LocalDate start_date = datestart; // Дата начала поиска броней
        Reference reference = referenceRepository.findByReference_Id(idReference); // Наша услуга (idReference)
        List<LocalTime> timeslots_reference = reference.getTimeslots(); // Таймслот для будней
        List<LocalTime> timeslotsHolidays_reference = reference.getTimeslotsHoliday(); // Таймслот для выходных
        List<ReservBlock> reservBlocks = reservBlockRepository.findByDateBetween(datestart, datefinish); // Закрытие клуба по интервалу даты
        while(start_date.isBefore(datefinish) || start_date == datefinish) { // Цикл для интервала броней на несколько дней
            LocalDate finalStart_date = start_date;
            List<ReservBlock> foundReservBlocks = reservBlocks.stream()
                    .filter(reservBlock -> reservBlock.getDate().equals(finalStart_date))
                    .toList();
            if (!foundReservBlocks.isEmpty()) {
                searchReservBlocksClient(reservReferences_itog, foundReservBlocks, finalStart_date, reference);
            }
            for (ReservReference resRef: reservReferences.stream()
                    .filter(reservReference -> reservReference.getDate().isEqual(finalStart_date) && (
                            (reservReference.getStatus() == null && !reservReference.getClosedbron()) ||
                                    (reservReference.getStatus() != null && reservReference.getStatus() && !reservReference.getClosedbron()) ||
                                    (reservReference.getStatus() != null && reservReference.getStatus() && reservReference.getClosedbron())
                            )
                    )
                    .toList()) { // Цикл для красных, рыжих и зеленых броней
                List<LocalTime> timeslots; // Рабочий таймслот
                if (start_date.getDayOfWeek() == DayOfWeek.SUNDAY || start_date.getDayOfWeek() == DayOfWeek.SATURDAY)
                    timeslots = new ArrayList<>(timeslotsHolidays_reference); // Для выходных
                else timeslots = new ArrayList<>(timeslots_reference); // Для будней
                LocalTime time_resRef = LocalTime.of(Integer.parseInt(resRef.getTime().split(":")[0]), Integer.parseInt(resRef.getTime().split(":")[1])); // Время брони resRef
                if (!timeslots.contains(time_resRef)) { // Проверка существует ли в таймслоте данное время
                    if (!(time_resRef.plusMinutes(resRef.getReference().getDuration()).isBefore(timeslots.get(0)) || time_resRef.minusMinutes(resRef.getReference().getDuration()).isAfter(timeslots.get(timeslots.size()-1))))
                        timeslots.add(time_resRef); // Если существует и оно находится внутри интервала, то добавляем его для дальнейшей работы
                }
                Collections.sort(timeslots); // Сортировка таймслота
                if (timeslots.indexOf(time_resRef) > 0 && timeslots.indexOf(time_resRef) < timeslots.size()-1) { // Работа с внутрянкой
                    searchCurrentForClient(reservReferences_itog, timeslots, time_resRef, resRef, start_date, reference);
                    searchRightForClient(reservReferences_itog, timeslots, time_resRef, resRef, reference);
                    searchLeftForClient(reservReferences_itog, timeslots, time_resRef, resRef, reference);
                }
                else if (timeslots.indexOf(time_resRef) == 0) { // Работа с первым элементом
                    searchCurrentForClient(reservReferences_itog, timeslots, time_resRef, resRef, start_date, reference);
                    searchRightForClient(reservReferences_itog, timeslots, time_resRef, resRef, reference);
                }
                else if (timeslots.indexOf(time_resRef) == timeslots.size()-1) { // Работа с последним элементом
                    searchCurrentForClient(reservReferences_itog, timeslots, time_resRef, resRef, start_date, reference);
                    searchLeftForClient(reservReferences_itog, timeslots, time_resRef, resRef, reference);
                }
            }
            start_date = start_date.plusDays(1); // Инкремент
        }
        reservReferences_itog
                .forEach(reservReference -> {
                    reservReference.setFioClient(null);
                    reservReference.setPhone(null);
                    reservReference.setCount_person(null);
                    reservReference.setDescription(null);
                    reservReference.setDescriptionAdmin(null);
                    reservReference.setEmail(null);
                });
        return reservReferences_itog;
    }

    @Override
    public boolean reservReference(ReservReference reservReference, String token) { // Бронирование админом
        if (authService.findTokenAdmin(token)) { // Проверка токена
            try {
                if (reservReference.getPhone() != null ) {
                    if (!Objects.equals(reservReference.getPhone(), "")) {
                        if (reservReference.getPhone().charAt(0) != '+')
                            reservReference.setPhone('+' + reservReference.getPhone()); // Добавление к номеру телефона '+' (если нету его)
                    }
                }
                boolean next = false;
                if (reservReference.getStatus() == null && reservReference.getClosedbron()) { // Проверка является ли данная бронь голубой
                    for (ReservReference rr : reservReferenceRepository.findByDateAndReference(reservReference.getDate(), reservReference.getReference())
                    ) { // Поиск услуг по дате и услуге
                        if ((rr.getTime().contains(reservReference.getTime())) && (!rr.getStatus() && !rr.getClosedbron() && rr.getDateConfirmCancel() == null))
                        { // Если нашел отмененную голубую бронь делает ее обратно активной, чтобы не было много записей в бд
                            rr.setClosedbron(true);
                            rr.setStatus(null);
                            reservReferenceRepository.save(rr);
                            next = true;
                            break;
                        }
                    }
                }
                if (!next)
                    reservReferenceRepository.save(reservReference);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        return false;
    }

    @Override
    public Boolean reservReferenceClient(ReservReference reservReference) { // Бронирование клиентом
        try { // Установка статусов для опознования неподтвержденной брони
            reservReference.setDateBron(new Date());
            reservReference.setStatus(null);
            reservReference.setClosedbron(false);
            if (reservReference.getPhone() != null ) {
                if (!Objects.equals(reservReference.getPhone(), "")) {
                    if (reservReference.getPhone().charAt(0) != '+')
                        reservReference.setPhone('+' + reservReference.getPhone()); // Добавление к номеру телефона +
                }
            }

            ZonedDateTime bookingMoment = ZonedDateTime.now(BUSINESS_TIME_ZONE);
            LocalDate localDateBron = bookingMoment.toLocalDate(); // Дата текущего бронирования
            LocalTime localTimeBron = bookingMoment.toLocalTime(); // Время текущего бронирования
            LocalTime timeEndBron; // Время последнего бронирования услуги
            LocalTime timeStartBron; // Время начала бронирования услуги
            LocalTime time_reservRef = LocalTime.of(Integer.parseInt(reservReference.getTime().split(":")[0]), Integer.parseInt(reservReference.getTime().split(":")[1])); // Получение LocalTime у брони

            // Клиент не может создать бронь на прошедшую дату или уже наступивший слот.
            // Эта проверка обязательна на сервере: список слотов на странице мог устареть,
            // а запрос к API можно отправить напрямую, минуя интерфейс.
            if (reservReference.getDate().isBefore(localDateBron) ||
                    (reservReference.getDate().isEqual(localDateBron) && !time_reservRef.isAfter(localTimeBron))) {
                return false;
            }

            if (localDateBron.getDayOfWeek() == DayOfWeek.SATURDAY || localDateBron.getDayOfWeek() == DayOfWeek.SUNDAY) {
                timeEndBron = LocalTime.parse(reservReference.getReference().getTimeEndHoliday());
                timeStartBron = LocalTime.parse(reservReference.getReference().getTimeStartHoliday());
            }
            else {
                timeEndBron = LocalTime.parse(reservReference.getReference().getTimeEnd());
                timeStartBron = LocalTime.parse(reservReference.getReference().getTimeStart());
            }

            if (localDateBron.plusDays(1).isEqual(reservReference.getDate())) { // Проверка если текущая дата бронирования равна дате на которую забронировали услугу +1 день, то есть забронировали сегодня на завтра
                if (localTimeBron.isAfter(timeEndBron)) { // Проверяем во сколько забронировали, если после времени окончания услуги, то выводим false
                    if (timeStartBron.plusMinutes(120).isAfter(time_reservRef)) {
                        return null;
                    }
                }
            }

            if (localDateBron.isEqual(reservReference.getDate())) { // Проверка если текущая дата бронирования равна дате на которую забронировали услугу, то есть забронировали сегодня утром на сегодня
                if (localTimeBron.isBefore(timeStartBron)) { // Проверяем во сколько забронировали, если до времени начала услуги, то выводим false
                    if (timeStartBron.plusMinutes(120).isAfter(time_reservRef)) {
                        return null;
                    }
                }
            }

            List<ReservReference> reservReferences = getAllReservReferencesByDateActive(reservReference.getDate().toString()); // Список броней на заданную дату бронирования
            List<ReservReference> reservRefernces_itog = new ArrayList<>(reservReferences); // Добавочный список для добавления синих броней

            for (ReservReference resRef: reservReferences
                    .stream()
                    .filter(rr ->
                            (rr.getStatus() == null && !rr.getClosedbron()) ||
                                    (rr.getStatus() != null && rr.getStatus() && !rr.getClosedbron()) ||
                                    (rr.getStatus() != null && rr.getStatus() && rr.getClosedbron()))
                    .toList())
            { // Цикл для всех красных, рыжих и зеленых броней
                List<Reference> references = referenceRepository.findByStatusTrueOrderByUpdatedAsc(); // Список всех доступных услуг
                for (Reference reference : references) { // Цикл для получения таймслотов у услуг
                    List<LocalTime> timeslots; // Таймслоты у услуг
                    if (reservReference.getDate().getDayOfWeek() == DayOfWeek.SUNDAY || reservReference.getDate().getDayOfWeek() == DayOfWeek.SATURDAY) // Проверка на выходные или будни
                        timeslots = reference.getTimeslotsHoliday();
                    else timeslots = reference.getTimeslots();
                    LocalTime time_resRef = LocalTime.of(Integer.parseInt(resRef.getTime().split(":")[0]), Integer.parseInt(resRef.getTime().split(":")[1])); // Получение LocalTime у брони
                    if (!timeslots.contains(time_resRef)) { // Проверка существует ли в данном таймслоте время бронирования
                        if (time_resRef.plusMinutes(resRef.getReference().getDuration()).isBefore(timeslots.get(0)) || time_resRef.minusMinutes(resRef.getReference().getDuration()).isAfter(timeslots.get(timeslots.size()-1)))
                        {
                            // Проверка на границы начала и конца (чтобы следующая бронь была в интервале)
                        }
                        else timeslots.add(time_resRef);
                    }
                    Collections.sort(timeslots); // Сортировка таймслотов
                    if (timeslots.indexOf(time_resRef) > 0 && timeslots.indexOf(time_resRef) < timeslots.size()-1) { // Работа с внутрянкой
                        searchCurrent(reservRefernces_itog, time_resRef, resRef, reservReference.getDate(), new Reference(reference));
                        searchRight(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                        searchLeft(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                    }
                    else if (timeslots.indexOf(time_resRef) == 0) { // Работа с первым элеметном
                        searchCurrent(reservRefernces_itog, time_resRef, resRef, reservReference.getDate(), new Reference(reference));
                        searchRight(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                    }
                    else if (timeslots.indexOf(time_resRef) == timeslots.size()-1) { // Работа с последним элементом
                        searchCurrent(reservRefernces_itog, time_resRef, resRef, reservReference.getDate(), new Reference(reference));
                        searchLeft(reservRefernces_itog, timeslots, time_resRef, resRef, reference);
                    }
                }
            }

            if (reservRefernces_itog.stream().anyMatch(rr -> rr.getReference().getId().equals(reservReference.getReference().getId()) && rr.getTime().equals(reservReference.getTime()))) // Проверка существует ли по заданному времени бронирование, если нет - то сейв.
                return false;

            reservReferenceRepository.save(reservReference);
            return true;
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public List<ImgReference> getAllImageByReferences() {
        return imgReferenceRepository.findAll();
    }

    @Override
    public List<Birthday> getAllBirthdays() {
        return birthdayRepository.findAll();
    }

    @Override
    public List<Birthday> getAllBirthdaysForClient() {
        return birthdayRepository.findByStatusTrue();
    }

    @Override
    public List<ReservBlock> getAllReservBlocks(String date, String token) {
        if (authService.findTokenTrenerAdmin(token)) {
            return reservBlockRepository.findByDate(LocalDate.parse(date));
        }
        else return null;
    }

    @Override
    public List<Map<String, Object>> getTopReferences() { // Получение топ услуг
        List<Map<String, Object>> newList = new ArrayList<>();
        for (Object[] o: referenceRepository.countReservationsByReference()) {
            Long count = (Long)Arrays.stream(o).toList().get(1);
            Reference ref = (Reference)Arrays.stream(o).toList().get(0);
            Map<String, Object> reservationInfo = new HashMap<>();
            reservationInfo.put("reference", ref);
            reservationInfo.put("count", count);
            newList.add(reservationInfo);
        }
        return newList;
    }

    @Override
    public Map<String, Object> getDate() {
        Map<String, Object> dateInfo = new HashMap<>();
        dateInfo.put("date", LocalDate.now());
        dateInfo.put("days_count", env.getProperty("application.days_count"));
        return dateInfo;
    }
}
