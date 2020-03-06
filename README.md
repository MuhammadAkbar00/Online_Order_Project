# inDine3231

To add this project to your intellij do this:
* Open IntelliJ and create a new project from version control
* On the left click on the github tab, log in using your Github user and password
* Then click on the Repository URL tab and enter a repository URL, enter this: https://github.com/Ramo-94/inDine3231.git and pick a path of your choice
* After it's done cloning you'll be asked if you want to make a project from the sources you checked out, click yes
* Intellij will detect the project as a maven project and it will ask you at the bottom right of your screen if you want to add the project as a maven project, make sure to do so
* Then on the bottom right, click on Git:master and pick your name from the list of remote branches, then press checkout
* After that's done, right click on your pom.xml file, and head to Maven, then pick reimport and wait for it to finish.
* Go to your DemoApplication file in the src folder and you should be asked to set up an SDK for the project, choose that and pick a java version that is at least 1.8 or higher.
* Reimport the pom file again and you should now be able to see the Run button turn green and your base project should work.
* The database is there but it doesn't show up, open the database tab and click the add button, choose HSQLDB as usual but then select the path, when you get the file selection menu, select the file called db.lck found in the db folder in your project files, then click ok. You should then find the database files and tables.
* Git might ask you to Always add to local changes, pick yes.

## How to commit changes

When you commit changes, intelliJ adds them locally, to upload them you need to push those changes.
When you click the green check mark you'll see a commit page, on this page make sure you uncheck the libraries box inside the .idea folder and the target folder, then click the menu arrow next to commit to commit and push at the same time, then make sure that you're committing it to your branch not the master branch. You'll see on the top-middle that it says commit to master branch, you can edit the word master and change it to your name before you push the changes.

Good luck.
