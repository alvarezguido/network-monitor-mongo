# network-monitor-mongo
This is a node.js app which takes rx_bytes in a selected interface from Linux Kernel /sys directory. It calculates received bytes and plot it with Chart.js library.
Every 5 seconds (which you can change, of course) the program calculates the difference in total rx_bytes, so you always get all traffic in that 5 seconds (It isn't getting current traffic, instead It gets acumulative traffic). Then it saves data in JSON format, into MongoDB.

I used Chart.js library, which is pretty nice and responsive too, to plot all data from database, by making a fetch to the server (client do not interact with mongo directly).

I also used Skeleton as a CSS template, for adding functions and buttons.
You can display traffic in bps, kbps or mbps by selecting it on the page.

Displayed traffic is dated (with day, month and year)


#Requisites:
You will need node js and mongodb installed.
$ sudo apt install nodejs
$ sudo apt install mongodb

#Prepare the project:
1. Drop all the files in your desire folder.
2. Perfom, inside that folder:
$ npm init
$ npm install express --save
$ npm install mongoose --save
$ npm install systeminformation --save

#Init
Init the server by using: 
$ node server.js
In your browser, perform: http://localhost:1500

#Sample
![sample](https://user-images.githubusercontent.com/47746423/82758116-05cd3080-9dbb-11ea-964e-65f602ac7ac0.jpeg)
