Web Application Performance Analyzer
====================================

WAPA is a HTML5 application performance tuning tool, which statically analyzes HTML5 application's source code and provides recommendations for performance optimization. 

To use WAPA, please perform the following steps.
 
1.  Download the WAPA using github or just download the WAPA.zip from WAPA homepage, move or unzip all the WAPA files(analyzers, bin, LICENSE, pathches, server, shared, tests, main,js, package.json, README.md and wapa.js) into a folder named WAPA-master (or any other name you want).

2.  Download the stable version of node.js (node-v0.8.14)at: 
32bit : http://nodejs.org/dist/v0.8.14/node-v0.8.14-x86.msi.
64bit : http://nodejs.org/dist/v0.8.14/x64/node-v0.8.14-x64.msi  

      Double click the node-v0.8.14-xxxx.msi and install it, for more download and installation information of node.js, you can find at  http://nodejs.org/download/

3.  Download the 11 related modules:  cssom, esprima, htmlparser, jessie, msexcel-builder, readdirp, underscore, express, temporary, unzip and wrench. Using command "npm install module name" to implement this task.
    For Example:

            npm install express  //this command install the express module

4.  Create a new folder "node_modules" under the WAPA-master folder or the folder that you move the WAPA files into, and copy the first seven modules (cssom, esprima, htmlparser, jessie, msexcel-builder, readdirp and underscore) that downloaded at step 3 into this new folder. Command "npm root" can show the path where these downloaded modules are stored.

5.  Create a new folder "node_modules" under WAPA-master\server folder, and copy the remaining four modules (express, temporary, unzip and wrench) that downloaded at step 3 into this new folder.

    
    
    There is two methods to access WAPA: step 6 uses browser to access WAPA, step 7 uses command.      
 
6.  Using  command  "node YOU-WAPA-ROOT\server\app.js" to start the server of WAPA. YOU-WAPA-ROOT is the root directory of the WAPA files.       

    Open a browser and enter "http://localhost:8888/", the homepage of WAPA will be shown.

7.  Alternatively, Using command to access WAPA is OK: 

            node  YOU-WAPA-ROOT\main.js  PROJECT-ROOT

    PROJECT-ROOT is the root directory of the project that you want to analyze. The result is stored as WapaAnalyzeResult.xlsx under the PROJECT_ROOT.


