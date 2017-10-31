# Eventplanner

This project wants to grow into a eventplanner written in node and react.

The core of this planner are invite-only events which are organized around a interactive task list with deadlines.

There will be both individual tasks (organizing transportation for yourself to the venue) and group tasks (organizing a food buffet for everyone), which might include further tasks, a chatroom or documents.

The idea is to assign those tasks to participants or to allow for participants to sign up for the tasks themselves. 

In order to accomodate communication the planner will include a full fledged chat client using pushmessages and notifications.

Furthermore it will include a user-dashboard featuring upcoming events, accepted tasks and warn if a task deadline is close.

# Building the project
npm install
npm run-script build

# Starting the Server

provide environment variables:

* EVENT_PORT=12345
* EVENT_HOME=/home/event/server/
* EVENT_CLIENT=/home/event/dist/
* EVENT_DB_HOST=localhost
* EVENT_DB_PORT=23456
* EVENT_DB_USERNAME=NameOfDBUser
* EVENT_DB_PASSWORD=SaveRandomPassword
* EVENT_DB_NAME=NameOfDBToUse

* ADMIN_DB_USERNAME=MySQLAdminUser
* ADMIN_DB_PASSWORD=MySQLAdminPassword


node server/setup.js
node server/index.js