SELECT 
    SUBSTRING(FIRST_NAME, 1, 1) AS "First Initial",
    SUBSTRING(LAST_NAME, 1, 1) AS "Last Initial",
    SUBSTRING(DATE, 1, 4) AS "Birth Year",
    UPPER(TRIM(LOCATION)) AS "Corrected Location"
FROM EMPLOYEE;
