const getFruit = async(name) => {
    const fruits = {
        pineapple: '🍍',
        peach: '🍑',
        strawberry: '🍓'
    }
    return fruits[name]
}

//getFruit('peach').then(console.log);

const makeSmoothie = async() => {
    const a = await getFruit('pineapple');
    const b = await getFruit('strawberry');

    return Promise.all([a,b]);
}

//makeSmoothie().then(console.log);

const makeSmoothiePromiseHell = () => {
    let a;
    return getFruit('pineapple')
        .then(v => {
            a = v;
            return getFruit('strawberry');
        })
        .then(v => [v, a])
}

//makeSmoothiePromiseHell().then(console.log);

const fruits = ['peach', 'pineapple', 'strawberry'];

const smoothie = fruits.map(v => getFruit(v));

const fruitLoop = async() => {
    for await (const emoji of smoothie) {
        console.log(emoji);
    }
}
fruitLoop();