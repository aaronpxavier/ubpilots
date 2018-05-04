# UBPA Web Application

[![Gitter chat](https://badges.gitter.im/USER/REPO.png)](https://gitter.im/UB-Pilots-Association-Dev-Team "Gitter chat")

## Setup 
1. Start node/express development server. (See README in /backend)
2. Start ng2 development server. (See README in /frontend)

## Special notes for testing
 Admin and regular users have different privilges on the site. 
 Flight log submissions by admin are confirmed right away and will immediately apear on the flight log table. 
 If a normal user makes a flight log submission it has to be confirmed by an admin before it apears on the flight logs table. 
 You will have to signout as regular user and sign back in as admin to confirm the logs and see the submission on the table.
 The option to confirm flight log submissions will be in the admin menu which will be available through a drop down on the nav bar once you login with the appropriate credentials.
 Admin users also have the option to delete or edit log entries. 

**Anyone testing the app should reach out to us on gitter for the admin credentials.**

## Production Site (Non Tech User)
[UBPilots Site](https://ubpilots.com/)


## Project Description. 
Project will create a web application that supports the UB pilot's association. 
1. MVP (minimum viable product) will consist of a landing page, user login & authentication, 
user sign up page (restricted to people with *@buffalo.edu email accounts), an admin page for 
club officers to validate user flight log submissions and a page that will contain a html table of all 
flight log entries. Table will be loaded dynamically with data queried from a backend web api. All 
flight log data will be stored and retrieved from a mongoDB database. 
2. Add on Features <details>
    <summary>Admin Resources</summary>
     Allow admin user to edit and change images on landing page. 
     </details> <details>
    <summary>Messaging</summary>
     Admin User has ability to make announcements that gets posted on web page, facebook page, twitter, and sent via email.
    </details> <details>
    <summary>Club E-Board</summary>
    Create a page that contains club E-Board. 
     Admin has ability to change content of page through a web application interface.
    </details>
    
 Prototype: https://youtu.be/kUIHj_HXadQ <br />
 Alpha: https://youtu.be/ZYCBLVYwpwQ <br />
 Beta: https://youtu.be/LZ4thBqFBZw <br />
 Official Release: https://youtu.be/D-XqftUMDrk

    
    

## User Story 
The UB Pilot's Association is a student organization that serves a community of certified pilots,
aspiring pilots and aviation enthusiasts. The pilot's association currently has a simulator room that 
provides flight training to people with interest in learning to fly. Additionally, the sim room provides a 
way for current pilots to keep their skills sharp while they are in school. One of the things 
we do in the sim room is have people log their flight time on a white board. When the white board is full, 
we transfer the info onto a excel spread sheet. This is a tedious and inefficient way to work. A web 
application could simplify this by providing a way for people to create their own user accounts and log 
their time through a html form. All the logged time will get stored in a database.

## Technology
* Node (see README.md in /backend)
* Angular 5 (see README.md in /frontend)
* Ubuntu 16.04 Xenial
* Nginx (web server/reverse proxy/load balancer)
* PM2 (production process manager)

## License

MIT License

Copyright (c) 2018 UBPA (University at Buffalo Pilot's Association)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
