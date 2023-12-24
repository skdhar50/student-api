# Student Registration

## API Endpoints

    /api/student
    /api/student?id=2
    /api/enroll
    /api/course

## Description

## **Student**

| Method Type | API               | Des                                                                                  |
| ----------- | ----------------- | ------------------------------------------------------------------------------------ |
| GET         | /api/student      | To get all students                                                                  |
|             | /api/student?id=2 | To get single student                                                                |
| POST        | /api/student      | To create single or multiple student. **Note: The data must be passed inside an []** |
| DELETE      | /api/student?id=2 | To delete a single student                                                           |
| PATCH       | /api/student?id=2 | To update the info of the student                                                    |

## **Course**

| Method Type | API         | Des                                                                                  |
| ----------- | ----------- | ------------------------------------------------------------------------------------ |
| POST        | /api/course | To create single or multiple student. **Note: The data must be passed inside an []** |

## **Enroll**

| Method Type | API         | Des                     |
| ----------- | ----------- | ----------------------- |
| POST        | /api/enroll | To create an enrollment |

## **Dummy Data**

## Student

    [
    	{
    		"first_name":  "Student 1",
    		"last_name":  "Demo 1",
    		"grade":  "7th"
    	},
    	{
    		"first_name":  "Student 2",
    		"last_name":  "Demo 2",
    		"grade":  "7th"
    	},
    	{
    		"first_name":  "Student 3",
    		"last_name":  "Demo 3",
    		"grade":  "10th"
    	},
    ]

## Course

    [
        {
    		"course_name":  "English",
    		"course_code":  "E-101"
    	},
    	{
    		"course_name":  "Bangla",
    		"course_code":  "B-101"
    	},
    	{
    		"course_name":  "Religion",
    		"course_code":  "R-101"
    	},
    ]

## Enroll

    [
        {
    		"course_id":  "1",
    		"student_id":  "1"
    	}
    ]
