class CalenderWidget extends Widget {
	
	constructor(id, app) {
		super(id, CalenderModel, CalenderView, CalenderController, app);
	}
	
	setUp() {
		super.setUp();
		this.header=true;
		this.footer=true;
	}
	
	async ready() {
		super.ready();
		this.controller.load();
	}
	
}

class CalenderModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class CalenderView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	update(text){
		this.affiche.innerHTML = text;
		HH.attr(this.affiche,{"href":"https://fr.wikipedia.org/wiki/"+this.mvc.controller.jours});
	}
	
	draw() {
		super.draw();
		SS.style(this.header,{"backgroundColor": "red"});
		let months= ["janvier", "février" ,"mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
		let days=["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];
		let a = new Date();
		//jour 25 mois année
		this.try.date= [days[a.getDay() -1],a.getDate(),months[a.getMonth()],a.getFullYear()];
		this.b = HH.create("div");
		this.b.textContent = ""+this.try.date[1] //+ this.try.date[1] + this.try.date[2];
		SS.style(this.b,{"fontSize":"100px","textAlign":"center","height":"125px", "line-height" : "95px" });
		this.stage.appendChild(this.b);
		this.header.textContent = ""+this.try.date[0]
		SS.style(this.stage,{"backgroundColor": "#F8F8F8"});
		this.footer.textContent = ""+ this.try.date[2]+ " "+ this.try.date[3];
		SS.style(this.footer,{"backgroundColor": "#F8F8F8"});
		//let height = (this.try.mvc.main.header ? 25 : 0) + (this.try.mvc.main.footer ? 25 : 0);
		this.affiche = HH.create("a");
		this.stage.appendChild(this.affiche);
	}		
}

class CalenderController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	async load() {
		let jours ="" + this.mvc.view.try.date[1]+"_"+ this.mvc.view.try.date[2];
		console.log(jours);
		let result = await this.mvc.main.dom("https://fr.wikipedia.org/wiki/"+jours); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		console.log("load wiki");
		let article = new xph().doc(dom).ctx(dom).craft('//*[@id="mw-content-text"]/div/ul/li').allResults;
		console.log(article);
		// piocher un élément au hasard
		// récupérer le texte de l'élément
		// afficher
		this.mvc.view.update(article[Math.floor(Math.random()) * article.length].innerText);
	}
	
}
