"use script";



class PasswordUtility
{
    static hashPassword(password)
    {
      return sha256(password);
    }

    static comparePasswords(hashed, inputted)
    {
        let hashedInput = this.hashPassword(inputted);
        return hashed === hashedInput;
    }
}
