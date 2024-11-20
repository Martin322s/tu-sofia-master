# Fork from https://stackblitz.com/~/github.com/MrKotov/web-dev-2024-express

1. Create new model and route for `Subjects` with `POST` endpoint for subject creation.
2. Link the `subjects` to `users` so that One User ca have many Subjects. - https://sequelize.org/docs/v6/core-concepts/assocs
3. Update `POST` `/user` method to account for the change.
4. Add an `PUT` endpoint `/user/subjects` from which we can update the `Subjects` of the user such as `subjects: [1,2,3]`.