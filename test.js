const User = function(name, age){               // CONSTRUCTOR FUNCTION
    this.name = name;
    this.age = age;
    this.printDetails = ()=>{
        console.log(`User's name is ${name} and age is ${age}`)
    }
}

User.prototype.secret = "Zfra"                  // ATTACHING PROPERTY

User.prototype.encryptedInfo = function(){      // ATTACHING METHOD
    console.log(`feg45w${this.name}${this.age}`)
}   

console.log(User.prototype)                     // VISUALIZE IN CHROME
                                                // *{secret, encryptedInfo(), Constructor()}


const user1 = new User("Abhay Jain",23)         
user1.printDetails()                        
console.log(user1.secret)                       // ACCESSIBLE
user1.encryptedInfo()                           // ACCESSIBLE

console.log(Array.prototype)

