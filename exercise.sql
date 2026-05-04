SELECT * FROM EMPLOYEE
WHERE SUBSTRING(FIRST_NAME, 1, 1) as "First Initial"
AND (SUBSTRING(LAST_NAME, 1, 1) as "Last Initial")
And (SUBSTRING(DATE(DATE) 1, 4) as "Birth Year")
AND (UPPER(TRIM(LOCATION)) as "Corrected Location")
