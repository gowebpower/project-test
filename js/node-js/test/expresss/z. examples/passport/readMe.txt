
Currently app saves session as file and user data saves in fake database (global variable object)
- dont use supervisor when test fake database. it crushes and then variable resets.





// No need this for app_fb-db
"session-file-store": "^0.2.1"

// This include mysql. so I think no need to include mysql again if i need it.
"express-mysql-session": "^1.1.1"



// only for app_fb-db
"connect-flash": "^0.1.1",
