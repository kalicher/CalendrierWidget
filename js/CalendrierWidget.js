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
		
		this.mvc.controller.load();
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
		this.dateList = [];
	}
	
	setUp() {
		super.setUp();
		window.setInterval(() => this.getRappel(this), 500);
	}
	
	update(a,b){
		this.affiche.textContent = a;
		HH.attr(this.affiche,{"href":"https://fr.wikipedia.org/wiki/"+b});
	}
	
	updateFooter(){
		if(this.recall(this.dateList)){
			this.footer.backgroundColor = "#0AFF0B";
			SS.style(this.footer, {"backgroundColor" : "#0AFF0B"});
		}
		else {
			SS.style(this.footer, {"backgroundColor" : "#F8F8F8"});
		}
	}
	
	addRecall(weekDay, day, month, year){
		// weekDay (1 - 7), month (0 - 11)
		if(weekDay != undefined && day != undefined && month != undefined && year != undefined){
		let stringDate = year + "-" + month + "-" + day;
		let currentDay = this.days[new Date(stringDate).getDay()-1];
		let finalDate = [currentDay, day, this.months[month-1], year];
		let contain;
		for(let i = 0; i < this.dateList.length; i++){
			contain = 0;
			for(let j = 0; j < finalDate.length; j++){
				if(this.dateList[i].includes(finalDate[j])){
					contain++;
				}
			}
			if (contain == 4) break;
		}
		
		if(contain != 4){
			this.dateList.push([currentDay, day, this.months[month-1], year]);
		}
		
		this.updateFooter();
		}
	}
		
	recall(dates){
		for(let date of dates){
			let test = true;
			for(let i= 0; i < this.try.date.length; i++){
				if(date[i] != this.try.date[i])
					test = false;
			}
			if(test == true)
				return true;	
		}
		return false;
	}
		
	draw() {
		super.draw();
       SS.style(this.header,{"backgroundColor": "red"});
		 this.months= ["janvier", "février" ,"mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
		this.days=["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];
      let a = new Date();
      //jour 25 mois année
		this.try.date= [this.days[a.getDay() -1],a.getDate(),this.months[a.getMonth()],a.getFullYear()];
		this.mvc.main.store("test", "test2");
		this.b = HH.create("div");
		this.b.textContent = ""+this.try.date[1] //+ this.try.date[1] + this.try.date[2];
		SS.style(this.b,{"fontSize":"80px","width" : "50%","textAlign":"center","height":"150px", "line-height" : "95px" });
		this.stage.appendChild(this.b);
		this.header.textContent = ""+this.try.date[0]
		SS.style(this.stage,{"backgroundColor": "#F8F8F8"});
		this.footer.textContent = ""+ this.try.date[2]+ " "+ this.try.date[3];
		SS.style(this.footer,{"backgroundColor": "#F8F8F8"});
		let height = (this.try.mvc.main.header ? 25 : 0) + (this.try.mvc.main.footer ? 25 : 0);
		this.affiche=HH.create("a");
		SS.style(this.affiche, {"width" : "50%", "float" : "left", "fontSize" : "10px", "position": "relative","top": "-150px","right": "-82px"});
		this.stage.appendChild(this.affiche);
	}
	
	getRappel(caller){
		let rappel = window.Main._widgets.get("rappel");
		if(rappel != undefined){
			let vals = [rappel.restore("date"), rappel.restore("note")];
			let date = vals[0].split("-");
			caller.addRecall("test", parseInt(date[2]), parseInt(date[1]), parseInt(date[0]));
		}
	}		
}

class CalenderController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	testHas(){
		console.log(this.mvc.main.has("date"));
	}
	
	async load() {
		
		this.jours ="" + this.mvc.view.try.date[1]+"_"+ this.mvc.view.try.date[2];
		console.log(this.jours);
		let result = await this.mvc.main.dom("https://fr.wikipedia.org/wiki/"+this.jours); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		console.log("load wiki");
		let article = new xph().doc(dom).ctx(dom).craft('//*[@id="mw-content-text"]/div/ul/li').allResults;
		
		
		// piocher un élément au hasard
		// récupérer le texte de l'élément
		// afficher
		this.mvc.view.update(article[Math.floor(Math.random()) * article.length].innerText, this.jours);
	}
	
}
