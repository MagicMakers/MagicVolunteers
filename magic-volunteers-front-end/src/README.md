Toate paginile principale vor fi in src
Toate asseturile(imagini,svguri,audio etc) vor fi in src/assets
Toate componentele(Taburile de login, MagicNav{Header si Side navigation pe mobile} etc) vor fi in src/components
Toate utilitarele(Clase ajutatoare, interfete etc) vor fin in src/utils


Fiecare pagina va porni de la o componenta proprie.
index.js contine Router-ul. Pentru fiecare pagina se va defini in el o ruta.

						

							Pagina de login 
este pagina de root(path / )(LoginPage.js). Pe langa Header, care doar in pagina asta este definit separat deoarece in login nu avem link-uri si profil, gasim si componenta de login, LoginComponent. Gasesti in ea atat functionalitatea cat si template-ul.

!!!Atenie: Daca se modifica dimensiunea componentei de header MagicNav va trebui sa modifici manual si aici.

De interes sunt cele 2 div-uri cu clasa page. In interiorul lor trebuie sa fie template-ul pentru partea de login/signup.
Pagina a fost candita tabular. Se poate face swipe intre login/signup

Deasupra intregii componente este un loader. Acesta este triggeruit de variabila de stare isLoading din React. 
Daca setezi variabila true, loaderul apare. Cand o setezi false, dispare.

Ex: Cand faci un request http, setezi isLoading true(cu setState).
Cand se termina requestul, setezi isLoading false(cu setState).

De interes mai este clasa CredentialUtils din src/utils.
Este un wrapper pentru partea de credentiale. Contine functii de login, signup, logare de requesturi, lucru cu cookies, etc.

Toate request-urile catre API trebuie logate prin ea.

						MagicNav
Contine Header-ul si Sidebar-ul pt mobile.
In css gasesti o variabila ce seteaza inaltimea. 

