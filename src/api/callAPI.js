
let catBreeds = [];

// Define the API URL, get cat breed
const breedUrl = 'https://api.thecatapi.com/v1/breeds';
const imageBaseUrl = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

export let getBreed = () => {
    return new Promise((resolve, reject) => {
        fetch(breedUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(datas => {
                datas.forEach(data => {
                    catBreeds.push({ id: data.id, name: data.name });
                });
                resolve(catBreeds);

            })
            .catch(error => {
                console.error('Error:', error);
                reject('Get breed Error');
            });
    })
}

export async function getCatImageByBreed(breedID) {
    const imageRequestUrl = imageBaseUrl + breedID;

    let getImageURL;
    await fetch(imageRequestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(datas => {
            datas.forEach(data => {
                getImageURL = data.url;
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return getImageURL;
}


