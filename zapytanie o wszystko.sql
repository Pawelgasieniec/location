SELECT
    a.nazwa_akcji
    , a.opis_akcji
    , ta.nazwa_typu_akcji
    , o.imie
    , o.nazwisko
    , m.nazwa_miejsca
    , m.opis_miejsca
    , tm.nazwa_typu_miejsca
FROM
    akcje a
JOIN typy_akcji ta ON
    ta.typ_akcji_id = a.typ_akcji_id
JOIN akcje_osoby ao ON
    ao.akcja_id = a.akcja_id
JOIN osoby o ON
    o.osoba_id = ao.osoba_id
JOIN osoby_miejsca om ON
    om.osoba_id = o.osoba_id
JOIN miejsca m ON
    m.miejsce_id = om.miejsce_id
JOIN typy_miejsc tm ON
    tm.typ_miejsca_id = m.typ_miejsca_id
