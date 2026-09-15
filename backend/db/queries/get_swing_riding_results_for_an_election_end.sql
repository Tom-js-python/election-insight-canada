SELECT 	district_number, district_name, candidate_name, party_key, party_name, vote_count,
				vote_share, outcome, margin_votes, margin_percentage_points
FROM calculated_results
WHERE district_number IN (
	SELECT district_number
	FROM calculated_results
	WHERE party_key = %(party_key)s 
	AND CASE
			WHEN %(max_margin_votes)s::integer IS NOT NULL
			THEN margin_votes <= %(max_margin_votes)s
			ELSE margin_percentage_points <= %(max_margin_percentage_points)s
			END
	AND (
	    %(outcome)s = 'both'
	    OR (%(outcome)s = 'win' AND outcome='win')
	    OR (%(outcome)s = 'loss' AND outcome='loss')
	    )
	)
ORDER BY district_number, vote_count DESC, party_name;