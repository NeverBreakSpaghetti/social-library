# social-library

## Scopo
Creare il backend per un'applicaizone che gestisce una libreria di un centro culturale sociale.

## Obiettivi
Sperimentare le seguenti pratiche:
- Customer test
- ATDD + TDD
- Simple design
- Small commit
- Sviluppo incrementale e*D* iterativo
- Architettura esagonale
- Design patterns

## Features

### Gestione catalogo libri
- Inserire un nuovo libro non a catalogo
- Visualizzare i dettagli di un libro a catalogo
- Visualizzare la lista dei libri a catalogo

### Gestione utenti
- Permettere ad un utente poter registrarsi ottenendo una tessera punti
- Quando un utente tesserato deposita un libro vengono caricati dei punti sulla tessera. Il quantitativo dipende dal "livello" del tesserato
    
    | Ruolo | Punti ricevuti al deposito |
    | ----- | -------------------------- |
    | New comer | 1 |
    | Normal | 1 |
    | Habitué | 2 |
    | Honor role | 2 |

- Per poter ritirare un libro l'utente deve possedere sufficienti punti sulla tessera. Il quantitativo dipende dal "livello" del tesserato

    | Ruolo | Punti ricevuti al deposito |
    | ----- | -------------------------- |
    | New comer | 2 |
    | Normal | 1 |
    | Habitué | 1 |
    | Honor role | 1 |

- L'aumento di ruolo dipende dal numero di libri depositati in un anno. \
    Upgrade:
    - 10 depositi: => Normal
    - 20 depositi: => Habitué
    - Decisione arbitraria della società => Honor role

- La diminuzione di ruolo dipende dal ruolo e dal numero di libri depositati in un anno. \

    Downgrade:
    - se il ruole è Habitué e si effetuano meno di 20 depositi: => Normal

### Note
Backend HTTP con uno swagger in modo da permettere al frontend di utilizzarlo.
Non è noto il database poichè ogni centro culurale potrebbe usarne uno diverso.
Non poi produrre altra documentazione oltre lo swagger, ma l'api deve essere facilmene utilizzabile da chiunque.