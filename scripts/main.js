
let appId = '60298865'
let apiKey = '214232e2a69315f052feb151d9e8ecc0'
let loader = document.querySelector('.loader-cont')
let state = false
let scrollTrigger = 60;
let nav = document.querySelector('.site-header')
let brand = document.querySelector('.navbrand a')
let button = document.querySelector('.list-item button')
let searchBarNav = document.querySelector('.search-bar')
let searchBtnNav =document.querySelector('.search-btn')
let searchBar = document.getElementsByClassName('search-bar')[0]
let searchBtn = document.getElementsByClassName('search-btn')[0]
let bodyWrap = document.getElementsByClassName('body-wrap')[0]
// ATTR_ID VALUES FROM DOCUMENTATION https://docs.google.com/spreadsheets/d/14ssR3_vFYrVAidDLJoio07guZM80SMR5nxdGpAX-1-A/edit#gid=0
let iron = 303
let calc = 301
let monounsaturated = 645
let polyunsaturated = 646
let vitD = [324,326,325] 
let vitE = [573, 323]
let vitB = [578, 418, 415]
let vitA = [318, 320]
let vitC = [401]
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function searchItem(){
	let searchVal = document.getElementsByClassName('search-bar')[0].value
	if(searchVal == ""){
		return
	}

	bodyWrap.style.display = "flex"
	document.getElementById('body-wrap').scrollIntoView()
	let brandedSec = document.getElementsByClassName('branded-sec')[0]
	let commonSec = document.getElementsByClassName('common-sec')[0]
	let errMsg = document.getElementsByClassName('err-txt')[0]
	let errIco = document.getElementsByClassName('err-ico')[0]
	let comTxt = document.getElementsByClassName('ct-txt')[0]
	let branTxt = document.getElementsByClassName('bt-txt')[0]
	let ctRes = document.getElementsByClassName('search-res')[0]
	errIco.innerHTML =""
	errMsg.textContent = ""
	brandedSec.innerHTML = ""
	commonSec.innerHTML = ""
	comTxt.textContent =""
	branTxt.textContent=""
	ctRes.innerHTML =""
	let url = `https://trackapi.nutritionix.com/v2/search/instant?query=${searchVal}`;
	state = true 
	showLoader(state)

	fetch(url, {
	  	method: "GET",
	  	withCredentials: true,
	  	headers: {
	    "x-app-id": appId,
	    "x-app-key": apiKey
  	}
   	})
	.then(resp => resp.json())
	.then(function(data) {
	state = false
	showLoader(state)
	comTxt.textContent ="Common"
	branTxt.textContent="Branded"
	ctRes.innerHTML = '<i class="fa fa-lightbulb-o" aria-hidden="true"></i>'+" "+"Search results for" +" "+ searchVal
	let common = data.common
	let branded = data.branded

	if(common == 0 && branded == 0){

		errIco.innerHTML ="<i class='fa fa-search' aria-hidden='true'></i>"
		errMsg.innerHTML = "Sorry, we couldn't find"+" "+searchVal+"."
		comTxt.textContent =""
		branTxt.textContent=""
		ctRes.innerHTML =""

	}

	for(i = 0; i < common.length; i++){
		let foodName = common[i].food_name
		let servingUnit = common[i].serving_unit
		let servingQty = common[i].serving_qty
		let imgUrl = common[i].photo.thumb
		let cap = capitalizeFirstLetter(foodName)
		let cardRow = document.createElement("div")
		let cardItems = document.getElementsByClassName("common-sec")[0]
		let cardRowContents = `	
			<div class="common-cont">
				<div class="common-left">
					<img src="${imgUrl}" height="100" width="100">
					<div class="common-desc">
						<span>${cap}</span>
						<div class="com-serv">
							<span>${servingQty}</span>
							<span>${servingUnit}</span>
						</div>
					</div>
				</div>
				<div class="common-right">
					<button onclick="fetchFaqCom('${foodName}')"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
				</div>
			</div>
			`
		cardRow.innerHTML = cardRowContents
		cardItems.append(cardRow)
	}
	for(a = 0; a < branded.length; a++){
		let foodName = branded[a].food_name
		let servingUnit = branded[a].serving_unit
		let servingQty = branded[a].serving_qty
		let imgUrl = branded[a].photo.thumb
		let nixId = branded[a].nix_item_id
		let cardRow = document.createElement("div")
		let cardItems = document.getElementsByClassName("branded-sec")[0]
		let cardRowContents = `
			<div class="branded-cont">
				<div class="branded-left">
					<img src="${imgUrl}" height="100" width="100">
					<div class="branded-desc">
						<span>${foodName}</span>
						<div class="bran-serv">
							<span>${servingQty}</span>
							<span>${servingUnit}</span>
						</div>
					</div>
				</div>
				<div class="branded-right">
					<button onclick="fetchFaqBrand('${nixId}')"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
				</div>
			</div>
			`
		cardRow.innerHTML = cardRowContents
		cardItems.append(cardRow)
	}
	})
	.catch(function(error) {
	console.log(error);
	});
}

function fetchFaqCom(queryVal){
	let vitCont = document.getElementsByClassName("vit-cont")[0]
	vitCont.innerHTML = ""
	let url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
	let data = {
	"query": queryVal,
	"use_branded_foods": true,
	}

	fetch(url, {
  	method: "POST",
  	body: JSON.stringify(data),
  	headers: {
  	"Content-type": "application/json",
  	"x-app-id": appId,
    "x-app-key": apiKey
	}
	})
	.then(response => response.json()) 
	.then(function(data){
		let foodArr = data.foods
		for(i = 0; i < foodArr.length; i++){
			let calTxt = document.getElementsByClassName('cal-txt')[0]
			let cholTxt = document.getElementsByClassName('chol-txt')[0]
			let dfTxt = document.getElementsByClassName('diefibr-txt')[0]
			let potTxt = document.getElementsByClassName('potass-txt')[0]
			let protTxt = document.getElementsByClassName('prot-txt')[0]
			let sfTxt = document.getElementsByClassName('satfat-txt')[0]
			let sodTxt = document.getElementsByClassName('sod-txt')[0]
			let sugTxt = document.getElementsByClassName('sugar-txt')[0]
			let tcarbsTxt = document.getElementsByClassName('tcarbs-txt')[0]
			let tfat = document.getElementsByClassName('tfat-txt')[0]
			let foodName = document.getElementsByClassName('modal-food-name')[0]
			let servingWeight = document.getElementsByClassName('serving-weight')[0]
			let tfatPercTxt = document.getElementsByClassName('tfat-perc')[0]
			let satfatPercTxt = document.getElementsByClassName('satfat-perc')[0]
			let cholPercTxt = document.getElementsByClassName('chol-perc')[0]
			let sodPercTxt = document.getElementsByClassName('sod-perc')[0]
			let potPercTxt = document.getElementsByClassName('potass-perc')[0]
			let dfPercTxt = document.getElementsByClassName('df-perc')[0]
			let tCarbsPercTxt = document.getElementsByClassName('tcarbs-perc')[0]
			let kCalTxt = document.getElementsByClassName('cal-title')[0]
			let walkTxt = document.getElementsByClassName('walk-txt')[0]
			let runTxt = document.getElementsByClassName('run-txt')[0]
			let bicTxt = document.getElementsByClassName('bic-txt')[0]
			let weightGrams = foodArr[i].serving_weight_grams
			let vitsArr = foodArr[i].full_nutrients
			let fnMod  = foodArr[i].food_name
			let calories = foodArr[i].nf_calories
			let chol = foodArr[i].nf_cholesterol
			let diFiber = foodArr[i].nf_dietary_fiber 
			let potass = foodArr[i].nf_potassium 
			let protein = foodArr[i].nf_protein 
			let satFat = foodArr[i].nf_saturated_fat 
			let sodium = foodArr[i].nf_sodium 
			let sugars = foodArr[i].nf_sugars 
			let tCarbs = foodArr[i].nf_total_carbohydrate 
			let tFat = foodArr[i].nf_total_fat 
			let dfPerc = Math.round((diFiber/25)*100)
			let tcarbsPerc = Math.round((tCarbs/300)*100)
			let sodPerc = Math.round((sodium/2400)*100)
			let cholPerc = Math.round((chol/300)*100)
			let tFatPerc = Math.round((tFat/78)*100)
			let satFatPerc = Math.round((satFat/20)*100)
			let potPerc = Math.round((potass/3500)*100)
			servingWeight.innerHTML = "Serving Size:"+" "+weightGrams+"g"
			foodName.innerHTML =capitalizeFirstLetter(fnMod)
			walkTxt.innerHTML = Math.round(calories/3.75)+"mins"
			runTxt.innerHTML = Math.round(calories/10.38)+"mins"
			bicTxt.innerHTML = Math.round(calories/7.2)+"mins"
			kCalTxt.innerHTML = "How many minutes does it take to burn"+" "+calories+" "+"KCal"+"?"
			calTxt.textContent = calories
			cholTxt.textContent =  chol+"mg"
			dfTxt.textContent =  diFiber+"g"
			potTxt.textContent = potass+"mg"
			protTxt.textContent =protein+"g"
			sfTxt.textContent = satFat+"g"
			sodTxt.textContent = sodium+"mg"
			sugTxt.textContent = sugars
			tcarbsTxt.textContent =  tCarbs+"g"
			tfat.textContent = tFat+"g"
			dfPercTxt.textContent = dfPerc+"%"
			potPercTxt.textContent = potPerc+"%"
			tfatPercTxt.textContent = tFatPerc+"%"
			satfatPercTxt.textContent = satFatPerc+"%"
			cholPercTxt.textContent = cholPerc+"%"
			sodPercTxt.textContent = sodPerc+"%"
			tCarbsPercTxt.textContent = tcarbsPerc+"%"
			for(x = 0; x <vitsArr.length; x++){
				let attrId = vitsArr[x].attr_id
				if(attrId == 303){
					let ironTxt = document.getElementsByClassName('iron-txt')[0]
					let res =Math.round((vitsArr[x].value/18)*100) + "%"
					ironTxt.innerHTML = res
				}
				else if(attrId == 301){
					let calcTxt = document.getElementsByClassName('calc-txt')[0]
					let resCalc = Math.round((vitsArr[x].value/1300)*100) + "%"
					calcTxt.innerHTML = resCalc
				}
				//MONOUNSAT
				else if(attrId == monounsaturated){
					let monoTxt = document.getElementsByClassName("monoun-txt")[0]
					monoTxt.innerHTML = vitsArr[x].value
				}
				//POLYUNSAT
				else if(attrId == polyunsaturated){
					let polyTxt = document.getElementsByClassName("polyun-txt")[0]
					polyTxt.innerHTML = vitsArr[x].value
				}
				else if(attrId != monounsaturated){
					let monoTxt = document.getElementsByClassName("monoun-txt")[0]
					monoTxt.innerHTML = "0"
				}
				if(attrId != polyunsaturated){
					let polyTxt = document.getElementsByClassName("polyun-txt")[0]
					polyTxt.innerHTML ="0"
				}
				//VIT A
				for(z=0; z < (vitA.length-vitA.length)+1; z++){
					if(attrId == 318){
						let percA = Math.round(((vitsArr[x].value/5000)*100))+"%"
						let cardRow = document.createElement("div")
						let cardItems = document.getElementsByClassName("vit-cont")[0]
						let cardRowContents = `
						<div class="fact-cont">
							<span class="txt">Vitamin A</span>
							<span class="txt">${percA}</span>
						</div>
						`
						cardRow.innerHTML = cardRowContents
						cardItems.append(cardRow)
					}
				}
				//VIT C
				for(v=0; v < vitC.length; v++){
					if(attrId == vitC[v]){
						let percC = Math.round(((vitsArr[x].value/60)*100))+"%"
						let cardRow = document.createElement("div")
						let cardItems = document.getElementsByClassName("vit-cont")[0]
						let cardRowContents = `
						<div class="fact-cont">
							<span class="txt">Vitamin C</span>
							<span class="txt">${percC}</span>
						</div>
						`
						cardRow.innerHTML = cardRowContents
						cardItems.append(cardRow)
					}
				}
			}
		}
	});
	modalOpen()
}

function fetchFaqBrand(queryVal){
	let vitCont = document.getElementsByClassName("vit-cont")[0]
	vitCont.innerHTML = ""
	let url = `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${queryVal}`
	fetch(url,{
		method: "GET",
	  	withCredentials: true,
	  	headers: {
	    "x-app-id": "c803a217",
	    "x-app-key": "14566db6ad87d30700a93ccd442b4573",
	   	}
	})
	.then(response => response.json())
	.then(function(data){
		let foodArr = data.foods
		for(i = 0; i < foodArr.length; i++){
			let calTxt = document.getElementsByClassName('cal-txt')[0]
			let cholTxt = document.getElementsByClassName('chol-txt')[0]
			let dfTxt = document.getElementsByClassName('diefibr-txt')[0]
			let potTxt = document.getElementsByClassName('potass-txt')[0]
			let protTxt = document.getElementsByClassName('prot-txt')[0]
			let sfTxt = document.getElementsByClassName('satfat-txt')[0]
			let sodTxt = document.getElementsByClassName('sod-txt')[0]
			let sugTxt = document.getElementsByClassName('sugar-txt')[0]
			let tcarbsTxt = document.getElementsByClassName('tcarbs-txt')[0]
			let tfat = document.getElementsByClassName('tfat-txt')[0]
			let foodName = document.getElementsByClassName('modal-food-name')[0]
			let servingWeight = document.getElementsByClassName('serving-weight')[0]
			let tfatPercTxt = document.getElementsByClassName('tfat-perc')[0]
			let satfatPercTxt = document.getElementsByClassName('satfat-perc')[0]
			let cholPercTxt = document.getElementsByClassName('chol-perc')[0]
			let sodPercTxt = document.getElementsByClassName('sod-perc')[0]
			let potPercTxt = document.getElementsByClassName('potass-perc')[0]
			let dfPercTxt = document.getElementsByClassName('df-perc')[0]
			let tCarbsPercTxt = document.getElementsByClassName('tcarbs-perc')[0]
			let kCalTxt = document.getElementsByClassName('cal-title')[0]
			let walkTxt = document.getElementsByClassName('walk-txt')[0]
			let runTxt = document.getElementsByClassName('run-txt')[0]
			let bicTxt = document.getElementsByClassName('bic-txt')[0]
			let weightGrams = foodArr[i].serving_weight_grams
			let vitsArr = foodArr[i].full_nutrients
			let fnMod  = foodArr[i].food_name
			let calories = foodArr[i].nf_calories
			let chol = foodArr[i].nf_cholesterol
			let diFiber = foodArr[i].nf_dietary_fiber 
			let potass = foodArr[i].nf_potassium 
			let protein = foodArr[i].nf_protein 
			let satFat = foodArr[i].nf_saturated_fat 
			let sodium = foodArr[i].nf_sodium 
			let sugars = foodArr[i].nf_sugars 
			let tCarbs = foodArr[i].nf_total_carbohydrate 
			let tFat = foodArr[i].nf_total_fat 
			let dfPerc = Math.round((diFiber/25)*100)
			let tcarbsPerc = Math.round((tCarbs/300)*100)
			let sodPerc = Math.round((sodium/2400)*100)
			let cholPerc = Math.round((chol/300)*100)
			let tFatPerc = Math.round((tFat/78)*100)
			let satFatPerc = Math.round((satFat/20)*100)
			let potPerc = Math.round((potass/3500)*100)
			servingWeight.innerHTML = "Serving Size:"+" "+weightGrams+"g"
			foodName.innerHTML =capitalizeFirstLetter(fnMod)
			walkTxt.innerHTML = Math.round(calories/3.75)+"mins"
			runTxt.innerHTML = Math.round(calories/10.38)+"mins"
			bicTxt.innerHTML = Math.round(calories/7.2)+"mins"
			kCalTxt.innerHTML = "How many minutes does it take to burn"+" "+calories+" "+"KCal"+"?"
			calTxt.textContent = calories
			cholTxt.textContent =  chol+"mg"
			dfTxt.textContent =  diFiber+"g"
			potTxt.textContent = potass+"mg"
			protTxt.textContent =protein+"g"
			sfTxt.textContent = satFat+"g"
			sodTxt.textContent = sodium+"mg"
			sugTxt.textContent = sugars
			tcarbsTxt.textContent =  tCarbs+"g"
			tfat.textContent = tFat+"g"
			dfPercTxt.textContent = dfPerc+"%"
			potPercTxt.textContent = potPerc+"%"
			tfatPercTxt.textContent = tFatPerc+"%"
			satfatPercTxt.textContent = satFatPerc+"%"
			cholPercTxt.textContent = cholPerc+"%"
			sodPercTxt.textContent = sodPerc+"%"
			tCarbsPercTxt.textContent = tcarbsPerc+"%"
			for(x = 0; x <vitsArr.length; x++){
				let attrId = vitsArr[x].attr_id
				if(attrId == 303){
					let ironTxt = document.getElementsByClassName('iron-txt')[0]
					let res =Math.round((vitsArr[x].value/18)*100) + "%"
					ironTxt.innerHTML = res
				}
				else if(attrId == 301){
					let calcTxt = document.getElementsByClassName('calc-txt')[0]
					let resCalc = Math.round((vitsArr[x].value/1300)*100) + "%"
					calcTxt.innerHTML = resCalc
				}
				//MONOUNSAT
				else if(attrId == monounsaturated){
					let monoTxt = document.getElementsByClassName("monoun-txt")[0]
					monoTxt.innerHTML = vitsArr[x].value
				}

				//POLYUNSAT
				else if(attrId == polyunsaturated){
					let polyTxt = document.getElementsByClassName("polyun-txt")[0]
					polyTxt.innerHTML = vitsArr[x].value
				}

				else if(attrId != monounsaturated){
					let monoTxt = document.getElementsByClassName("monoun-txt")[0]
					monoTxt.innerHTML = "0"
				}

				if(attrId != polyunsaturated){
					let polyTxt = document.getElementsByClassName("polyun-txt")[0]
					polyTxt.innerHTML ="0"
				}
				//VIT A
				for(z=0; z < (vitA.length-vitA.length)+1; z++){
					if(attrId == 318){
						let percA = Math.round(((vitsArr[x].value/5000)*100))+"%"
						let cardRow = document.createElement("div")
						let cardItems = document.getElementsByClassName("vit-cont")[0]
						let cardRowContents = `
						<div class="fact-cont">
							<span class="txt">Vitamin A</span>
							<span class="txt">${percA}</span>
						</div>
						`
						cardRow.innerHTML = cardRowContents
						cardItems.append(cardRow)
					}
				}
				//VIT C
				for(v=0; v < vitC.length; v++){
					if(attrId == vitC[v]){
						let percC = Math.round(((vitsArr[x].value/60)*100))+"%"
						let cardRow = document.createElement("div")
						let cardItems = document.getElementsByClassName("vit-cont")[0]
						let cardRowContents = `
						<div class="fact-cont">
							<span class="txt">Vitamin C</span>
							<span class="txt">${percC}</span>
						</div>
						`
						cardRow.innerHTML = cardRowContents
						cardItems.append(cardRow)
					}
				}
				//VIT D
				for(t=0; t < vitD.length; t++){
					if(attrId == vitD[t]){
						let percD = Math.round(((vitsArr[x].value/400)*100))+"%"
						let cardRow = document.createElement("div")
						let cardItems = document.getElementsByClassName("vit-cont")[0]
						let cardRowContents = `
						<div class="fact-cont">
							<span class="txt">Vitamin D</span>
							<span class="txt">${percD}</span>
						</div>
						`
						cardRow.innerHTML = cardRowContents
						cardItems.append(cardRow)
					}
				}
				//VIT E
				for(y=0; y < vitE.length; y++){
					if(attrId == vitE[y]){
						let percE = Math.round(((vitsArr[x].value/30)*100))+"%"
						let cardRow = document.createElement("div")
						let cardItems = document.getElementsByClassName("vit-cont")[0]
						let cardRowContents = `
						<div class="fact-cont">
							<span class="txt">Vitamin E</span>
							<span class="txt">${percE}</span>
						</div>
						`
						cardRow.innerHTML = cardRowContents
						cardItems.append(cardRow)
					}
				}
				//VIT B
				for(e=0; e < vitB.length; e++){
					if(attrId == vitB[e]){
						let percB = Math.round(((vitsArr[x].value/2)*100))+"%"
						let cardRow = document.createElement("div")
						let cardItems = document.getElementsByClassName("vit-cont")[0]
						let cardRowContents = `
						<div class="fact-cont">
							<span class="txt">Vitamin E</span>
							<span class="txt">${percB}</span>
						</div>
						`
						cardRow.innerHTML = cardRowContents
						cardItems.append(cardRow)
					}
				}
			}

		}

	})

	modalOpen()
}


function capitalizeFirstLetter(str) {
    let capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}
function modalOpen(){
	let modal = document.getElementById("fact-modal");
	modal.style.display = "flex";
	close.onclick = function(){
		modal.style.display = "none";
	}
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
}

function showLoader(args){
	if(args == false){
		loader.style.display = "none"
	}
	else if (args == true){
		loader.style.display = "flex"
	}
}
window.onscroll = () => {
	if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
    	nav.classList.add("active")
    	brand.classList.add("active")
    	button.classList.add("active")
    	searchBarNav.classList.add("active")
    	searchBtnNav.classList.add("active")
  	} 
  	else {
    	nav.classList.remove("active")
		brand.classList.remove("active")  
		button.classList.remove("active")  	
		searchBarNav.classList.remove("active")
		searchBtnNav.classList.remove("active")
  	}
}

searchBar.addEventListener("keyup", event =>{
	if(event.keyCode == 13){
		event.preventDefault()
		searchBtn.click()
	}
})

