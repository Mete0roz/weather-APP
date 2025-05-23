export default function weatherApp(){

    class StopForm{
        constructor(form){
            this.form = form;
        }

        stopSubmit(){
            this.form.addEventListener("submit", (e)=>{
                e.preventDefault();
                console.log("não carregar");
            });
        }
    }

    const myForm = document.querySelector("form");

    const runStopForm = new StopForm(myForm);
    runStopForm.stopSubmit();
    
    class Api{

        constructor(){
          this.section = document.createElement("section");
          this.div = document.querySelector("#weather");
          this.weather = document.createElement("h3");
          this.date = document.createElement("h3");
          this.description = document.createElement("h3");

          this.input = document.querySelector("input").value;
          this.city = document.createElement("h1");
          this.city.textContent = this.input.toUpperCase();

          this.tempType = "C°";

          const close = this.div.querySelector("section");
          if(close) close.remove();

          this.div.appendChild(this.section);
          this.section.append(this.city,
            this.weather,
            this.date,
            this.description
          );

          this.setupButtonsTemp();
        }

        setupButtonsTemp(){
            const btnC = document.querySelector("#C");
            const btnF = document.querySelector("#F");

            btnC.addEventListener("click", ()=>{
                this.tempType = "C°";

                if(this.currentData){
                    this.showWeather(this.currentData);
                };
            });

            btnF.addEventListener("click", ()=>{
                this.tempType = "F°";

                if(this.currentData){
                    this.showWeather(this.currentData);
                };
            });
        };

       async handleData(){
            const myKey = 'SLCMY5DC4ZRJTZHL54LRVHUPG';
            const city = this.input;
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${myKey}`;
            
            /*`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/belo-horizonte?key=SLCMY5DC4ZRJTZHL54LRVHUPG`;*/

            try {
                const wait = await fetch(url);
                if(!wait.ok) throw new Error('Falha ao buscar');
                const data = await wait.json();
                return data;
            } catch (err){
                console.error(err);
                return null;
            }
        }

        showWeather(data){
            if (!data){
                this.weather.textContent = "Não encontrado";
                return;
            }

            this.currentData = data;
            const temp = data.days[0].temp;

            if(this.tempType === "C°"){
                const celsius = Number(((temp-32)/1.8).toFixed(1)); 
                this.weather.textContent = `Temp: ${celsius} ${this.tempType}`;
            } else {
                this.weather.textContent = `Temp: ${temp} ${this.tempType}`;
            }


            const currentDate = data.days[0].datetime; 
            const descriptionWeather = data.days[0].description;
            this.date.textContent = `Date: ${currentDate}`;
            this.description.textContent = `Conditions: ${descriptionWeather}`;
        }
    }


/*Celsius=(Fahrenheit−32)÷1.8*/
    async function run(){
        const btn = document.querySelector("button");
        btn.addEventListener("click", async ()=>{
        
        const test = new Api();
        const data = await test.handleData();
        test.showWeather(data);
        const input = document.querySelector("input");
        input.value = "";
        });
    }

    run();


}