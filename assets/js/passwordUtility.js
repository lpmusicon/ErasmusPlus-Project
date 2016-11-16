"use script";

class PasswordUtility
{
    constructor()
    {
        this.allowedPasswords = [
            "819af22cd95ca378d06b392499a531c01cf972926b6d0a6b94a7492a6120c1ea",
            "4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2"
        ];
    }

    hashPassword(password)
    {
      return sha256(password);
    }

    comparePasswords(hashed, password)
    {
        let hashedInput = this.hashPassword(password);
        return hashed === hashedInput;
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
        let tries = 0;
        while(!this.isAllowed(prompt("Enter password")))
        {
            tries++;
            if(tries > 5)
            {
                window.location.href = "index.html";
                break;
            }
        }
    }
}
