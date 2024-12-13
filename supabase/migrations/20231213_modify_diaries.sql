-- Remove title column and add diary_date column
ALTER TABLE diaries
DROP COLUMN title,
ADD COLUMN diary_date DATE NOT NULL DEFAULT CURRENT_DATE;
