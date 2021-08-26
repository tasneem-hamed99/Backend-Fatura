# Backend-Fatura

*Steps to get the code running:
1) Open VS Code
2) File -> Open Folder -> faturabackend
3) Terminal -> New Terminal
4) In the command window type the following : npm run devStart
5) Then Write another command : npm run devStartAuth
6) To check the login and the logout services choose the file "requests.rest"
7) Start sending requests to login and you will see the access token and refresh token for specefic user and by changing the username according to the attached usernames found at line 11 and line 15 at the file named "service"
8) to log a specific user out of the system, send a login request, copy the refresh token at the response window that named "refresh" to the token of the POST request of the "refresh" route found at line 19 at the file "requests.rest", then copy the access token of the same user at the response window that named "token" to the authorization header that called "Bearer" at line 2 at the same file then send the DELETE request
