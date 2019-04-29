/*
	- Créer nouveau rappel!
	- Enregistrer les données saisies
	- Relier avec widget Calendrier!
*/

class RappelWidget extends Widget {

	constructor(id, app) {
	
		super(id, RappelModel, RappelView, RappelController, app);	
		
	}
	
	setUp() {
	
		super.setUp();
		this.header = true;
		this.footer = false;
		this.sizeX = 1.7;
		this.sizeY = 1;
		this.radius = 0;
		
		}
		
	ready() {
		
		super.ready();
		
	}
				
}

class RappelModel extends WidgetModel {

	constructor() {
	
		super();
		
	}
	
	setUp() {
		
		super.setUp();
			
	}
	//Les fonctions storeDate,storeTime et storeNote enregistrent les données entrées dans les input de la date, de l'heure et du note
	storeDate () {
		
	/*
			let saveDate = this.try.mvc.view.date.addEventListener("input", function() {retrun date.value;}, false););
		*/
		return this.mvc.main.store("date",document.querySelector('input[type="date"]').value);
		
	}
	
	storeTime () {
		
		/*
			let saveTime = this.try.mvc.view.time.addEventListener("input", function() {retrun time.value;}, false););
		*/
		return this.mvc.main.store("time","timeSelect");
		
	}
	
	storeNote () {
		
		/*
			let saveText = this.try.mvc.view.note.addEventListener("input", function() {retrun note.value;}, false););
		*/
		let text = this.mvc.controller.getText();
		return this.mvc.main.store("note",text);
		
	}
	
}

class RappelView extends WidgetView{

	constructor() {
		super();
		this.note = 0;
		
	}
	
	setUp() {
	
		super.setUp();
		
	}
	
	getText(){
		console.log(this.note);
		return this.note.value;
	}
	
	draw() {
		super.draw();
		//Crée la zone pour choisir la date du rappel
		this.blocDateHeureNew = HH.create("div");
		this.date = HH.create("input");
		HH.attr(this.try.date, {"id": "date","type": "date"});
		this.dateSelect = document.querySelectorAll('input[type="date"]');
		let endDate = this.dateSelect.value;
		this.stage.appendChild(this.blocDateHeureNew);
		this.blocDateHeureNew.appendChild(this.date);
		this.stage.appendChild(this.date);
		
		//Crée la zone pour choisir l'heure du rappel
		this.time = HH.create("input");
		HH.attr(this.time, {"id": "time","type": "time"});
		this.timeSelect = document.querySelectorAll('input[type="time"]');
		let timeSelect = this.timeSelect.value;
		this.blocDateHeureNew.appendChild(this.time);
		this.stage.appendChild(this.time);
		
		//Crée le bloc de saisie de texte
		this.boutonEnregistrer = HH.create("input");
		this.boutonEnregistrer.addEventListener("click", () => (this.mvc.model.storeDate() || this.mvc.model.storeNote()));
		HH.attr(this.boutonEnregistrer, {"id": "save","type": "button", "value": "Save"});
		SS.style(this.boutonEnregistrer, {"userSelect": "none", "cursor": "pointer"});
		/*
		Events.on(this.nouveauRappel, "click", event => this.mvc.controller.Timer());
		*/
		this.blocDateHeureNew.appendChild(this.boutonEnregistrer);
		this.stage.appendChild(this.boutonEnregistrer);
		
		//Crée la partie cliquable pour crée un nouveau rappel
		this.blocTexte = HH.create("div");
		this.note = HH.create("textarea");
		HH.attr(this.note, {"id": "texte"});
		SS.style(this.note, {width: "97%", height: "60%"});
		/*
		this.note.innerHTML = "Entrer votre rappel";
		*/
		let texte = this.note.value;
		this.stage.appendChild(this.blocTexte);
		this.blocTexte.appendChild(this.note);
		this.stage.appendChild(this.note);
		
		//Crée la partie "enregistrer" afin d'envoyer la demande d'enregistrement a l'application Calendrier
		/*
		this.footer.innerHTML = "Enregistrer";
		SS.style(this.footer, {"userSelect": "none", "cursor": "pointer"});
		Events.on(this.footer, "click", event => this.mvc.controller.demandeCalendrier());
		this.stage.appendChild(this.footer);
		*/
	
	}
	//Fonction qui permet de changer la couleur du fond et génére un son à la date prévue 	
	update(bool) {
	
		if (bool == true) {
		
			SS.style(this.note, {"background-color": "#EF898C"});
			this.sound = HH.create("audio");
			HH.attr(this.sound, {"id": "audioPlay"});
			this.sourceOGG = HH.create("source");
			HH.attr(this.soundOGG, {"src": "notify.ogg"});
			this.soundMP3 = HH.create("source");
			HH.attr(this.soundOGG, {"src": "notify.mp3"});
			this.stage.appendChild(this.sound);
			this.stage.appendChild(this.soundOGG);
			this.stage.appendChild(this.soundMP3);
			this.sound.appendChild(this.soundOGG);
			this.sound.appendChild(this.soundMP3);
		
		}
	
	}
	
}

class RappelController extends WidgetController{

	constructor() {
	
		super();
		
	}
	
	setUp() {
	
		super.setUp();
		
	}
	//Les fonctions restoreDate, restoreTime, restoreNote permettent de renvoyer les données sauvegardés du rappel actuel
	restoreDate() {
		
		return this.mvc.main.restore("date");
		
	}
	
	restoreTime() {
		
		return this.mvc.main.restore("time");
		
	}
	
	restoreNote() {
		
		return this.mvc.main.restore("text");
		
	}
	
	restoreRappel() {
		//Fonction qui vérifie si le rappel actuel possède déjà des données enregistrés
		let dateExist = this.mvc.main.model.has("storeDate");
		let textExist = this.mvc.main.model.has("storeNote");
	
		if(exists == true) {
	
			this.mvc.controller.restoreDate();
			this.mvc.controller.restoreTime();
			this.mvc.controller.restoreNote();
		
		}
		else {
	
			return none;
	
		}
	
		
	}
	
	//Fonction qui demande à l'application Calendrier d'ajouter ce rappel à son contenu
	/*public demandeCalendrier() {
		if (this.mvc.view.date.has("endTime")) {
		
			return this.mvc.main;
			
		}
	
		//Question : Comment envoyez la date au Calendrier?   window.main.widgets.get("CalenderWidget");
	
	}*/
		
	//Fonction qui fait le compte à rebours et lorsqu'il arrive à la date prévue appelle la fonction updateBackColor du view
	Timer() {
	
		let dateStart = Date();
		let dateEnd = this.mvc.model.storeDate();
		let timeStart = now.getHours();
		let timeEnd = this.mvc.view.timeSelect;
		
		if (dateDepart == dateArrivee && timeStart == timeEnd) {
		
			return this.mvc.view.update("true");
		
		}
	
	}
	getText(){
		return this.mvc.view.getText();
	}
		
}
