var keru = () => {
    return [(a) => 'test ' + a, (b,c) => [1,b,c], (c,d,e) => { return { nama: d }}]
}

var test = () => {
    return {
        mainMenu : () => {
            return 'Ini Main Menu'
        },
        lihatProduct : () => 'Product List'
    }
}

var connect = (func=()=>{},obj={}) => {
    return (namaClass) => {
        return { 
            namaClass
        };
    };
}

console.log(connect(()=>[])('Kucing').namaClass)

// console.log(test()['mainMenu']());
// console.log(test().mainMenu());

// console.log(keru()[0]('hello'));
// console.log(keru()[1](2,3)[2]);
// console.log(keru()[2](3,4,5)['nama'])
// console.log(keru()[2](3,4,5).nama)



