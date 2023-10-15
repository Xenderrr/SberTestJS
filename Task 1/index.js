import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decryptFields(encoded, translations) {
    if (!Array.isArray(encoded)) {
        throw new Error('Input must be an array of objects.');
    }

    return encoded.map(item => {
        const decryptedItem = {};
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                if (key.endsWith('id')) {
                    const field = key.slice(0, -2); // Удаляем суффикс "id"
                    if (translations[field]) {
                        decryptedItem[field] = translations[field][item[key]] || item[key];
                    } else {
                        decryptedItem[field] = item[key];
                    }
                } else {
                    decryptedItem[key] = item[key];
                }
            }
        }
        return decryptedItem;
    });
}


// console.log(decoded)
