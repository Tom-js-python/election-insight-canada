SELECT
    ed.district_number,
    ed.name_english AS district_name,
    CONCAT_WS(' ',c.first_name, c.middle_name , c.family_name) as candidate_name,
    pp.name_english AS party_name,
    SUM(vc.vote_count) AS vote_count
FROM vote_counts AS vc
JOIN polling_divisions AS pd
    ON vc.polling_division_id = pd.id
JOIN candidates AS c
    ON vc.candidate_id = c.id
JOIN political_parties AS pp
    ON c.political_party_id = pp.id
JOIN electoral_districts AS ed
    ON pd.district_number = ed.district_number
join elections as el
	on pd.election_id = el.id
WHERE el.election_label = %(election_label)s
GROUP BY
    ed.district_number,
    ed.name_english,
    c.id,
    pp.name_english
ORDER BY
    ed.district_number,
    pp.name_english;