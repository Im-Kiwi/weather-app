// some cities in the country-state-city npm package are used latin words which is a problem once user search for its city thus this below method will convert the latin alphabet in a normal english alphabet

const alphabets = [
    {latin : 'ā', nonLatin : 'a'},
    {latin : 'ē', nonLatin : 'e'},
    {latin : 'æ', nonLatin : 'ae'},
    {latin : 'ṭ', nonLatin : 't'},
    {latin : 'ñ', nonLatin : 'n'},
    {latin : 'ū', nonLatin : 'u'},
    {latin : 'ī', nonLatin : 'i'},
    {latin : 'ō', nonLatin : 'o'},
    {latin : 'ś', nonLatin : 's'},
    {latin : 'ḍ', nonLatin : 'd'},
    {latin : 'ṅ', nonLatin : 'n'},
    {latin : 'ḥ', nonLatin : 'h'},
    {latin : 'ṣ', nonLatin : 's'},
    {latin : 'ṟ', nonLatin : 'r'},
    {latin : 'ó', nonLatin : 'o'},
    {latin : 'í', nonLatin : 'i'},
    {latin : 'é', nonLatin : 'e'},
    {latin : 'á', nonLatin : 'a'},
    {latin : 'ú', nonLatin : 'u'},
    {latin : 'ḏ', nonLatin : 'd'},
    {latin : 'ø', nonLatin : 'o'},
    {latin : 'å', nonLatin : 'a'},
    {latin : 'ö', nonLatin : 'o'},
    {latin : 'ä', nonLatin : 'a'}
]

export const toNonLatin = (item) => {
   
        const name = item.name
        let updatedName
        const tempArray = name.split('')
        const updatedArray = tempArray.map((el, id) => {
            for (let al of alphabets) {
                if (al.latin === el.toLowerCase()) {
                    return al.nonLatin
                } 
            }
            return el
        })
        updatedName = updatedArray.join('')

        return updatedName
}

