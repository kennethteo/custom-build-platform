db = db.getSiblingDB('local_database'); // Switch to the target database

db.createUser({
  user: "app_user",
  pwd: "app_password",
  roles: [
    { role: "readWrite", db: "local_database" } // Grant read and write access to the database
  ]
});
