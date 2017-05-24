"use script";

class PasswordUtility
{
    constructor()
    {
        this.allowedPasswords = [
            "midara",
            "root"
        ];
    }

    comparePasswords(saved, user)
    {
        return saved === user;
    }

    isAllowed(password)
    {
        for(let i = 0; i < this.allowedPasswords.length; i++)
        {
            if(this.comparePasswords(this.allowedPasswords[i], password))
                return true;
        }
    }

    userAuth()
    {
        const sessionHash = sessionStorage.getItem('userHash');
        if(this.isAllowed(sessionHash)) {
            return true;
        }

        for(let tries = 0; tries < 5; tries++)
        {
            let userInput = prompt("Enter password");
            if(this.isAllowed(userInput))
            {
                sessionStorage.setItem('userHash', userInput);
                return true;
            }
        }

        return false;
    }
}
