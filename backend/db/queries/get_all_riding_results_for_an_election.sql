WITH candidate_vote_counts AS
	(SELECT
		ed.district_number,
		ed.name_english AS district_name,
		CONCAT_WS(' ', c.first_name, c.middle_name, c.family_name) AS candidate_name,
		pp.party_key,
		pp.long_display_name_english AS party_name,
		SUM(vc.vote_count) AS vote_count,
		c.elected_candidate
	FROM vote_counts AS vc
	JOIN candidates AS c
		ON vc.candidate_id = c.id
	JOIN polling_divisions AS pd
		ON vc.polling_division_id = pd.id
	JOIN political_parties AS pp
		ON c.political_party_key = pp.party_key
	JOIN electoral_districts AS ed
		ON pd.district_number = ed.district_number
		AND pd.election_id = ed.election_id
	JOIN elections AS el
		ON pd.election_id = el.id
	WHERE el.election_label = %(election_label)s
	GROUP BY
		ed.district_number,
		ed.name_english,
		c.id,
		pp.party_key,
		pp.long_display_name_english),
riding_metrics AS 
	(SELECT *,
	SUM(vote_count) OVER (partition by district_number) AS total_votes,
	MAX(vote_count) FILTER (WHERE elected_candidate) OVER (PARTITION BY district_number) AS winner_vote_count,
	MAX(vote_count) FILTER (WHERE NOT elected_candidate) OVER (PARTITION BY district_number) AS runner_up_vote_count
	FROM candidate_vote_counts),
candidate_metrics AS 
	(SELECT *,
		CASE
			WHEN elected_candidate THEN 'win'
			ELSE 'loss'
		END AS outcome,
		CASE
		    WHEN elected_candidate THEN vote_count - runner_up_vote_count
		    ELSE winner_vote_count - vote_count
		END AS margin_votes
	FROM riding_metrics)
SELECT district_number, district_name, candidate_name, party_key, party_name, vote_count,
		vote_count::numeric / NULLIF(total_votes,0) AS vote_share, outcome, margin_votes,
		margin_votes::numeric * 100 / NULLIF(total_votes, 0) AS margin_percentage_points
FROM candidate_metrics
ORDER BY district_number, vote_count DESC, party_name;