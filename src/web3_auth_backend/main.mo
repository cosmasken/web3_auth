import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Nat16 "mo:base/Nat16";
import Iter "mo:base/Iter";
actor Backend {


   public type Response<T> = {
    status : Nat16;
    status_text : Text;
    data : ?T;
    error_text : ?Text;
  };
  public type Attendee = {
    username : Text;
    description : Text;
    facebook : ?Text;
    twitter : ?Text;
    linkedin : ?Text;
    github : ?Text;
    website : ?Text;
    imageUrl : Text;
  };

  private stable var guestList : Trie.Trie<Text, Attendee> = Trie.empty();


  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };



  /**
    * Update the user's information
    */
  public shared (context) func createAccount(user : Attendee) : async Response<Attendee> {

    let caller : Principal = context.caller;
    guestList := Trie.replace(
      guestList,
      userKey(Principal.toText(caller)),
      Text.equal,
      ?user,
    ).0;
    {
      status = 200;
      status_text = "OK";
      data = ?user;
      error_text = null;
    };
  };

 
  /**
    * Return User's principal
    */
  public shared ({ caller }) func whoami () : async Principal {
    return caller;

  };

  /**
    * Add two nums

    */
  public shared func add (num1 :Nat , num2:Nat) : async Nat {
    return num1 + num2;

  };

   /**
    * Generate a Trie key based on a merchant's principal ID
    */
  private func userKey(x : Text) : Trie.Key<Text> {
    return { hash = Text.hash(x); key = x };
  };

   public query func getGuestList() : async [(Text, Attendee)] {
    let usersArray : [(Text, Attendee)] = Iter.toArray(Trie.iter(guestList));
    return usersArray;
  };
};