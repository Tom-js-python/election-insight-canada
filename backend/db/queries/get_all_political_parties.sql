SELECT party_key, source_name_english, source_name_french, long_display_name_english, long_display_name_french,
       short_display_name_english, short_display_name_french
FROM political_parties
ORDER BY long_display_name_english;