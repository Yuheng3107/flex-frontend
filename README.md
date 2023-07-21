### Frontend for Flex 
This repo hosts the frontend for the MVP of Flex, which aimed to provide real-time form correction using Machine Learning. It was made public as the startup idea failed to take off due to lack of experience in prospecting the market.

### Exercises

## Exercise ID (DATABASE)

1: Squat
2: Push-Ups
3: Hamstring Stretch

## Exercise ID (FORM CORRECTION)

1: Side Squat
2: Front Squat
3: Push-Ups
4: Knee Push-Ups
5: Hamstring Stretch Left Leg (side view)
6: Hamstring Stretch Right Leg (side view)
7: Arm Circles
8: Jump Rope

## To get list of exercises

`exercise/list/all` POST

## To update user exercise statistics

`exercise_statistics` GET (PK)
`exercise_statistics/update` POST (exercise_id, perfect_reps, total_reps) at least one of either perfect reps or total reps. THIS AUTOMATICALLY UPDATES GLOBAL STATS
