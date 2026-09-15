SELECT 	district_number, district_name, candidate_name, party_key, party_name, vote_count,
				vote_share, outcome, margin_votes, margin_percentage_points
FROM calculated_results
ORDER BY district_number, vote_count DESC, party_name;