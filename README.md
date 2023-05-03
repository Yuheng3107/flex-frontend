### Exercises

## Exercise ID (DATABASE)

1: Squat
2: Push-Ups
3: Hamstring Stretch

## Exercise ID (FORM CORRECTION)

0: Side Squat
1: Front Squat
2: Push-Ups
3: Hamstring Stretch Left Leg (side view)
4: Hamstring Stretch Right Leg (side view)

## To get list of exercises

`exercise/list/all` POST

## To update user exercise statistics

`exercise_statistics` GET (PK)
`exercise_statistics/update` POST (exercise_id, perfect_reps, total_reps) at least one of either perfect reps or total reps. THIS AUTOMATICALLY UPDATES GLOBAL STATS
