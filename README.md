CMU Printer API
===============

A super simple API to check the status of Carnegie Mellon's printers. 
Built on [Node][1], [Express][2], and [Cheerio][3].

Scrapes data from CMU's [Printer Status][4] page.

Install
-------

    git clone https://github.com/bichiliad/printerApi.git
    cd printerApi && npm install
    node server.js

Endpoints
---------

###```/printers```
JSON endpoint containing information about every printers.

####```ttl:```
Time left until cache invalidation  


####```printers```
An array of printer objects. Each object has the following parameters:
 * ```name```: The full name of the printer
 * ```message```: The message on the LCD screen of the printer
 * ```status``` : The printer's reported status
 * ```timestring```: Time of last update
 * ```trays```: An array of strings representing tray statuses (index 0 = tray 1)
 * ```ready```: A boolean representing whether or not the printer is ready to print.
 * ```error```: If the printer is not ready, this is a string representing the issue.


Demo
----

You can check it out here. I haven't quite bought a domain name for it yet, but it's there.
http://198.211.113.33:3000/printers

[1]: http://nodejs.org/
[2]: http://expressjs.com/
[3]: https://github.com/MatthewMueller/cheerio
[4]: https://clusters.andrew.cmu.edu/printerstats/
