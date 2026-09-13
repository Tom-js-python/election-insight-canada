INSERT INTO political_parties(
    party_key,
    source_name_english,
    source_name_french,
    long_display_name_english,
    long_display_name_french,
    short_display_name_english,
    short_display_name_french
)
VALUES %s
ON CONFLICT (party_key) DO UPDATE SET
    source_name_english = EXCLUDED.source_name_english,
    source_name_french = EXCLUDED.source_name_french,
    long_display_name_english =
        EXCLUDED.long_display_name_english,
    long_display_name_french =
        EXCLUDED.long_display_name_french,
    short_display_name_english =
        EXCLUDED.short_display_name_english,
    short_display_name_french =
        EXCLUDED.short_display_name_french;