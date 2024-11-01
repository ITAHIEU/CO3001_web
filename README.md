# Giới thiệu hệ thống HCMUT - SPSS

![Giao diện chính hệ thống](images/gd1.png)

# Overview
The HCMUT Smart Printing Service (HCMUT-SSPS) is a system designed to offer students
a more convenient, efficient, and accessible way to print their academic documents across various
campuses of Ho Chi Minh University of Technology (HCMUT). This service involves multiple
printers placed strategically in different buildings and rooms across campuses, allowing students
to upload their documents digitally, configure print settings, and select a suitable printer. Key
features include the ability to manage paper size, print double-sided, and determine the number
of copies. Additionally, the system is integrated with online payment services, such as BKPay,
and tracks students’ print quotas. The system is closely regulated by a Student Printing Ser-
vice Officer (SPSO), who oversees printer management, system configurations, and log tracking.
Authentication for all users is handled through the university’s single sign-on (HCMUT_SSO)
system, ensuring secure access.

# Technology stack
- Front_end: reactjs ??
- Back_end: nodejs ??
- Database: SQL || mySQL ??

# Drawback
- No authorization between students and SPSOs
- Payment methods not integrated

# How to install ?
To use the application, you can follow the following steps:
## Clone the repository
Open a terminal at a directory of your choice and enter these commands (change the folder name if you want to):

```bash
git clone https://github.com/ITAHIEU/CO3001_web.git
cd HCMUT_SSPS
```

Inside CNPM_HCMUT_SSPS folder, you will see several subfolders: client, server, etc.

## Install dependencies
First, you need to have NodeJS. If you haven't installed before, please visit [Node.js](https://nodejs.org/) and download it.

Next, you have to install all the dependencies of our project. Let's go to the "server" directory first and enter these commands:


```bash
cd server
npm install
```

Then, go to the "client" directory and do the same thing by entering these commands:
```bash
cd client
npm install
```
You have installed all the dependencies.

# Set up a database server
The application will also need a MySQL server for the backend to connect to the database
