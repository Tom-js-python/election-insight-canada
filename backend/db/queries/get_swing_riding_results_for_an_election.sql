WITH vote_counts AS
	(SELECT
		ed.district_number,
		ed.name_english AS district_name,
		CONCAT_WS(' ', c.first_name, c.middle_name, c.family_name) AS candidate_name,
		pp.name_english AS party_name,
		SUM(vc.vote_count) AS vote_count
	FROM vote_counts AS vc
	LEFT JOIN candidates AS c
		ON vc.candidate_id = c.id
	LEFT JOIN polling_divisions AS pd
		ON vc.polling_division_id = pd.id
	LEFT JOIN political_parties AS pp
		ON c.political_party_id = pp.id
	LEFT JOIN electoral_districts AS ed
		ON pd.district_number = ed.district_number
	LEFT JOIN elections AS el
		ON pd.election_id = el.id
	WHERE el.election_label = %(election_label)s
	GROUP BY
		ed.district_number,
		ed.name_english,
		c.id,
		pp.name_english),
rank AS
	(SELECT 	district_number, district_name, candidate_name, party_name, vote_count,
				DENSE_RANK() OVER(PARTITION BY district_number ORDER BY vote_count DESC) AS candidate_rank
	 FROM vote_counts),
margin AS 
	(SELECT 	district_number, district_name, candidate_name, party_name, vote_count, candidate_rank,
		CASE
		    WHEN candidate_rank = 1 THEN
		        vote_count - 
		        NTH_VALUE(vote_count, 2) OVER (
		            PARTITION BY district_number
		            ORDER BY vote_count DESC
		            ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
		        )
		    ELSE
		        FIRST_VALUE(vote_count) OVER (
		            PARTITION BY district_number
		            ORDER BY vote_count desc
		        ) - vote_count
		END AS margin,
		CASE
			WHEN candidate_rank = 1 THEN 'win'
			ELSE 'loss'
		END AS outcome
	FROM rank)
SELECT district_number, district_name, candidate_name, party_name, vote_count
FROM vote_counts
WHERE district_number IN (
	SELECT district_number
	FROM margin
	WHERE party_name = %(party_name)s AND margin <= %(margin)s
	AND (
	    %(outcome)s = 'both'
	    OR (%(outcome)s = 'win' AND outcome='win')
	    OR (%(outcome)s = 'loss' AND outcome='loss')
	    )
	)
ORDER BY district_number, party_name;