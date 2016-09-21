# TripMaker
A web app for organizing your get aways

Google MAP API doc sites
https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
https://developers.google.com/maps/documentation/geocoding/start?hl=en_US

========parameters are on this url=============
https://developers.google.com/maps/documentation/embed/guide#street_view_mode


Google MAP API console
https://console.developers.google.com/apis/dashboard?project=tripmaker-143922&duration=P30D

============================Git Instructions================

FORKING

1. Elect a project "lead".
2. CHROME Have the project lead create a repo in their github.
3. Push the current project to that repo.
4. Partners navigate to the lead's github and "fork" the repo.
5. Navigate to your own github, you should see this fork in your github ui.
6. Clone the fork onto your computer.
7. FOLLOW ADDING CODE FLOW (NO ONE SHOULD COMMIT/PUSH TO MASTER)
8. Navigate to your forked version of the repository (your profile in github), you should see a "Create Pull Request" button. Click this.
9. Ensure that the pull request is of your branch compared to the lead's master branch. (should happen automatically)
10. Submit pull request.
11. Team lead can now merge the code into their repository.


ADD COLLABORATORS

1. Elect a project "lead".
2. Have the project lead create a repo in their github.
3. Push the current project to that repo.
4. Project lead navigates to "Collaborators" inside new repo and adds partners by github user name.
5. Partners clone this repository onto their computers.
6. FOLLOW ADDING CODE FLOW (NO ONE SHOULD COMMIT/PUSH TO MASTER)
7. Navigate to lead projects' github (your leads' github profile in github) you should see a "Create Pull Request" button. Click this.
8. Submit pull request.
9. Anyone can merge the code.

ADDING CODE

1 Checkout the master branch and pull it to ensure you have the latest version of working code.
 - `git checkout master`
 - `git pull`
2. Create a new branch off of master
 - `git checkout -b <branch_name>`
 - Example: `git checkout -b feature-add-firebase`
3. Begin writing code.
4. Add changes, commit changes, and push the branch
 - `git add .`
 - `git commit -m "a message that makes sense"`
 - `git push origin feature-add-firebase`
 - 
 Coding Tasks:
-create 1st page:
  -back drop image (slightly faded)
  -create fixed "window" with logo , definition , add trip button and view trip button

  -create "Modal" x 2 
    -add trip fields:
      -name
      -email
      -"where would you like to go?" (provide example in the form)
      -how long would you like to stay?
    -view trips
      -add field for desitation?
      -add field for how long?
      
   -create add trip screen:
     - google map API loaded on right hand side
     -weather forecast API Div
     -top nav bar : logo on left hand side,  add trip | view trip buttons on the right hand side
     -create left div 35% of the screen
       -show destination and length of stay on the top
       -add toDo/see button, eat n' Drink button, places to stay button
       -add input field for activities/places to eat/stay
       -add div for toDo/places to eat/ places to stay
       -add function to delete each activity/places to eat/stay



 
