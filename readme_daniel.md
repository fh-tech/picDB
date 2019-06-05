zeitschreibung: https://docs.google.com/spreadsheets/d/1UceaNutHaUbVQYaRpuH2aM7BSHu2M4Z0cSzFYLjTjFQ/edit?usp=sharing

Anwendung:

Aufgrund der Architektur ist die ausführung zurzeit nur über cmdline möglich.
Zuerst muss der Server mit `dotnet run` ausgefürht werden, dann kann das frontend mittels npm run electron:local gestartet werden.
Datenbank location kann in den application.settings eingestellt werden.

Lösung:

Da ich dieses Semester keine Desktop Anwendung schrieben wollte habe ich das projekt als client server projekt mit electron-angular
frontend und dotnet core backend geschrieben. Kommunikation zwischen den beiden läuft über REST und Websockets (SignalR).
Pdfs werden mit hilfe der jsreport library erstellt.


Worauf ich stolz bin:

Die SingnalR Kommunikation zwischen client und server für die Progress updates 
finde ich sehr gelungen und war im endefekt auch einfach zu realisieren. Am Server hat man dafür Client callback funktionen, 
die in den lange an dauernden fnuktionen periodisch aufgerufen werden, und am client hört man einfach auf diese msgs 
zu und updated den loading screen.


Was ich nächstes mal anders machen würde:

Die System Architektur (Server/Client, Angular-electron/dotnetcore) ist meiner Meinung für ein solches projekt nicht günstig
und viel zu aufwendig. Im nächsten projekt werde ich versuchen keine special extras zu machen um im zeit buget zu bleiben.
Neue Technologien sind zwar interessant aber für kleiner projekt eher aufwendig. 