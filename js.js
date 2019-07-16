
let container = document.getElementById('container');

class DataService {
    constructor(url) {
        this.url = url;
    }

    async getFilms(id) {
        try {
            let response = await fetch(`${this.url}/films/${id}`);
            let data = await response.json();

            return data;
        }
        catch (error) {
            throw new Error(`Не удалось получить данные о фильмах`);
        }
    }

    async getPeople(id) {
        try {
            let response = await fetch(`${this.url}/people/${id}`);
            let data = await response.json();

            return data;
        }
        catch (error) {
            throw new Error(`Не удалось получить данные о людях`);
        }
    }
}


async function main(){
    let dataService = new DataService(`https://swapi.co/api`);

    try{
        let films = await dataService.getFilms(1);
        let people = await dataService.getPeople(1);

        console.log(films, people);
    }
    catch (error) {
        console.log(error);
    }
}
main();














