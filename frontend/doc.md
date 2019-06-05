## Lösungsbeschreibung

### Genereller Programmablauf

Frontend ist ein Electron Browserwindow mit Angular.
Backend ist dotnet core mit Entity Framework mit einer SQLite Datenbank die je nach Betriebssystem in einem bestimmten Ordner abgelegt wird
 
Zuerst muss die Datenbank im backend-server mit dotnet ef database update erstellt werden.
Danach kann der backend-server gestartet werden (dotnet core backend)
Nachdem der backend-server läuft kann man das frontend starten. Dafür in den frontend folder wechseln und eines der passenden Goals ausführen.
Für Development dotnet:local:dev. Hierbei wird zuerst der Typescript Code kompiliert und danach minimiert und deployed.

Sobald man im Programm angekommen ist wird auf die Konfiguration zugegriffen und nach einem Wert für den Ordner für die anzuzeigenden Bilder gesucht.
Ist noch kein Wert hinterlegt kommt man auf eine Seite, auf der man einen Folder auswählen kann, der dann in der Konfiguration abgelegt wird.
Außderdem werden alle Bilder im Verzeichnis gelesen und in den Cache (Datenbank) gespeichert um den Zugriff in der Zukunft zu beschleunigen.
Während dieses Prozesses wird dem Benutzer eine Progressbar angezeigt mit der Bitte auf den Finish zu warten.
Ist bereits ein Folder hinterlegt wird man auf die Seite mit den Bildern weitergeleitet und ein Synchronisations-Prozess wird gestartet,
welcher die Datenbank mit dem vorhandenen Folder abgleicht.

Eine Webserver-Klasse "horcht" auf HTTPRequests von Clients(localhost:8080) und handelt diese in eigenen Threads ab, um
Multi-User-Fähigkeit zu garantieren. Das geschieht in einer eigenen Clienthandler-Klasse, welche den erstellten Socket für
die Kommunikation mit dem Client übernimmt. Bevor überhaupt auf Requests "gehorcht" wird, wird die inmemory H2-Database für
die Temperaturdaten instanziert und befüllt und mittels Parameter so lange offen gehalten bis das Programm terminiert.
Das wird gemacht, um zu verhindern, dass der erste Request an die Datenbank zu lange dauert, da die Datenbank erst erstellt und befüllt
werden muss.

### Worauf ich stolz bin

Angular Electron war eine ziemlich große Herausforderung. Wir haben aber alles was wir uns als Ziel gesetzt haben hinbekommen. Sowohl 
Hot-Reload während der Entwicklung als auch ein wirkliches Desktop Aussehen haben wir hinbekommen.

Außerdem haben wir einen Websocket für den Sync und Load Task von Bildern in Verzeichnissen benutzt welcher dafür sorgt, dass
bei sehr großen Verzeichnissen kein Request Timeout dafür sorgen kann, dass das Programm abstürzt.
Zusätzlich schicken wir über den Websocket auch in Richtung Fortschritts-Prozente die am Frontend eine Progressbar aktivieren und signalisieren,
dass der User warten muss weil der Prozess noch im Gange ist. Das coole an der Websocket-Approach ist auch, wenn man das Programm schließt, 
während noch geladen wird und man dann das Programm neu öffnet wird sofort wieder die Progressbar angezeigt.

### Verbesserungen
Angular Electron für eine kleinere Desktop Anwendung Overkill und für eine lokale Offline Anwendung nicht optimal.
Architektur generell recht kompliziert das nächste mal eher simpler machen.
Die Suche und die Sliderkomponente eher als Filter umsetzen. 

### Fragen
Bei Browser wenn Bilder nicht im Viewport sind werden sie dann geladen? -- wäre unser Lazy Loading nämlich eigentlich obsolet