// Par X. HINAULT - Mars 2015 
// Tous droits réservés - GPL v3

// support de moteur NEMA

difference() {

	cube([50, 50,6], center=true); 

	// trou central
	cylinder(h=10, r=11.5, $fn=50, center=true);

	// 4 trous du support
	#translate([31/2,31/2,0])cylinder(h=10, r=1.5, $fn=50, center=true);
	#translate([-31/2,31/2,0])cylinder(h=10, r=1.5, $fn=50, center=true);
	#translate([31/2,-31/2,0])cylinder(h=10, r=1.5, $fn=50, center=true);
	#translate([-31/2,-31/2,0])cylinder(h=10, r=1.5, $fn=50, center=true);
	
	// trous des tiges filetées
	#translate([50/2-8/2-3,0,0])cylinder(h=10, r=4, $fn=50, center=true);
	#translate([-(50/2-8/2-3),0,0])cylinder(h=10, r=4, $fn=50, center=true);


} // fin difference 