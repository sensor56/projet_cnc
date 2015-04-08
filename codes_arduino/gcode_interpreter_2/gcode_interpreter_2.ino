// --- Programme Arduino --- 

// Auteur du Programme : X. HINAULT - Tous droits réservés 
// Programme écrit le : 02/2015
// www.mon-club-elec.fr 

// d'après : https://www.marginallyclever.com/blog/2013/08/how-to-build-an-2-axis-arduino-cnc-gcode-interpreter/
// https://github.com/MarginallyClever/GcodeCNCDemo/blob/master/GcodeCNCDemo2AxisV2/GcodeCNCDemo2AxisV2.ino

// ------- Licence du code de ce programme ----- 
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License,
//  or any later version.
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ////////////////////  PRESENTATION DU PROGRAMME //////////////////// 

// -------- Que fait ce programme ? ---------

/* 
 * Ce programme est un décodeur de GCode simplifié pour machine 3 axes de base
 * /
 
// -------- Circuit à réaliser --------- 

/*
 * broches STEP des étages moteurs sur les broches STEP
 * broches DIR des étages moteurs sur les broches DIR
 * /

// /////////////////////////////// 1. Entête déclarative /////////////////////// 
// A ce niveau sont déclarées les librairies incluses, les constantes, les variables, les objets utiles...

// --- Déclaration des constantes ---

// --- Inclusion des librairies ---

// --- Déclaration des constantes utiles ---

// --- Déclaration des constantes des broches E/S numériques ---


// --- Déclaration des constantes des broches analogiques ---


// --- Déclaration des variables globales ---

/*
 int octetReception=0; // variable de stockage des valeurs reçues sur le port Série
 long nombreReception=0; // variable de stockage du nombre  reçu sur le port Série
 long nombreReception0=0; // variable de stockage du dernier nombre  reçu sur le port Série
 String chaineReception=""; // déclare un objet String vide pour reception chaine
*/

#define VERSION (0.1)

//--- config générale ---
#define BAUD (115200) // debit de communication
#define MAX_BUF (64) // taille max du buffer de reception serie

#define VERBOSE 1 // pour messages  

//--- vitesse de deplacement --- // en (mm/sec)
#define MAX_FEEDRATE (100.0) // vitesse maximale
#define MIN_FEEDRATE (0.1) // vitesse minimale

//-- params moteurs
#define X 0
#define Y 1
#define Z 2

#define STEPS_PER_TURN (200) // pas par tour du moteur
#define MICROSTEPS_MODE (1) // mode micropas utilisé
#define MM_PER_TURN 1.25 // mm par tour - fonction pas de vis - M6 : 1mm | M8 : 1.25mm
#define PULSE_US 5 // largeur du pulse moteur en µs

//-- params mouvements
#define X_STEPS_PER_MM (STEPS_PER_TURN*MICROSTEPS_MODE/MM_PER_TURN)
#define Y_STEPS_PER_MM (STEPS_PER_TURN*MICROSTEPS_MODE/MM_PER_TURN)
#define Z_STEPS_PER_MM (STEPS_PER_TURN*MICROSTEPS_MODE/MM_PER_TURN)


// limites mouvements en mm
#define X_MAX_POS 200
#define X_MIN_POS 0
#define Y_MAX_POS 200
#define Y_MIN_POS 0
#define Z_MAX_POS 200
#define Z_MIN_POS 0

// chaque moteur est controlé par 
// > une broche de pulse : front montant déclenche pas suivant
// > une broche de dir : fixe le sens du moteur

//--- identifiant X,Y,Z pour indices tableaux
#define x (0)
#define y (1)
#define z (2)

//-- broches de pulse moteur

/*
const int X_STEP=2;
const int Y_STEP=3;
const int Z_STEP=4;
*/

int pin_STEP[3]={2,3,4}; // les broches de step des moteurs X,Y,Z

//-- broches de sens moteur

/*
const int X_DIR=5;
const int Y_DIR=6;
const int Z_DIR=7;
*/

int pin_DIR[3]={5,6,7}; // les broches de direction des moteurs X,Y,Z

//-- broches fin de course 

/*
const int X_END_STOP=8;
const int Y_END_STOP=9;
const int Z_END_STOP=10;
*/

int pin_END_STOP[3]={8,9,10}; // les broches de endstop des moteurs X,Y,Z


//-- reception serie
char buffer[MAX_BUF];  // tableau de reception des caracteres
int sizeIn;  // nombre de caracteres presents dans le buffer

//--- position 
// variables de position courante
float px=0.0; 
float py=0.0;
float pz=0.0;

float pxn, pyn, pzn; // variable nouvelle position courante

//-- vitesse
float fr=1; // memo feedrate courant en mm/sec
//long step_delay_ms;
long step_delay_us=0; // delai entre 2 pas 

//-- parametrages fonctionnement
char mode_abs=1; // mode absolu/relatif
long line_number=0;

// --- Déclaration des objets utiles pour les fonctionnalités utilisées ---


// ////////////////////////// 2. FONCTION SETUP = Code d'initialisation ////////////////////////// 
// La fonction setup() est exécutée en premier et 1 seule fois, au démarrage du programme

void setup()   { // debut de la fonction setup()

// --- ici instructions à exécuter 1 seule fois au démarrage du programme --- 

// ------- Initialisation fonctionnalités utilisées -------  

  Serial.begin(115200); // initialise connexion série à 115200 bauds
  
  delay(1000); 
  
  help(); // messages d'instruction
  
  ready(); // fonction qui réinitialise contenu buffer

// IMPORTANT : régler le terminal côté PC avec la même valeur de transmission 


// ------- Broches en sorties numériques -------  

// broches de pulse moteur
pinMode(pin_STEP[X], OUTPUT); // met broche en sortie
pinMode(pin_STEP[Y], OUTPUT); // met broche en sortie
pinMode(pin_STEP[Z], OUTPUT); // met broche en sortie 

digitalWrite(pin_STEP[X], LOW); // met broche niveau BAS
digitalWrite(pin_STEP[Y], LOW); // met broche niveau BAS
digitalWrite(pin_STEP[Z], LOW); // met broche niveau BAS


// broches de dir moteur
pinMode(pin_DIR[X], OUTPUT); // met broche en sortie
pinMode(pin_DIR[Y], OUTPUT); // met broche en sortie
pinMode(pin_DIR[Z], OUTPUT); // met broche en sortie 

digitalWrite(pin_DIR[X], LOW); // met broche niveau BAS
digitalWrite(pin_DIR[Y], LOW); // met broche niveau BAS
digitalWrite(pin_DIR[Z], LOW); // met broche niveau BAS

// ------- Broches en entrées numériques -------  

// ------- Activation si besoin du rappel au + (pullup) des broches en entrées numériques -------  

// ------- Initialisation des variables utilisées -------  

} // fin de la fonction setup()
// ********************************************************************************

////////////////////////////////// 3. FONCTION LOOP = Boucle sans fin = coeur du programme //////////////////
// la fonction loop() s'exécute sans fin en boucle aussi longtemps que l'Arduino est sous tension

void loop(){ // debut de la fonction loop()


// --- ici instructions à exécuter par le programme principal --- 



//---- code type réception chaine sur le port série ---
/*
while (Serial.available()>0) { // tant qu'un octet en réception 
	octetReception=Serial.read(); // Lit le 1er octet reçu et le met dans la variable

	if (octetReception==10) { // si Octet reçu est le saut de ligne 
		Serial.println (chaineReception); // affiche la chaine recue
		chaineReception=""; //RAZ le String de réception
		break; // sort de la boucle while
	}
	else { // si le caractère reçu n'est pas un saut de ligne
		chaineReception=chaineReception+char(octetReception); // ajoute le caratère au String
		//Serial.print(char(octetReception)); // affiche la chaine recue
	}
*/

  // Gcode de la forme : G1 Z5 F5000 ; 

// reception serie
while(Serial.available() > 0) {  // tant qu'un caractere dans la file d'attente serie
    char c=Serial.read();  // lecture du caractere suivant
    //Serial.print(c);  // affichage 
    if(sizeIn<MAX_BUF) buffer[sizeIn++]=c;  // on le memorise dans le buffer tant que place
    //if(buffer[sizeIn-1]==';') break;  // on sort si dernier caractere recu=;
    if (c==';') break; // equivalent car c est le dernier caractere recu - 
    // on analyse après...
    
    if (Serial.available()==0) delay(5); // laisse temps éventuel nouveau caractere arriver
    
} // fin tant que  octet réception

  // si arrivee instruction GCode valide
  if(sizeIn>0 && buffer[sizeIn-1]==';') { // si caractere dans le buffer et dernier ;

    // lorsqu'un message GCode valide a été recu
    buffer[sizeIn]=0;  // ajoute un 0 à la fin du buffer pour traitement en chaine de caractere
    //Serial.print(F("\r\n"));  // affiche message
    Serial.println(buffer);  // affiche message - traité comme une chaine   
    analyseChaine();  // analyse la commande
    ready(); // reinitialise buffer
  }// fin else
  
  // --- commande personnalisée 
  else if (sizeIn>0 && buffer[0]=='$') { // sizeIn>0 et ready() necessaires 
    
    Serial.println("status()");
    status();
    ready(); // reinitialise buffer

  } // else if
  else if(sizeIn>0 ) { // sinon on vide le buffer reception
     Serial.println(); // saut ligne 
     ready(); // reinitialise buffer
  } // fin else if



} // fin de la fonction loop() - le programme recommence au début de la fonction loop sans fin
// ********************************************************************************


// ////////////////////////// FONCTIONS DE GESTION DES INTERRUPTIONS //////////////////// 


// ////////////////////////// AUTRES FONCTIONS DU PROGRAMME //////////////////// 

// message d'aide
void help() {
  Serial.print(F("--- Simple Gcode --- v"));
  Serial.println(VERSION);
  
  Serial.println(F("$ Statut interne "));
  Serial.println(F("Commandes:"));
  Serial.println(F("G00 [X(steps)] [Y(steps)] [F(feedrate)]; - linear move"));
  Serial.println(F("G01 [X(steps)] [Y(steps)] [F(feedrate)]; - linear move"));
  Serial.println(F("G04 P[seconds]; - delay"));
  Serial.println(F("G90; - absolute mode"));
  Serial.println(F("G91; - relative mode"));
  Serial.println(F("G92 [X(steps)] [Y(steps)]; - change logical position"));
  Serial.println(F("M18; - disable motors"));
  Serial.println(F("M100; - this help message"));
  Serial.println(F("M114; - report position and feedrate"));
  
}

//---- message etat ----
void status() {
 
 output("X steps/mm : ",X_STEPS_PER_MM); 
 output("Y steps/mm : ",Y_STEPS_PER_MM); 
 output("Z steps/mm : ",Z_STEPS_PER_MM); 

 output("Feedrate mm/s : ",fr); 
 output("step_delay_us : ", step_delay_us);
 
 output("pos X :", px);
 output("pos Y :", py);
 output("pos Z :", pz);
 
 
}

//--- RAZ buffer reception 
void ready() {
  sizeIn=0;  // RAZ nombre caracteres en reception 
  //Serial.flush(); // vide file d'attente 
  Serial.print(F(">"));  // signal ready to receive input
}

void analyseChaine() {
  
  // Gcode de la forme : G1 Z5 F5000 ; 
  
  //float cmd=parsenumber('G',-1); // la fonction renvoie valeur passée = -1 si pas de changement
  //Serial.println (cmd);
  
  //------- decodage instruction G ------------
  int cmd = parsenumber('G',-1);
  switch(cmd) {
    
    // G00 // Déplacement rapide
    case 0: 
      Serial.println(F("G00"));
      break;
      
    // G01 : // mouvement linéaire
    case 1: // move linear
      Serial.println(F("G01"));

      //feedrate(parsenumber('F',fr)); // analyse valeur FXXX présent aussi dans l'instruction - fixe la vitesse 
      fr=parsenumber('F',fr); // extraction du feedrate - fr est passé en paramètre à parsenumber = valeur inchangée si pas de valeur renvoyée
      output("feedrate : ", fr); 
      feedrate(fr); // prend en compte le nouveau feedrate
      
      //line( parsenumber('X',(mode_abs?px:0)) + (mode_abs?0:px),parsenumber('Y',(mode_abs?py:0)) + (mode_abs?0:py) );
      // condition ? valtrue : valfalse : si condition est vraie, valeur true sinon valeur false
      // la ligne (mode_abs?px:0)) + (mode_abs?0:px) permet d'utiliser coord absolue ou relative = bien vu !
      
      pxn=parsenumber('X',px); // nouvelle position X - on passe px en parametre pour idem si pas present
      output("X :", pxn);
      
      pyn=parsenumber('Y',py); // nouvelle position Y - on passe py en parametre pour idem si pas present
      output("Y :", pyn); 
      
      line(pxn, pyn); // mouvement linéaire en nouvelle position 
      
      // memorisation nouvelles valeurs 
      px=pxn; 
      py=pyn; 
      
      break;

    case 17: // ..
      Serial.println(F("G17"));
      break;

    case 20: // ..
      Serial.println(F("G20"));
      break;

    // G04 : // pause 
    case 4: 
      Serial.println(F("G04"));
      //pause(parsenumber('S',0) + parsenumber('P',0)*1000.0f);       
      break; // 

    case 54: // ..
      Serial.println(F("G54"));
      break;
  
    // G90 : mode coordonnées absolues
    case 90: 
      Serial.println(F("G90"));
      //mode_abs=1; 
      break; 
  
    // G91 : mode coordonnées relatives
    case 91: 
      Serial.println(F("G91"));
      //mode_abs=0; 
      break; // relative mode
  
    case 92: // fixe la position courante interne - pas de mouvement
      Serial.println(F("G92"));
      //position( parsenumber('X',0),
      //parsenumber('Y',0) );
      break;
 
     case 94: // ..
      Serial.println(F("G94"));
      break;
 
    default: 
      break;
      
  } // fin G
  
  //---------- decodage instructions M --------------- 
  
  cmd = parsenumber('M',-1);
  switch(cmd) {
    case 18: // arret moteurs
      Serial.println(F("M18"));
      //release();
      break;

    case 100: 
      Serial.println(F("M100"));
      help(); 
      break;
    
    case 110: 
      Serial.println(F("M110"));
      //line_number = parsenumber('N',line_number); 
      break;
    
    case 114: 
      Serial.println(F("M114"));
      where(); 
      break;
    
    default: 
      break;

   } // fin switch M
    
} // fin void


//--------- fonction d'analyse des chaines du buffer serie

// detecte les lettres suivies de valeur numerique dans la chaine
// Gcode de la forme : G1 Z5 F5000 ; 
// la fonction parsenumber reçoit une valeur val qui restera inchangée si pas de valeur trouvée
float parsenumber(char code,float val) {
  
  char *ptr=buffer; // recupere pointeur buffer reception
  
  while(ptr && *ptr && ptr<buffer+sizeIn) {
    
    if(*ptr==code) {
    return atof(ptr+1); // conversion en float de ce qui suit la lettre
     } // fin if
     
    ptr=strchr(ptr,' ')+1; // recherche de caractere dans une chaine - +1 pour décaler...  devient 0 si pas ? ici ' ' = fin de chaine
  
  } // fin while
  
return val;

} // fin parsenumber


//============ fonctions d'affichage utiles ======================

// affiche message + valeur sur 1 ligne
void output(char *code,float val) {
  Serial.print(code);
  Serial.println(val);
} // fin output


//============= fonctions de position ================

// affiche position courante 
void where() {
  output("X",px); // le x actuel 
  output("Y",py); // y actuel
  output("F",fr); // le feedrate actuel 
  Serial.println(mode_abs?"ABS":"REL");// affiche mode ABS ou REL
} // fin where



//============= fonctions de mouvements moteurs ===================

/**
* Set the feedrate (speed motors will move)
* @input nfr the new speed in steps/second
*/

// fonction qui modifie le feedrate
void feedrate(float nfr) {
  //if(fr==nfr) return; // same as last time? quit now.
  
  // le feedrate s'exprime en mm par seconde 
  // ici on calcul le delay entre 2 pas en µs qui vaut donc : 
  // step_delay_us = 1 000 000 / total_steps_per_mm = 1 000 000 / fr * axe_steps_per_mm
  
  step_delay_us=1000000/(nfr*X_STEPS_PER_MM); // calcul delai entre 2 pas
  output("step_delay_us : ", step_delay_us); 
  
  /*
  if(nfr>MAX_FEEDRATE || nfr<MIN_FEEDRATE) { // limitation feedrate 
    Serial.print(F("Le feedrate doit etre superieur a "));
    Serial.print(MIN_FEEDRATE);
    Serial.print(F("steps/s et inferieur a "));
    Serial.print(MAX_FEEDRATE);
    Serial.println(F("steps/s."));
    return;
  } // fin if
  */
  
  // calcul du feedrate - ici en pas par minute 
  /*long us_per_min = 60 * 1000 * 1000;
  long frmin = us_per_min / nfr;
  step_delay_ms = frmin / 1000;
  step_delay_us = frmin % 1000;
  */
  
  fr=nfr;

} // fin feedrate

// mouvement en nouvelle position 
void line(float newx,float newy) {

	// calcul delta x et y
	long dx=newx-px;
	long dy=newy-py;

	// fixe sens moteur adequat
	//int dirx=dx>0?1:-1;
	//int diry=dy>0?-1:1; // because the motors are mounted in opposite directions
	
	int dirx=dx>0?1:-1; // 0 et 1 plutôt que -1 et 1
	int diry=dy>0?0:1; // 0 et 1 plutôt que -1 et 1
	
	// valeur absolue de delta x, y 
	dx=abs(dx);
	dy=abs(dy);
	
	// variables utiles
	long i;
	long over=0;
	
	// debug
	#ifdef VERBOSE
	Serial.println(F("Start >"));
	#endif
	
	// boucle de mouvement 
	if(dx>dy) {
		
		for(i=0;i<dx;++i) {
			onestep(X,dirx); // moteur X
			over+=dy;
			
			if(over>=dx) {
				over-=dx;
				onestep(Y,diry); // moteur Y
			} // fin if
		
		tick();
		
		} // fin for
		
	} // fin if 
	
	else { // si dy<dx
		
		for(i=0;i<dy;++i) {
			onestep(Y,diry);
			over+=dx;
			
			if(over>=dy) {
				over-=dy;
				onestep(X,dirx);
			} // fin if
	
			tick();
			
		} // fin for
		
	} // fin else
	
} // fin line 

// fonction 1 pas moteur 
void onestep(int motor,int direction) {
  
  // motor =0 pour X, 1 pour Y et 2 pour Z

  // fixe sens moteur
  digitalWrite(pin_DIR[motor], direction); // sens du pas - direction vaut 0 ou 1

  // genere pulse moteur 
  digitalWrite(pin_STEP[motor], HIGH); // pulse de pas
  delayMicroseconds(PULSE_US);
  digitalWrite(pin_STEP[motor],LOW); // fin pulse
  
  //delayMicroseconds(step_delay_us-PULSE_US); // - pulse_us pour pas exactement tous les step_delay_us
  // mis dans tick pour avoir tous les moteurs positionnés ensemble. Pause commune pour l'ensemble...
  
} // fin onestep 


void tick() { // pause entre deux pulse moteur 

	delayMicroseconds(step_delay_us-PULSE_US); // - pulse_us pour pas exactement tous les step_delay_us
	// en fait, on ne tient compte que d'un pulse moteur... mais il peut y en avoir plusieurs
	
} // fin tick.

void pause(long ms) {
  //delay(ms/1000);
  //delayMicroseconds(ms%1000); // delayMicroseconds doesn't work for values > ~16k.
}

void position(float npx,float npy) {
  // fixe la position courante ... 
  px=npx;  
  py=npy;
} // fin position 

// ////////////////////////// Fin du programme //////////////////// 


// ////////////////////////// Mémo instructions //////////////////// 
// ////////////////////////// Fin Mémo instructions //////////////////// 


