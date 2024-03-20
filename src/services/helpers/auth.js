import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => { // 12 correspond au niveau de sécurité du mdp mais plus le chiffre est haut plus il prend du temps à être traité
            if(err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

export const comparePasswords = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}
